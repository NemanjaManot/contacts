import ConversationService from '../services/conversation-service';

const ConversationAction = {
    FETCH_MSG_FULFILLED: 'FETCH_MSG_FULFILLED',
    FETCH_MSG_REJECTED: 'FETCH_MSG_REJECTED'
};
export default ConversationAction;


function fetchMessageFullfiledAction(conversation) {
    return {
        type: ConversationAction.FETCH_MSG_FULFILLED,
        conversation
    };
}

function fetchMessageRejectedAction(error) {
    return {
        type: ConversationAction.FETCH_MSG_REJECTED,
        error
    };
}

export function fetchMessage(dispatch){
    ConversationService.getAllMessage().then((response) => {
        const users = response.data;
        dispatch(fetchMessageFullfiledAction(users));
    })
    .catch((error) => {
        dispatch(fetchMessageRejectedAction(error));
    });
}


// SEND MESSAGE
export function sendMsg(dispatch, sendMessage) {
    ConversationService.addMessage(sendMessage).then((response) => {
        const conversation = response.data;
        dispatch(fetchMessageFullfiledAction(conversation));
    });
}

// VIEW MESSAGE
export function viewMsg(dispatch, viewMessage) {
    ConversationService.messageSeen(viewMessage).then((response) => {
        const conversation = response.data;
        dispatch(fetchMessageFullfiledAction(conversation));
    });
}