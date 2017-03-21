import React from "react";

import {connect} from "react-redux";
import moment from 'moment';

import Chart from 'chart.js'

class BarChart extends React.Component {

    componentDidMount(){
        let ctx = document.getElementById("myChart").getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: this.printDataGraph()
        });
    }

    printDataGraph(){

        let february = this.props.conversation.map(conversation => {
            return conversation.messages.map(message => {
                return moment(message.date).format('MMMM')
            })
        }).filter(month => {
            return month.find(m => m === 'February')
        }).map(arr => {
            return arr.length
        }).reduce((a,b) => a + b, 0);


        let march = this.props.conversation.map(conversation => {
            return conversation.messages.map(message => {
                return moment(message.date).format('MMMM')
            })
        }).filter(month => {
            return month.find(m => m === 'March')
        }).map(arr => {
            return arr.length
        }).reduce((a,b) => a + b, 0);

        return (
            {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV","DEC"],
                datasets: [
                    {
                        label: 'Messages',
                        data: [12, february, march, 17, 28, 24, 7],
                        backgroundColor: "rgba(31,119,180,0.8)"
                    }
                ]
            }
        )
    }

    
    render() {

        return (
            <div>
                <canvas id="myChart"></canvas>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        conversation: state.conversationReducer.conversation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);