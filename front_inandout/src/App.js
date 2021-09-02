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
import Add_Notice from './notice/Add_Notice';
import NoticeList from './notice/NoticeList';
import Notice from './notice/Notice';
import NoticeModi from './notice/NoticeModify';
import MyPage from './pages/MyPage';
import First from './pages/First';
import Login from './pages/Login';
import Work from './pages/Work';
import HIM from './pages/HIM';
import HI from './pages/HI';
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
        <PrivateRoute component={HIM} path="/him" exact={true} />
        <PrivateRoute component={HI} path="/hi" exact={true} />
        <PrivateRoute component={WTM} path="/wtm" exact={true} />
        <PrivateRoute component={Add_Employee} path="/addemployee" exact={true} />
        <PrivateRoute component={Employee_Management} path="/employeemanagement" exact={true} />
        <PrivateRoute component={Leave_Management} path="/leavemanagement" exact={true} />
        <PrivateRoute component={Add_Notice} path="/addnotice" exact={true} />
        <PrivateRoute component={NoticeList} path="/notice" exact={true} />
        <PrivateRoute component={Notice} path="/notice/:no" exact={true} />
        <PrivateRoute component={NoticeModi} path="/notice/modi/:no" exact={true} />
        <PrivateRoute component={Employee_Details} path="/employeedetails/:id" exact={true} />
        <LogoutRoute component={Login} path="/logout" exact={true} />
        <Route component={Message} path="/message" exact={true} />
        {/* 매칭되는 페이지가 없을 때 실행됨 switch가 있기에 가능 */}
        <Route component={PageNotFound} />
      </Switch>
  )
}
