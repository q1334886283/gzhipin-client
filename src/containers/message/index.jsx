/*
    消息界面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Message extends Component {

    render() {
        return (
            <div className="common-bar">
                Message
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Message)