import axios from "axios"

export default class AuthService {

    login(email, password) {
        return axios.post(`http://localhost:8080/api/v1/auth/login/management`, {identifier: email, password: password}, {headers: {"Accept-Language": "TR"}})
    }

}