/*
    入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";


import store from "./redux/store";
import Main from "./containers/main";
import Login from "./containers/login";
import Register from "./containers/register";

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route component={Main}/> {/*没有path，代表是默认组件，当路径没有或者是其他时显示这个组件*/}
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById("root"));