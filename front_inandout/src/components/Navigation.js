import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import profile from '../assets/images/profile.jpg';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

const Navigation = () => {
    return (
        <Sider width={200} className="site-layout-background2">
            <img src={profile} alt="profile" width={200} />
            <div className="profile_name">이재성</div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<LaptopOutlined />} title="보기 설정">
                    <Menu.Item key="1"><Checkbox onChange={onChange}>내 일정</Checkbox></Menu.Item>
                    <Menu.Item key="2"><Checkbox onChange={onChange}>휴가</Checkbox></Menu.Item>
                    <Menu.Item key="3"><Checkbox onChange={onChange}>출장</Checkbox></Menu.Item>
                    <Menu.Item key="4"><Checkbox onChange={onChange}>외근</Checkbox></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="내 정보">
                    <Menu.Item key="5"><Link to="/mypage">프로필 수정</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
                    <Menu.Item key="6"><Link to="/leave">휴가 등록</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/work">근무 현황</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default Navigation;