import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import BossInfo from "../../containers/boss-info";
import DashenInfo from "../../containers/dashen-info";

//主页面组件
export default class Main extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/dasheninfo" component={DashenInfo}/>
                </Switch>
            </div>
        )
    }
}