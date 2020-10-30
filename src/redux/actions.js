/*
    包含n个action creator
    异步action
    同步action
 */
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from "./action-type";
import {
    reqRegister,
    reqLogin
} from "../api";

//授权成功的同步action
const authSucess = (user) => ({type: AUTH_SUCCESS, data: user});
//错误提示信息的action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});


//注册异步的action
export const register = (user) => {
    const {username, password, confirmpassword, usertype} = user;
    //前台进行表单验证，验证不通过则要返回errorMsg的同步action
    if (!username) {
        return errorMsg("用户名必须指定")
    } else if (password !== confirmpassword) {
        return errorMsg("两次密码输入不一致");
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送注册的异步ajax请求
        const response = await reqRegister({username, password, usertype});
        const result = response.data;
        if (result.code === 0) { //成功
            //分发成功的action
            dispatch(authSucess(result.data))
        } else { //失败
            //分发错误提示信息的action
            dispatch(errorMsg(result.msg))
        }
    }
}

//登录异步的action
export const login = (user) => {
    const {username, password} = user;
    //前台进行表单验证，验证不通过则要返回errorMsg的同步action
    if (!username) {
        return errorMsg("用户名必须指定")
    } else if (!password) {
        return errorMsg("密码必须指定");
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        //发送登录的异步ajax请求
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code === 0) { //成功
            //分发成功的action
            dispatch(authSucess(result.data))
        } else { //失败
            //分发错误提示信息的action
            dispatch(errorMsg(result.msg))
        }
    }
}