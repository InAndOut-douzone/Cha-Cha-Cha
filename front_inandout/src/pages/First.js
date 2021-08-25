import React from 'react';
import { Layout,Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../assets/css/app.css';
import Cal from '../components/cal/Cal2';
import SiteLayout from './SiteLayout';
import FullCal2 from '../components/cal/FullCal2';


const { Content } = Layout;

export default function First() {

  const role = localStorage.getItem('userRole');

  return (
    <SiteLayout>
      <Layout style={{ padding: '0 24px 24px' }}>
            <br />
      <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>홈화면</Breadcrumb.Item>
        </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }}/>
            <br />
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          height: 600
          // minHeight: 280,
        }}
      >
        {/* [캘린더] [접속자 권한: {role} ] */}
        {/* <Cal /> */}
        <FullCal2 />
      </Content>
      </Layout>
    </SiteLayout>
  );
}