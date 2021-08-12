import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import First from './First';
import Login from './Login';
import MyPage from './pages/MyPage';
import Leave from './pages/Leave'
import Work from './pages/Work'
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer'
import { Layout } from 'antd';
import './assets/css/app.css';
import styled from 'styled-components';
import img from './assets/images/hospital.jpg';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';

export default function App() {
  return (
        <Switch>
          <PrivateRoute component={First} path="/" exact={true} />
          <PrivateRoute component={MyPage} path="/mypage" exact={true} />
          <PublicRoute restricted={true} component={Login} path="/login" exact={true} />
          
          {/* <PublicRoute restricted={true} component={Login} path="/login" exact /> */}
          {/* <PublicRoute restricted={false} component={First} path="/" exact /> */}
        </Switch>
  )
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