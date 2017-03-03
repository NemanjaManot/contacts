import ConversationService from '../services/conversation-service';

const ConversationAction = {
    FETCH_MSG_FULFILLED: 'FETCH_MSG_FULFILLED',
    FETCH_MSG_REJECTED: 'FETCH_MSG_REJECTED'
};
export default ConversationAction;


function fetchMessageFullfiledAction(msg) {
    return {
        type: ConversationAction.FETCH_MSG_FULFILLED,
        msg
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