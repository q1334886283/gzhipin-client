import React, {Component} from "react";
import {
    NavBar,
    WhiteSpace,
    List,
    Button,
    Radio,
    WingBlank,
    InputItem
} from "antd-mobile";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Logo from "../../components/logo";
import {register} from "../../redux/actions";
import "../../assets/css/index.css";

const ListItem = List.Item;

//注册组件
class Register extends Component {

    state = {
        username: "", //用户名
        password: "", //密码
        confirmpassword: "", //确认密码
        usertype: "boss", //用户类型
    }

    //注册监听事件
    register = () => {
        this.props.register(this.state);
    }

    //处理输入数据的改变：更新对应的状态
    handleChange = (name, val) => {
        this.setState({
            [name]: val  //[]是js固定语法，代码变量
        })
    }

    //前往登录
    toLogin = () => {
        this.props.history.replace("/login");
    }

    render() {

        const {usertype} = this.state;
        const {msg, redirectTo} = this.props.user;
        // 如果redirectTo有值，则需要重定向到指定路由
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WingBlank>
                    {
                        msg ? <div className="error-msg">{msg}</div> : null
                    }
                    <List>
                        <InputItem placeholder="请输入用户名" onChange={val => {
                            this.handleChange("username", val)
                        }}>用户名：</InputItem>
                        <InputItem type="password" placeholder="请输入密码" onChange={val => {
                            this.handleChange("password", val)
                        }}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <InputItem type="password" placeholder="请确认密码" onChange={val => {
                            this.handleChange("confirmpassword", val)
                        }}>确认密码：</InputItem>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={usertype === "dashen"} onChange={() => {
                                this.handleChange("usertype", "dashen")
                            }}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={usertype === "boss"} onChange={() => {
                                this.handleChange("usertype", "boss")
                            }}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)