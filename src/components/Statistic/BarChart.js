import React from "react";

import {connect} from "react-redux";
import moment from 'moment';

import Chart from 'chart.js'

class BarChart extends React.Component {

    componentDidMount(){
        let ctx = document.getElementById("myChart").getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: this.printDataGraph()
        });
    }

    getMessagesStats(year, all) {
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let messagesOfLoggedUser = [];
        this.props.conversations.forEach(conversation => {
            conversation.messages.forEach(message => {
                if(all){
                    messagesOfLoggedUser.push(message);
                } else if(message.id === loggedId){
                    messagesOfLoggedUser.push(message);
                }
            })
        });
        const statsPerMonth = [];
        for(let i = 0; i < 12; i++){
            statsPerMonth.push(0);
        }
        messagesOfLoggedUser.forEach(message => {
            const monthToAdd = moment(message.date).format('M');
            statsPerMonth[Number(monthToAdd)]++;
        });

        return statsPerMonth;
    }

    printDataGraph(year){
        const messagesStatsData = this.getMessagesStats(2016);
        const messagesStatsLoggedUserData = this.getMessagesStats(2016, true);

        return (
            {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV","DEC"],
                datasets: [
                    {
                        label: 'All messages',
                        data: messagesStatsLoggedUserData,
                        backgroundColor: "rgba(31,119,180,0.8)"
                    },
                    {
                        label: 'Your messages',
                        data: messagesStatsData,
                        backgroundColor: "rgba(243,156,18,0.8)"
                    }
                ]
            }
        )
    }

    changeYear(){
        this.myChart.data.datasets = [
            {
                label: 'All messages',
                data: [2, 3, 1, 4, 0, 3, 0, 0, 1, 4, 4, 2],
                backgroundColor: "rgba(131,19,180,0.8)"
            }
        ];
        this.myChart.update()
    }

    render() {
        return (
            <div>
                <a className="changeYearBtn" onClick={this.changeYear.bind(this)}>Change year</a>
                <canvas id="myChart">{}</canvas>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        conversations: state.conversationReducer.conversation,
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);