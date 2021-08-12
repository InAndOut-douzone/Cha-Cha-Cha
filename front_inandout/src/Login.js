import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Input, LoginForm } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import './assets/css/loginForm.css';
import { Redirect, Link } from 'react-router-dom';

export default function Login({ history, location }){

  const [value, setValue] = useState();

  const asd = window.sessionStorage.getItem('userRole');

  const va = window.localStorage.getItem('userId');

  const onfinish = (value) => {
    if(!value.no){
      alert("사원번호를 입력해주세요");
    } else {
        axios.post("http://localhost:8080/api/user/login", value).then( res => {
          console.log(1,res);
          if(res.status === 201) {
            alert("없는 사원번호 입니다.");
          } 

          window.sessionStorage.setItem('userNo', res.data.no);
          window.sessionStorage.setItem('userRole', res.data.role);
  
          window.location.replace("/")

          // window.localStorage.setItem('userNo', res.data.no);
          // window.localStorage.setItem('userRole', res.data.role);
          
        });
      } 
    }

  
    return (
    <Form
      name="global_state"
      layout="inline"
      onFinish={onfinish}
    >
      <Form.Item name="no">
        <Input name='userno' placeholder="사원번호" prefix={<UserOutlined />} value={value}/> 
      </Form.Item>
      <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
    </Form>
    
  )
}
