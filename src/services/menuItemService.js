import axios from "axios"
import {getToken} from "../localStorage";
import {urlParams} from "../utilities/utils";

export default class MenuItemService {

    get(pageNo = 0) {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/menu_item/get/list/quick?${urlParams({
            "pageNo": pageNo, 
            "pageSize": 100, 
            "sort.orders%5B0%5D.property": "name"
        })}`, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        })
    }

}