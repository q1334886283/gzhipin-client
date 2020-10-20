import React, {Component} from "react";
import {
    NavBar,
    WhiteSpace,
    List,
    Button,
    Radio,
    WingBlank,
} from "antd-mobile";

import Logo from "../../components/logo";

const listItem = List.item;
//注册组件
export default class Register extends Component {

    render() {
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
            </div>
        )
    }
}