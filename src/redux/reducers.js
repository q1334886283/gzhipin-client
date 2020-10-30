/*
    包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */
import {combineReducers} from "redux"

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from "./action-type"

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
            return {...state, ...action.data}
        case ERROR_MSG: //data是msg+
            return {msg: action.data, redirectTo: "/"}
        default:
            return state;
    }
}

export default combineReducers({
    user
})
//向外暴露的状态的结构：{xxx:0, yyy:0}