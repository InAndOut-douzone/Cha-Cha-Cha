import React from 'react';
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer';
import First from './First';
import Login from './Login';
import MyPage from './pages/MyPage';
import Leave from './pages/Leave';
import Work from './pages/Work';
import HIM from './pages/HIM';
import WTM from './pages/WTM';
import Add_Employee from './pages/Add_Employee';
import Add_Notice from './pages/Add_Notice';
import Employee_Management from './pages/Employee_Management';
import Leave_Management from './pages/Leave_Management';
import img from './assets/images/hospital.jpg';
import styled from 'styled-components';
import './assets/css/app.css';

export default function App() {
  return (
    <>
      {
        1 ?
          <Layout>
            <Header />
            <Layout>
              <Navigation />
              <Route path="/" exact={true} component={First} />
              <Route path="/mypage" exact={true} component={MyPage} />
              <Route path="/leave" exact={true} component={Leave} />
              <Route path="/work" exact={true} component={Work} />
              <Route path="/him" exact={true} component={HIM} />
              <Route path="/wtm" exact={true} component={WTM} />
              <Route path="/addEmployee" exact={true} component={Add_Employee} />
              <Route path="/addNotice" exact={true} component={Add_Notice} />
              <Route path="/employeeManagement" exact={true} component={Employee_Management} />
              <Route path="/leaveManagement" exact={true} component={Leave_Management} />
            </Layout>
            <Footer />
          </Layout> :
          <Container><Route path="/" exact={true} component={Login} /></Container>
      }
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${img});
  background-size: cover;
`;