import React from 'react';
import { Layout } from 'antd';
import './assets/css/app.css';
import Cal from './Cal2';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer'

const { Content } = Layout;

export default function First() {

  const role = window.sessionStorage.getItem('userRole');
  return (
    <Layout >
    <Header />
    <Layout>
    <Navigation />
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
          [캘린더] [접속자 권한: {role} ]
          <Cal />
        </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}