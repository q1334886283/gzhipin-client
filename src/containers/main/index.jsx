import React, {Component} from "react";
import Cookies from "js-cookie";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";

import Boss from "../boss";
import Dashen from "../dashen";
import Message from "../message";
import Personal from "../personal";
import {getRedirectTo} from "../../utils"
import {getUser} from "../../redux/actions";
import NotFound from "../../components/not-found";
import BossInfo from "../../containers/boss-info";
import DashenInfo from "../../containers/dashen-info";
import {NavBar} from "antd-mobile";
import NavFooter from "../../components/nav-footer";

//主页面组件
class Main extends Component {

    //给组件对象添加属性
    navList = [  //包含所有导航组件的相关数据
        {
            path: "/dashen",
            component: Dashen,
            title: "老板列表",
            icon: "boss",
            text: "老板",
        },
        {
            path: "/boss",
            component: Boss,
            title: "大神列表",
            icon: "dashen",
            text: "大神"
        },
        {
            path: "/message",
            component: Message,
            title: "消息列表",
            icon: "message",
            text: "消息"
        },
        {
            path: "/personal",
            component: Personal,
            title: "个人中心",
            icon: "personal",
            text: "个人中心"
        }
    ]

    componentDidMount() {
        //登录过（cookie中有userid），但没有登录(redux管理的user中没有_id) 发送请求获取对应的user
        const userid = Cookies.get("userid");
        const {_id} = this.props.user;
        if (userid && !_id) {
            //发送异步请求，获取user
            // console.log("发送ajax请求获取user")
            this.props.getUser();
        }
    }

    render() {

        //读取cookie中的userid
        const userid = Cookies.get("userid");
        //如果没有，自动重定向到登录界面
        if (!userid) {
            return <Redirect to="/login"/>
        }
        //如果有，读取redux中的user状态
        const {user} = this.props;
        // 如果user没有_id,返回null(不显示任何)
        if (!user._id) {
            return null;
        } else {
            //如果有_id，显示对应的界面
            //根据user的type和header来计算一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname;
            if (path === "/") {
                //得道一个重定向的路由路径
                path = getRedirectTo(user.usertype, user.header);
                return <Redirect to={path}/>
            }
        }

        //获取navList
        const {navList} = this;
        //获取当前请求的路径
        const path = this.props.location.pathname;
        //判断当前请求的路径是否是导航路径中的一个
        const currentNav = navList.find(nav => nav.path === path);
        if (currentNav) {
            //决定哪个路由需要隐藏
            if (user.usertype === "boss") {
                //隐藏数组的第1个
                navList[0].hide = true;
            } else {
                //隐藏数组的第2个
                navList[1].hide = true;
            }
        }

        return (
            <div>
                {
                    currentNav ? <NavBar>{currentNav.title}</NavBar> : null
                }
                <Switch>
                    {
                        this.navList.map(
                            (nav, index) => <Route path={nav.path} component={nav.component} key={index}/>)
                    }
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/dasheninfo" component={DashenInfo}/>
                    <Route component={NotFound}/>
                </Switch>
                {
                    currentNav ? <NavFooter navList={this.navList}/> : null
                }
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)

//快速点击时控制台会报如下错误，nable to preventDefault inside passive event listener due to target being treated as passive.
/*
说明：说一下这个 preventDefault()是个什么鬼，这个是取消默认事件的，如果这个函数起作用的，比如默认的表单提交，a链接的点击跳转，就不好用了。
原因：google浏览器为了最快速的相应touch事件，做出的改变。
历史：当浏览器首先对默认的事件进行响应的时候，要检查一下是否进行了默认事件的取消。这样就在响应滑动操作之前有那么一丝丝的耽误时间。
现在：google就决定默认取消了对这个事件的检查，默认时间就取消了。直接执行滑动操作。这样就更加的顺滑了。
但是浏览器的控制台就会进行错误提醒了。
 */
/*
既不让控制台提示，而且 preventDefault() 有效果呢？
两个方案：
1、注册处理函数时，用如下方式，明确声明为不是被动的
window.addEventListener(‘touchmove’, func, { passive: false })

2、应用 CSS 属性 touch-action: none; 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
touch-action 还有很多选项，
 */