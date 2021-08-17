import React from 'react';
import { Layout, Menu, Checkbox, Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import profile from '../assets/images/doctor.jpg';
import Drawer from './_Drawer';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Navigation = () => {

    const role = window.sessionStorage.getItem('userRole');

    return (
        // admin일 경우
        role === "admin" ?
            <Sider width={200} className="site-layout-background2">
                <Image style={{ borderRadius: "0%", width: '100%', height: '100%' }}
                    width={200}
                    src={profile}
                />
                <div style={{ marginTop: '-6px', textAlign: 'center' }} className="profile_name">이재성</div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<LaptopOutlined />}>
                        <Link to="/">홈화면</Link>
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<LaptopOutlined />} title="보기 설정">
                        <Menu.Item key="1"><Checkbox onChange={onChange}>내 일정</Checkbox></Menu.Item>
                        <Menu.Item key="2"><Checkbox onChange={onChange}>휴가</Checkbox></Menu.Item>
                        <Menu.Item key="3"><Checkbox onChange={onChange}>출장</Checkbox></Menu.Item>
                        <Menu.Item key="4"><Checkbox onChange={onChange}>외근</Checkbox></Menu.Item>
                    </SubMenu> */}
                    <SubMenu key="sub2" icon={<UserOutlined />} title="내 정보">
                        <Menu.Item key="5"><Link to="/mypage">프로필 수정</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
                        <Menu.Item key="6"><Drawer /></Menu.Item>
                        <Menu.Item key="7"><Link to="/work">근무 현황</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<NotificationOutlined />} title="의원 관리">
                        <Menu.Item key="8"><Link to="/him">의원 정보 관리</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/wtm">근무시간 관리</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<NotificationOutlined />} title="사원 관리">
                        <Menu.Item key="10"><Link to="/addEmployee">사원 등록</Link></Menu.Item>
                        <Menu.Item key="11"><Link to="/employeeManagement">사원 관리</Link></Menu.Item>
                        <Menu.Item key="12"><Link to="/leaveManagement">휴가 관리</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub6" icon={<NotificationOutlined />} title="공지사항 관리">
                        <Menu.Item key="13"><Link to="/addNotice">공지사항 등록</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            :
            <Sider width={200} className="site-layout-background2">
                <Image
                    width={200}
                    src={profile}
                />
                <div style={{ marginTop: '-6px', textAlign: 'center' }} className="profile_name">이재성</div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<LaptopOutlined />}>
                        <Link to="/">홈화면</Link>
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<LaptopOutlined />} title="보기 설정">
                        <Menu.Item key="1"><Checkbox onChange={onChange}>내 일정</Checkbox></Menu.Item>
                        <Menu.Item key="2"><Checkbox onChange={onChange}>휴가</Checkbox></Menu.Item>
                        <Menu.Item key="3"><Checkbox onChange={onChange}>출장</Checkbox></Menu.Item>
                        <Menu.Item key="4"><Checkbox onChange={onChange}>외근</Checkbox></Menu.Item>
                    </SubMenu> */}
                    <SubMenu key="sub2" icon={<UserOutlined />} title="내 정보">
                        <Menu.Item key="5"><Link to="/mypage">프로필 수정</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
                        <Menu.Item key="6"><Drawer /></Menu.Item>
                        <Menu.Item key="7"><Link to="/work">근무 현황</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
    );
};

export default Navigation;