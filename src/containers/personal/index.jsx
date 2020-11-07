/*
    个人中心界面路由容器组件
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Result, List, WhiteSpace, Button, Modal} from "antd-mobile";
import Cookies from "js-cookie";
import {resetUser} from "../../redux/actions";

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {

    //退出监听事件
    handleLogout = () => {
        Modal.alert("退出", "确认退出登录吗？", [
            {
                text: "取消"
            },
            {
                text: "确认",
                onPress: () => {
                    //清除cookie中的userid
                    Cookies.remove("userid");
                    //重置redux中的user状态
                    this.props.resetUser()
                }}
        ] )
    }

    render() {

        const {header, username, company, post, info, salary} = this.props.user;

        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{width: "50px"}} alt="header"/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => "相关信息"}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：20k</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button onClick={this.handleLogout} type="warning">退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)
/*有一个坑：点击退出按钮会没有反应，原因是底部导航栏的高度覆盖了这个界面，所以点击没有反应，解决方案：底部导航样式的height设置为inherit*/