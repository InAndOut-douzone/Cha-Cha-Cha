import React from 'react';
import { Layout } from 'antd';
import './assets/css/app.css';
import Cal from './Cal2';

const { Content } = Layout;

export default function First() {
  return (
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
          [캘린더]
          <Cal />
        </Content>
      </Layout>
  );
}