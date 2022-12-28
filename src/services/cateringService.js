import axios from "axios"
import {urlParams} from "../utilities/utils";
import {getToken} from "../localStorage";
import {addDays, dateToDateString, getFirstWeekDayOfDate} from "../utilities/dateUtils";

export default class CateringService {

    getCateringsDateBetween(lower = getFirstWeekDayOfDate(new Date()), upper = addDays(lower, 7), pageSize = 7 * 3) {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/catering/get/list/fully_joined/date_between?${urlParams({
            pageSize: pageSize,
            "sort.orders%5B0%5D.property": "date",
            lower: dateToDateString(lower),
            upper: dateToDateString(upper)
        })}`, {headers: {"Accept-Language": "TR", 'Authorization': getToken()}})
    }

    create(data) {
        return axios.post("https://estufasting-restapi-production.up.railway.app/api/v1/catering/create", data, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        })
    }

    updateMenuItems(data) {
        return axios.put("https://estufasting-restapi-production.up.railway.app/api/v1/catering/update-menu-items", data, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        })
    }

}