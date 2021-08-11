import React from 'react';
import { Route } from 'react-router-dom'
import First from './First';
import Demo from './Demo';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Cal from './Cal'
import Cal2 from './Cal2'
import Cal3 from './Cal3'
import './assets/css/app.css';
import './assets/css/loginForm.css';


export default function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" exact={true} component={First}/>  
      <Route path="/login" exact={true} component={Demo}/>
      <Route path="/mypage" exact={true} component={MyPage}/>
      <Route path="/cal" exact={true} component={Cal}/>
      <Route path="/cal2" exact={true} component={Cal2}/>
      <Route path="/cal3" exact={true} component={Cal3}/>
      <Footer />
    </div>
  );
}