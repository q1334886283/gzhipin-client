import React, {Component} from "react";
import {connect} from "react-redux";
import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";
import {Redirect} from "react-router-dom";


import HeaderSelector from "../../components/header-selector";
import {updateUser} from "../../redux/actions";

class BossInfo extends Component {

    state = {
        header: "", //头像名称
        post: "", //职位
        info: "", //信息
        salary: "", //薪资
        company: "", //公司名称
    }

    //更新头像名称
    setHeader = header => {
        this.setState({header})
    }

    //更新信息
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    //保存
    save = () => {
        this.props.updateUser(this.state)
    }

    render() {

        const {header, usertype} = this.props.user;
        const path = usertype === "dashen" ? "/dashen" : "/boss"
        if (header) {
            return <Redirect to={path}/>
        }

        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange("post", val)}>招聘职位：</InputItem>
                <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange("company", val)}>公司名称：</InputItem>
                <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange("salary", val)}>职位薪资：</InputItem>
                <TextareaItem
                    title="职位要求"
                    rows={3}
                    placeholder="请输入职位要求"
                    onChange={val => this.handleChange("info", val)}
                />
                <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(BossInfo)