import React from 'react';
import { Route } from 'react-router-dom'
import First from './First';
import Demo from './Demo';
import MyPage from './pages/MyPage';
import './assets/css/app.css';
import './assets/css/loginForm.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" exact={true} component={First}/>  
      <Route path="/login" exact={true} component={Demo}/>
      <Route path="/mypage" exact={true} component={MyPage}/>
      <Footer />
    </div>
  );
}