import React from 'react';
import { Layout, Menu, Checkbox} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import profile from './assets/images/profile.jpg';
import './assets/css/app.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

export default function First() {
  
  return (
    
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">프로필</Menu.Item>
        {/* <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
      ㅋㅋㅁㄴㅇㅁㄴㅇㅁㄴ
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background2">
        <img src={profile} alt="profile" width={200}/>
        <div className="profile_name">이재성</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="보기 설정">
            <Menu.Item key="1"><Checkbox onChange={onChange}>내 일정</Checkbox></Menu.Item>
            <Menu.Item key="2"><Checkbox onChange={onChange}>휴가</Checkbox></Menu.Item>
            <Menu.Item key="3"><Checkbox onChange={onChange}>출장</Checkbox></Menu.Item>
            <Menu.Item key="4"><Checkbox onChange={onChange}>외근</Checkbox></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="내 정보">
            <Menu.Item key="5">프로필 수정</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="내 근무">
            <Menu.Item key="6">휴가 등록</Menu.Item>
            <Menu.Item key="7">근무 현황</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            height: 600
            // minHeight: 280,
          }}
        >
          캘린더
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}