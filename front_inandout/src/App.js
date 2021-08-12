import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route, Switch } from 'react-router-dom'
=======
import { Route } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import Footer from './components/_Footer';
>>>>>>> f7b61987d70e352bdde9326a2a8e3a125ec59a80
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