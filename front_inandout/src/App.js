import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/_Header';
import Navigation from './components/Navigation';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import LogoutRoute from './components/routes/LogoutRoute';
import PageNotFound from './pages/error/PageNotFound';
import Employee_Management from './pages/Employee_Management';
import Employee_Details from './pages/Employee_Details';
import Leave_Management from './pages/Leave_Management';
import Add_Employee from './pages/Add_Employee';
import Add_Notice from './pages/Add_Notice';
import MyPage from './pages/MyPage';
import First from './pages/First';
import Login from './pages/Login';
import Work from './pages/Work';
import HIM from './pages/HIM';
import WTM from './pages/WTM';

export default function App() {

  return (
    // Switch는 첫번째로 매칭되는 path를 가진 컴포넌트를 렌더링
    // exact는 정확히 일치하는, 부분적으로 일치하는 것이 아닌 정확하게 일치하는 path의 컴포넌트를 렌더링, default true
    <Layout >
      <Header />
      <Layout>
        <Navigation /> 
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <PublicRoute restricted={true} component={Login} path="/login" exact={true} />
            <PrivateRoute component={First} path="/" exact={true} />
            <PrivateRoute component={MyPage} path="/mypage" exact={true} />
            <PrivateRoute component={Work} path="/work" exact={true} />
            <PrivateRoute component={HIM} path="/him" exact={true} />
            <PrivateRoute component={WTM} path="/wtm" exact={true} />
            <PrivateRoute component={Add_Employee} path="/addemployee" exact={true} />
            <PrivateRoute component={Employee_Management} path="/employeemanagement" exact={true} />
            <PrivateRoute component={Leave_Management} path="/leavemanagement" exact={true} />
            <PrivateRoute component={Add_Notice} path="/addnotice" exact={true} />
            <PrivateRoute component={Employee_Details} path="/employeedetails" exact={true} />
            <LogoutRoute component={Login} path="/logout" exact={true} />
            {/* 매칭되는 페이지가 없을 때 실행됨 switch가 있기에 가능 */}
            <Route component={PageNotFound} />
          </Switch>
           {/* <Footer /> */}
         </Layout>
       </Layout>
     </Layout>
  )
}
