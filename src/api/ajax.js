/*
使用 axios 封装的 ajax 请求函数
函数返回的是 promise 对象
*/
import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
    if (type === "GET") { //发送get请求
        //data：{username:tom, password: 123} 传进来的data形式
        // paramStr: username=tom&password=123 需要改造成的参数形式
        let paramStr = "";
        Object.keys(data).forEach(key => {
            paramStr += key + "=" + data[key] + "&";
        })
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
            url += "?" + paramStr;
        }
        return axios.get(url);
    } else { //发送post请求
        return axios.post(url, data);
    }
}