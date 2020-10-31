import React, {Component} from "react";
import {connect} from "react-redux";
import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";

import HeaderSelector from "../../components/header-selector";

class DashenInfo extends Component {

    state = {
        header: "", //头像名称
        info: "", //信息
        post: "", //岗位
    }

    //更新头像名称
    setHeader = (header) => {
        this.setState({header});
    }

    //更新信息
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    //保存点击事件
    save = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange("post", val)}>求职岗位：</InputItem>
                <TextareaItem
                    title="个人介绍"
                    rows={3}
                    placeholder="请输入个人介绍"
                    onChange={val => this.handleChange("info", val)}
                />
                <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(DashenInfo)