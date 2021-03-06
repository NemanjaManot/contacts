import axios from 'axios';

const url = 'http://contactsapi7.getsandbox.com/conversation';

class ConversationService {

    getAllMessage() {
        return axios({
            url,
            method: 'GET'
        });
    }

    addMessage(newMessage){
        return axios({
            url,
            method: 'POST',
            data: newMessage
        })
    }

    messageSeen(conversationId){
        return axios({
            url,
            method: 'POST',
            data: {
                messageSeen: true,
                conversationId
            }
        });
    }

}

export default new ConversationService();

