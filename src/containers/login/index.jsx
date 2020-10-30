import React, {Component} from "react";
import {
    WingBlank,
    WhiteSpace,
    Button,
    NavBar,
    List,
    InputItem
} from "antd-mobile";

import Logo from "../../components/logo"

//登录组件
export default class Login extends Component {

    state = {
        username: "", //用户名
        password: "", //密码
    }

    //登录监听事件
    login = () => {
        console.log(this.state);
    }

    //处理输入数据的改变：更新对应的状态
    handleChange = (name, val) => {
        this.setState({
            [name]: val //[]是js固定语法，代码变量
        })
    }

    //前往注册
    toRegister = () => {
        this.props.history.replace("/register");
    }

    render() {
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={val => {this.handleChange("username", val)}}>用户名：</InputItem>
                        <InputItem type="password" placeholder="请输入密码" onChange={val => {this.handleChange("password", val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}