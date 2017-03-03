import React from "react";
import {connect} from "react-redux";

import InboxList from "./InboxList";

import {fetchMessage} from "../../actions/conversationAction";

class Inbox extends React.Component {

    componentDidMount() {
        this.props.getMessage();
    }

    render() {
        let inboxList = this.props.conversation.map((msg) => {
            return (
                <InboxList
                    members={msg.members}
                    messages={msg.messages}
                    id={msg.id}
                    key={msg.id}
                />
            )
        });
        return (
            <section className="col-lg-8 col-lg-offset-2">
                <h3>Inbox</h3>
                {inboxList}
            </section>
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
        getMessage: () => {
            fetchMessage(dispatch)
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Inbox);