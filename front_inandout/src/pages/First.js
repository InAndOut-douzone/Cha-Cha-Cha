import React from 'react';
import { Layout } from 'antd';
import '../assets/css/app.css';
import Cal from '../components/cal/Cal2';
import SiteLayout from './SiteLayout';
import FullCal from '../components/cal/FullCal';
import FullCal2 from '../components/cal/FullCal2';

const { Content } = Layout;

export default function First() {

  const role = localStorage.getItem('userRole');

  return (
    <SiteLayout>
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
        {/* <Cal /> */}
        {/* <FullCal /> */}
        <FullCal2 />
      </Content>
    </SiteLayout>
  );
}