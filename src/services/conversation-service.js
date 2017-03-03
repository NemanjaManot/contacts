import axios from 'axios';

const url = 'http://contactsapi.getsandbox.com/conversation';

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

}

export default new ConversationService();

