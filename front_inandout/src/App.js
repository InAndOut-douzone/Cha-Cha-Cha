import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer';
import First from './First';
import Login from './pages/Login';
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
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import LogoutRoute from './components/routes/LogoutRoute';
import styled from 'styled-components'
import PageNotFound from './pages/error/PageNotFound';

export default function App() {
  return (
        // Switch는 첫번째로 매칭되는 path를 가진 컴포넌트를 렌더링
        // exact는 정확히 일치하는, 부분적으로 일치하는 것이 아닌 정확하게 일치하는 path의 컴포넌트를 렌더링, default true
        <Switch>  
          <PrivateRoute component={First} path="/" exact={true} />
          <PrivateRoute component={MyPage} path="/mypage" exact={true} />
          <LogoutRoute component={Login} path="/logout" exact={true} />
          <PublicRoute restricted={true} component={Login} path="/login" exact={true} />
          
          {/* 매칭되는 페이지가 없을 때 실행됨 switch가 있기에 가능 */}
          <Route component={PageNotFound}/>   
          
        </Switch>
  )
}
