import React from "react";

import {connect} from "react-redux";
import * as d3 from "d3";
import * as scale from "d3-scale";
import RadarChart from './RadarChart';

class Graph extends React.Component {

    printUsername(nextProps){
        const layers = [];
        const numberOfContacts = [];
        const numberOfConversation = [];
        const numberOfSentMsg = [];

        nextProps.users.forEach(user => {

            let conversNumb = nextProps.conversation.filter(conversation => conversation.members.find(userId => {
                return userId == user.id
            })).length;

            // srediti ovo
            let sentMsg = nextProps.conversation.map(conversation => conversation.messages.filter(message => {
                return message.id == user.id
            }));

            //console.log(sentMsg);

            numberOfContacts.push({
                axis: user.username,
                value: user.contacts.length
            });
            numberOfConversation.push({
                axis: user.username,
                value: conversNumb
            });
            numberOfSentMsg.push({
                axis: user.username,
                value: 6
            });
        });

        layers.push(numberOfContacts, numberOfConversation, numberOfSentMsg);
        return layers;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.users.length) {
            window.d3 = d3;
            window.scale = scale;
            let w = 500,
                h = 500;

            let colorscale = scale.schemeCategory10;

//Legend titles
            let LegendOptions = ['Number of contacts', 'Number of conversation', 'Sent messages'];
//Data
            let d = this.printUsername(nextProps);

//Options for the Radar chart, other than default
            let mycfg = {
                w: w,
                h: h,
                maxValue: 0.6,
                levels: 6,
                ExtraWidthX: 300
            };

//Call function to draw the Radar chart
//Will expect that data is in %'s
            RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

            let svg = d3.select('#body')
                .selectAll('svg')
                .append('svg')
                .attr("width", w + 300)
                .attr("height", h)

//Create the title for the legend
            let text = svg.append("text")
                .attr("class", "title")
                .attr('transform', 'translate(90,0)')
                .attr("x", w - 70)
                .attr("y", 10)
                .attr("font-size", "12px")
                .attr("fill", "#404040")
                .text("Legend: ");

//Initiate Legend
            let legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 100)
                    .attr("width", 200)
                    .attr('transform', 'translate(90,20)')
                ;
// Create colour squares
            legend.selectAll('rect')
                .data(LegendOptions)
                .enter()
                .append("rect")
                .attr("x", w - 65)
                .attr("y", function (d, i) {
                    return i * 20;
                })
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function (d, i) {
                    return colorscale[i];
                })
            ;
//Create text next to squares
            legend.selectAll('text')
                .data(LegendOptions)
                .enter()
                .append("text")
                .attr("x", w - 52)
                .attr("y", function (d, i) {
                    return i * 20 + 9;
                })
                .attr("font-size", "11px")
                .attr("fill", "#737373")
                .text(function (d) {
                    return d;
                });
        }
    }



    render() {
        return (
            <div className="graph">
                <div id="body">
                    <div id="chart"></div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        conversation: state.conversationReducer.conversation,
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);