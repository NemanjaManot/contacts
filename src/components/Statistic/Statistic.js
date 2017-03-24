import React from "react";
import {connect} from "react-redux";
import Graph from './Graph';
import BarChart from './BarChart'

import './statisticStyle.scss'

class Statistic extends React.Component {

    constructor(){
        super();
        this.state = {
            fadePersonalStatistic: true,
            fadeAllUsersStatistic: true,
            fadeGraphStatistic: true,
            fadeBarChartStatistic: true,
            charetArrowPersonal: true,
            caretArrowGraph: true,
            caretAllUsersStat: true,
            caretArrowBarChart: true
        };
    }

    /*------------ PERSONAL ------------*/
    fadeInPersonal(){
        let loggedId = this.props.loggedUser && this.props.loggedUser.id;

        let lengthOfContacts = this.props.loggedUser && this.props.loggedUser.contacts.length;

        // number of conversation loggedUser +
        let numberOfUserChat = this.props.conversation.filter(conversation => {
            return conversation.members.find(member => member === loggedId)
        });

        // id of users with who loggedUser chat +
        let idOfUsersChat = numberOfUserChat.map(convers => {
            return convers.members.find(id => id !== loggedId)
        });
        // id of FRIENDS (in contacts list) with who loggedUser chat +
        let numberOfFriendsChat = this.props.loggedUser && this.props.loggedUser.contacts.filter(contact => {
                return idOfUsersChat.find(id => id === contact)
            }).length;

        let idOfFriendsChat = this.props.loggedUser && this.props.loggedUser.contacts.filter(contact => {
                return idOfUsersChat.find(id => id === contact)
            });
        let nameOfFriendsChat = this.props.users.filter(user => {
            return idOfFriendsChat.find(id => id === user.id)
        }).map(user => user.username);

        if(this.state.fadePersonalStatistic === false){
            return (
                <div className="fadeIn">
                    <div className="listMyStat">In your contacts list you have  <span className="spanStats">{ lengthOfContacts }</span> friends</div>

                    <div className="listMyStat">
                        You have conversation with <span className="spanStats">{ numberOfUserChat.length }</span> user. <br/>
                    </div>

                    <div className="listMyStat">
                        From your contacts list you chat with <span className="spanStats">{ numberOfFriendsChat }</span> friends -
                        <span className="spanStats"> { nameOfFriendsChat.join(' // ') } </span>
                    </div>
                </div>
            )
        }
    }

    changePersonalState(){
        this.setState({
            fadePersonalStatistic: this.state.fadePersonalStatistic ? false : true,
            charetArrowPersonal: this.state.charetArrowPersonal ? false : true
        });
    }

    /*------------ END PERSONAL ------------*/




    /*------------ GRAPH ------------*/
    fadeInGraph(){
        if(this.state.fadeGraphStatistic === false){
            return <Graph />
        }
    }

    changeGraphState(){
        this.setState({
            fadeGraphStatistic: this.state.fadeGraphStatistic ? false : true,
            caretArrowGraph: this.state.caretArrowGraph ? false : true
        });
    }
    /*------------ END GRAPH ------------*/




    /*------------ BAR CHART ------------*/
    fadeInBarChart(){
        if(this.state.fadeBarChartStatistic === false){
            return <BarChart />
        }
    }

    changeBarChartState(){
        this.setState({
            fadeBarChartStatistic: this.state.fadeBarChartStatistic ? false : true,
            caretArrowBarChart: this.state.caretArrowBarChart ? false : true
        });
    }
    /*------------ END BAR CHART ------------*/


    /*------------ APPLICATION STATS ------------*/
    fadeInAppStat(){
        let numberOfConversation = this.props.conversation.map(conversation => conversation).length;

        /* Number of messages in biggest conversation */
        let lengthConversationMsg = this.props.conversation.map(message => {
            return message.messages.length
        });
        let mostConversationMsgLength = Math.max(...lengthConversationMsg);

        /* Number of registered contacts */
        let numberOfContacts = this.props.users.length;

        /* Find users with 0 contacts */
        let usersZeroContacts = this.props.users.filter(user => user.contacts.length === 0);
        let usersZeroContactsNames = usersZeroContacts.map(user => user.username);

        /* Average number of contacts */
        let listOfContactsNum = this.props.users.map(user => user.contacts.length);
        let averageContacts = listOfContactsNum.reduce((a,b) => a + b, 0) / listOfContactsNum.length;


        if(this.state.fadeAllUsersStatistic === false){
            return (
                <div className="fadeIn">
                    <div className="listMyStat">Application have <span className="spanStats">{numberOfContacts}</span> registered contacts.</div>

                    <div className="listMyStat">Average number of contacts per user is <span className="spanStats">{Math.round(averageContacts)}</span> contacts.</div>

                    <div className="listMyStat">
                        <span className="spanStats">{usersZeroContacts.length}</span> users still not have any contact.
                        Find them <span className="usersZeroContactsNames">( {usersZeroContactsNames.join(', ')} )</span> and add them.
                    </div>

                    <div className="listMyStat">Number of conversation - <span className="spanStats">{numberOfConversation}</span>.</div>

                    <div className="listMyStat">
                        Conversation with the most messages - <span className="spanStats">{ mostConversationMsgLength }</span>.
                    </div>
                </div>
            )
        }
    }

    changeAllUsersState(){
        this.setState({
            fadeAllUsersStatistic: this.state.fadeAllUsersStatistic ? false : true,
            caretAllUsersStat: this.state.caretAllUsersStat ? false : true
        })
    }
    /*------------ END APPLICATION STATS ------------*/


    render() {

        const caretArrowPersonal = this.state.charetArrowPersonal ? 'caretArrowDown' : 'caretArrowUp';
        const caretArrowGraph = this.state.caretArrowGraph ? 'caretArrowDown' : 'caretArrowUp';
        const caretAllUsersStat = this.state.caretAllUsersStat ? 'caretArrowDown' : 'caretArrowUp';
        const caretArrowBarChart = this.state.caretArrowBarChart ? 'caretArrowDown' : 'caretArrowUp';

        return (
            <section className="inboxStatistics col-lg-8 col-lg-offset-2">
                <h1 className="headTitle">Statistics</h1>
                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <div className="listMyStat2" onClick={this.changePersonalState.bind(this)}>
                        <a className={caretArrowPersonal}>
                            <i className="fa fa-caret-square-o-down" aria-hidden="true">{}</i>
                        </a>
                        <h3 className="titleOfStatistics">Personal statistic</h3>
                    </div>

                    <div className="fadeInDivs">
                        {this.fadeInPersonal()}
                    </div>
                </div>

                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <div className="listMyStat2" onClick={this.changeGraphState.bind(this)}>
                        <a className={caretArrowGraph}>
                            <i className="fa fa-caret-square-o-down" aria-hidden="true">{}</i>
                        </a>
                        <h3 className="titleOfStatistics">All users statistics</h3>
                    </div>

                    <div className="fadeInDivs">
                        {this.fadeInGraph()}
                    </div>
                </div>

                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <div className="listMyStat2" onClick={this.changeAllUsersState.bind(this)}>
                        <a className={caretAllUsersStat}>
                            <i className="fa fa-caret-square-o-down" aria-hidden="true">{}</i>
                        </a>
                        <h3 className="titleOfStatistics">Application statistic</h3>
                    </div>

                    <div className="fadeInDivs">
                        {this.fadeInAppStat()}
                    </div>
                </div>

                <div className="statInformation col-lg-10 col-lg-offset-1">
                    <div className="listMyStat2" onClick={this.changeBarChartState.bind(this)}>
                        <a className={caretArrowBarChart}>
                            <i className="fa fa-caret-square-o-down" aria-hidden="true">{}</i>
                        </a>
                        <h3 className="titleOfStatistics">Statistic monthly</h3>
                    </div>

                    <div className="fadeInDivs">
                        {this.fadeInBarChart()}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversation: state.conversationReducer.conversation,
        users: state.usersReducer.users,
        loggedUser: state.usersReducer.loggedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);