import React from 'react';
import { Route } from 'react-router-dom'
import First from './First';
import Login from './Login';
import MyPage from './pages/MyPage';
import Leave from './pages/Leave'
import Work from './pages/Work'
import Scroll from './notice/Scroll';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer'
import { Layout } from 'antd';
import './assets/css/app.css';
import styled from 'styled-components';
import img from './assets/images/hospital.jpg';

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
              <Route path="/scroll" exact={true} component={Scroll} />
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