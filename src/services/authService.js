import axios from "axios"

export default class AuthService {

    login(email, password) {
        return axios.post(`https://estufasting-restapi-production.up.railway.app/api/v1/auth/login/management`, {identifier: email, password: password}, {headers: {"Accept-Language": "TR"}})
    }

}