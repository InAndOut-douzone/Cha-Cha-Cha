import React from 'react';
import { Route } from 'react-router-dom'
import First from './First';
import Login from './Login';
import './assets/css/app.css';
import './assets/css/loginForm.css';

export default function App() {
  return (
    <div className="App">
      <Route path="/" exact={true} component={First}/>
      <Route path="/login" exact={true} component={Login}/>
    </div>
  );
}