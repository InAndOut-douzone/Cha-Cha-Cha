import React from 'react';
import { Layout } from 'antd';
import '../assets/css/app.css';
import Cal from '../components/cal/Cal2';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const { Content } = Layout;

export default function First() {

  const role = localStorage.getItem('userRole');

  const handleDateClick = (dateClickInfo)=>{

  }
  return (
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

        <FullCalendar 
          plugins={[daygridPlugin]}
          dateClick={handleDateClick}
        />




      </Content>
  );
}