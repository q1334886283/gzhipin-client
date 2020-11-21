import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {WhiteSpace, WingBlank, Card} from "antd-mobile";

const Header = Card.Header;
const Body = Card.Body

//显示指定用户列表的UI组件
class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {

        //获取用户列表
        const {userList = []} = this.props;

        return (
            <WingBlank className="common-bar">
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                <Header
                                    thumb={require(`../../assets/images/${user.header}.png`)}
                                    extra={user.username}
                                />
                                <Body>
                                    <div>职位：{user.post}</div>
                                    {user.company ? <div>公司：{user.company}</div> : null}
                                    {user.salary ? <div>月薪：{user.salary}</div> : null}
                                    <div>描述：{user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList);