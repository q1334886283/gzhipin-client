import React, {Component} from "react";
import {connect} from "react-redux";
import {NavBar, List, InputItem} from "antd-mobile";
import {sendMsg} from "../../redux/actions";

const Item = List.Item;

class Chat extends Component {

    state = {
        content: "" //发送的消息内容
    }

    //发送的监听事件
    handleSend = () => {
        //收集数据
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        //发送消息
        this.props.sendMsg({from, to, content});
        //清空输入框内容
        this.setState({content: ""});
    }

    render() {

        const {content} = this.state;

        return (
            <div id="chat-page">
                <NavBar>aa</NavBar>
                <List>
                    <Item
                        thumb={require(`../../assets/images/头像1.png`)}
                    >
                        你好
                    </Item>
                    <Item
                        thumb={require(`../../assets/images/头像1.png`)}
                    >
                        你好
                    </Item>
                    <Item
                        className="chat-me"
                        extra="我"
                    >
                        你好
                    </Item>
                    <Item
                        className="chat-me"
                        extra="我"
                    >
                        你好
                    </Item>
                </List>
                <div className="am-tab-bar">
                    <InputItem
                        placeholder="请输入"
                        value={content}
                        onChange={val => this.setState({content: val})}
                        extra={
                            <span onClick={this.handleSend}>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {sendMsg}
)(Chat)

