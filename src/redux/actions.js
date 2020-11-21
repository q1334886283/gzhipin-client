/*
    包含n个action creator
    异步action
    同步action
 */
import io from "socket.io-client"; //引入客户端io
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECIEVE_USER,
    RESET_USER,
    RECIEVE_USER_LIST
} from "./action-type";
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from "../api";

//封装initIO方法
function initIO() {
    if (!io.socket) {
        //连接服务器，得到代表连接的socket对象
        io.socket = io("ws://localhost:4000");
        //绑定"recieveMessage"的监听，爱接收服务器发送的消息
        io.socket.on("recieveMsg", function (data) {
            console.log("浏览器接收到消息：", data);
        });
    }
}

//授权成功的同步action
const authSucess = user => ({type: AUTH_SUCCESS, data: user});
//错误提示信息的action
const errorMsg = msg => ({type: ERROR_MSG, data: msg});
//接收用户的同步action
const recieveUser = user => ({type: RECIEVE_USER, data: user});
//重置用户的同步action
export const resetUser = msg => ({type: RESET_USER, data: msg});
//接收用户列表的同步action
export const recieveUserList = userList => ({type: RECIEVE_USER_LIST, data: userList});

//注册异步的action
export const register = user => {
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
export const login = user => {
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

//更新用户异步的action
export const updateUser = user => {

    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if (result.code === 0) { //更新成功
            //分发接收用户的action
            dispatch(recieveUser(result.data));
        } else { //更新失败
            // 分发重置用户的action
            dispatch(resetUser(result.msg));
        }
    }
}

//获取用户异步的action
export const getUser = () => {

    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) { //获取成功
            //分发接收用户的action
            dispatch(recieveUser(result.data));
        } else { //获取失败
            // 分发重置用户的action
            dispatch(resetUser(result.msg));
        }
    }
}

//获取用户列表的异步action
export const getUserList = usertype => {

    return async dispatch => {
        //执行异步的ajax请求
        const response = await reqUserList(usertype);
        const result = response.data;
        //得到结果后分发一个同步action
        if (result.code === 0) {
            dispatch(recieveUserList(result.data));
        }
    }
}

//发送消息的异步action
export const sendMsg = ({from, to, content}) => {

    return dispatch => {
        console.log("发送消息", {from, to, content});
        initIO();
        //发消息
        io.socket.emit("sendMsg", {from, to, content});
    }
}
