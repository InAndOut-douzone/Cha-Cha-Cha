import React from 'react';
import ApiTest from './ApiTest';
import ApiTest2 from './ApiTest2';
import DateTest from './DateTest';
import First from './First';
import Demo from './Demo';
import './assets/css/app.css';
import './assets/css/loginForm.css';

export default function App() {
  return (
    <div className="App">
      {/* <ApiTest />
      <ApiTest2 />
      <DateTest /> */}
      <Demo />
      <First />
    </div>
  );
}