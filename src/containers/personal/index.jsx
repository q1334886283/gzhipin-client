/*
    个人中心界面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Personal extends Component {

    render() {
        return (
            <div>
                Personal
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Personal)