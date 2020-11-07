/*
    老板主页面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Boss extends Component {

    render() {
        return (
            <div>
                Boss
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Boss)