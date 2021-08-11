import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const _Header = () => {
    return (
        <div>
            헤더입니다.

            <Link to="/">홈</Link>
            {/* <Link to="/login">로그인</Link> */}
            <Link to="/mypage">내정보</Link>

            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                </Menu>

                <Button className="button" type="primary" shape="round">
                    출근
                </Button>
                <Button className="button" type="primary" shape="round">
                    퇴근
                </Button>
                <Button className="button" type="primary" shape="circle">
                    A
                </Button>
                <Button className="button" type="primary" shape="circle">
                    B
                </Button>
                <Button className="button" type="primary" shape="circle">
                    C
                </Button>
            </Header>
        </div>
    );
};

export default _Header;