/*
    大神主页面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Dashen extends Component {

    render() {
        return (
            <div>
                Dashen
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Dashen)