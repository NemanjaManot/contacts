import ConversationAction from '../actions/conversationAction';

let initialState = {
    conversation: [],
    error: null
};

export default function conversationReducer(state = initialState, action){
    switch(action.type){
        case ConversationAction.FETCH_MSG_FULFILLED:
            state = Object.assign({}, state, {
                conversation: action.msg
            });
            break;

        case ConversationAction.FETCH_MSG_REJECTED:
            state = Object.assign({}, state, {
                error: action.error
            });
            break;


    }
    return state;
}