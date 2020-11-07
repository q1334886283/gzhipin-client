import React, {Component} from "react";
import {TabBar} from "antd-mobile";
import PropType from "prop-types";
import {withRouter} from "react-router-dom";

const Item = TabBar.Item;

class NavFooter extends Component {

    static propType = {
        navList: PropType.array.isRequired
    }

    render() {

        let {navList} = this.props;
        const path = this.props.location.pathname;
        //过滤掉navList中hide为true的对象
        navList = navList.filter(nav => !nav.hide);

        return (
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <Item
                            key={nav.path}
                            title={nav.text}
                            icon={{uri: require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                            selected={path === nav.path}
                            onPress={() => {
                                this.props.history.replace(nav.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

//向外暴露withRouter包装后的组件
//目的是可以向UI组件传入路由内部的一些属性：history/location/match，否则无法获取这些路由组件的内部属性
export default withRouter(NavFooter);