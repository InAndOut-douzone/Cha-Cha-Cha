import React from 'react';
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import LogoutRoute from './components/routes/LogoutRoute';
import PageNotFound from './pages/error/PageNotFound';
import Employee_Management from './pages/user/Employee_Management';
import Employee_Details from './pages/user/Employee_Details';
import Leave_Management from './pages/leave/Leave_Management';
import Add_Employee from './pages/user/Add_Employee';
import Add_Notice from './pages/notice/Add_Notice';
import NoticeList from './pages/notice/NoticeList';
import Notice from './pages/notice/Notice';
import NoticeModi from './pages/notice/NoticeModify';
import MyPage from './pages/user/MyPage';
import First from './pages/main/First';
import Login from './pages/login/Login';
import Work from './pages/user/Work';
import HIM from './pages/hospital/HIM';
import HI from './pages/hospital/HI';
import WTM from './pages/hospital/WTM';
import Message from './tests/Message'

export default function App() {

  return (
    // Switch는 첫번째로 매칭되는 path를 가진 컴포넌트를 렌더링
    // exact는 정확히 일치하는, 부분적으로 일치하는 것이 아닌 정확하게 일치하는 path의 컴포넌트를 렌더링, default true
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact={true} />
        <PrivateRoute component={First} path="/" exact={true} />
        <PrivateRoute component={MyPage} path="/mypage" exact={true} />
        <PrivateRoute component={Work} path="/work" exact={true} />
        <PrivateRoute component={HIM} path="/him" exact={true} admin={true} />
        <PrivateRoute component={HI} path="/hi" exact={true} />
        <PrivateRoute component={WTM} path="/wtm" exact={true} />
        <PrivateRoute component={Add_Employee} path="/addemployee" exact={true} admin={true} />
        <PrivateRoute component={Employee_Management} path="/employeemanagement" exact={true} admin={true} />
        <PrivateRoute component={Leave_Management} path="/leavemanagement" exact={true} admin={true} />
        <PrivateRoute component={Add_Notice} path="/addnotice" exact={true} admin={true} />
        <PrivateRoute component={NoticeList} path="/notice" exact={true} />
        <PrivateRoute component={Notice} path="/notice/:no" exact={true} />
        <PrivateRoute component={NoticeModi} path="/notice/modi/:no" exact={true} admin={true} />
        <PrivateRoute component={Employee_Details} path="/employeedetails/:id" exact={true} admin={true} />
        <LogoutRoute component={Login} path="/logout" exact={true} />
        <Route component={Message} path="/message" exact={true} />
        {/* 매칭되는 페이지가 없을 때 실행됨 switch가 있기에 가능 */}
        <Route component={PageNotFound} />
      </Switch>
  )
}
