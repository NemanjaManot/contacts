import axios from 'axios';

const url = 'http://contactsapi5.getsandbox.com/users';

class UserService {

    getAll() {
        return axios({
            url,
            method: 'GET'
        });
    }

    addUser(newUser){
        return axios({
            url,
            method: 'POST',
            data: newUser
        })
    }

    updateUser(updateUser){
        return axios({
            url: `${url}/${updateUser.id}`,
            method: 'PUT',
            data: updateUser
        })
    }

    deleteUser(id){
        return axios({
            url: `${url}/${id}`,
            method: 'DELETE'
        })
    }
}

export default new UserService();

