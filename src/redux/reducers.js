/*
    包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from "redux"

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECIEVE_USER,
    RESET_USER
} from "./action-type"

import {getRedirectTo} from "../utils"

const initUser = {
    username: "", //用户信息
    usertype: "", //用户类型
    msg: "", //错误提示信息
    redirectTo: "" //需要自动重定向的路由路径
}

//产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data是user
            const {usertype, header} = action.data;
            return {...action.data, redirectTo: getRedirectTo(usertype, header)};
        case ERROR_MSG: //data是msg
            return {...action.data, msg: action.data};
        case RECIEVE_USER: //data是user
            return action.data;
        case RESET_USER: //data是msg
            return {...initUser, msg: action.data}
        default:
            return state;
    }
}

export default combineReducers({
    user
})
//向外暴露的状态的结构：{xxx:0, yyy:0}