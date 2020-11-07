/*
    老板主页面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";

import UserList from "../../components/user-list";
import {getUserList} from "../../redux/actions";

class Boss extends Component {

    componentDidMount() {
        this.props.getUserList("dashen");
    }

    render() {
        return <UserList userList={this.props.userList}/>
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Boss)