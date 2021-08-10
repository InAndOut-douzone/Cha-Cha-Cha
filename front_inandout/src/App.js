import { Calendar } from 'antd';
import React from 'react';
import ApiTest from './ApiTest';
import ApiTest2 from './ApiTest2';
import DateTest from './DateTest';
import First from './First';

export default function App() {
  return (
    <div className="App">
      <Calendar />
      {/* <ApiTest />
      <ApiTest2 />
      <DateTest /> */}
      <First />
    </div>
  );
}