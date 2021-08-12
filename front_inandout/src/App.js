import React from 'react';

import { Route, Switch } from 'react-router-dom'
import First from './First';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Work from './pages/Work';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import LogoutRoute from './components/routes/LogoutRoute';
import PageNotFound from './pages/error/PageNotFound';

export default function App() {
  return (
        // Switch는 첫번째로 매칭되는 path를 가진 컴포넌트를 렌더링
        // exact는 정확히 일치하는, 부분적으로 일치하는 것이 아닌 정확하게 일치하는 path의 컴포넌트를 렌더링, default true
        <Switch>  
          <PrivateRoute component={First} path="/" exact={true} />
          <PrivateRoute component={MyPage} path="/mypage" exact={true} /> 
          <PrivateRoute component={Work} path="/work" exact={true} />
          <LogoutRoute component={Login} path="/logout" exact={true} />
          <PublicRoute restricted={true} component={Login} path="/login" exact={true} />
          
          {/* 매칭되는 페이지가 없을 때 실행됨 switch가 있기에 가능 */}
          <Route component={PageNotFound}/>   
          
        </Switch>
  )
}
