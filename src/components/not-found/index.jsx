/*
    找不到界面提示UI组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "antd-mobile/lib/index";

class NotFound extends Component {

    render() {
        return (
            <div>
                <h2>抱歉，找不到页面！</h2>
                <Button
                    type="primary"
                    onClick={this.props.history.replace("/")}
                >
                    返回首页
                </Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(NotFound)