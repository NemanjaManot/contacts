import React from "react";

import {connect} from "react-redux";
import moment from 'moment';

import Chart from 'chart.js'

class BarChart extends React.Component {

    constructor(){
        super();
        this.state = {
            yearColor: 2017
        };
    }

    componentDidMount(){
        let ctx = document.getElementById("myChart").getContext('2d');
        this.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV","DEC"]
            }
        });
        this.setChartDataByYear(this.state.yearColor);
    }

    getMessagesStats(year, all) {
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let messagesOfLoggedUser = [];
        this.props.conversations.forEach(conversation => {

            conversation.messages.filter(message => {
                return moment(message.date).year() === year;
            }).forEach(message => {
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
            const monthToAdd = moment(message.date).month();
            statsPerMonth[Number(monthToAdd)]++;
        });

        return statsPerMonth;
    }

    setChartDataByYear(year){
        this.setState({
            yearColor: year
        });
        const messagesStatsData = this.getMessagesStats(year);
        const messagesStatsLoggedUserData = this.getMessagesStats(year, true);
        this.myChart.data.datasets = [
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
        ];
        this.myChart.update()
    }


    getButtons(){
        const yearsButtons = [];
        const activeYear = (new Date()).getFullYear();
        const beginingYear = 2014;
        for(let i = activeYear; i > beginingYear; i--){
            yearsButtons.push(
                <a key={i} className={ this.state.yearColor === i ? 'changeYearBtnActive' : "changeYearBtn"} onClick={this.setChartDataByYear.bind(this, i)}>{i}</a>
            )
        }
        return (
            <div>
                {yearsButtons}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.getButtons()}
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