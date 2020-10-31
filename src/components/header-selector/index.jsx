import React, {Component} from "react";
import {List, Grid} from "antd-mobile";
import PropTypes from "prop-types";

export default class HeaderSelector extends Component {
    constructor(props) {
        super(props);
        this.HeaderList = [];
        for (let i = 0; i < 20; i++) {
            this.HeaderList.push({
                text: `头像${i + 1}`,
                icon: require(`./images/头像${i + 1}.png`)
            });
        }
    }

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon: null //图片对象
    }

    //头像选择点击事件
    handleClick = ({text, icon}) => {
        this.setState({icon});
        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state;
        const listHeader = !icon ? "请选择头像" : (
            <div>
                请选择头像
                <img src={icon} alt="header"/>
            </div>
        );

        return (
            <div>
                <List renderHeader={listHeader}>
                    <Grid
                        data={this.HeaderList}
                        columnNum={5}
                        onClick={this.handleClick}
                    />
                </List>
            </div>
        )
    }
}