import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, Input, LoginForm } from 'antd';
import { HeartFilled, UserOutlined } from '@ant-design/icons';
import "../assets/css/loginForm.css"
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components'
import img from '../assets/images/hospital.jpg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${img});
  background-size: cover;
`;

export default function Login({ history, location }){

  const [value, setValue] = useState();

  const onfinish = (value) => {
    if(!value.no){
      alert("사원번호를 입력해주세요");
    } else {
        axios.post("http://localhost:8080/api/user/login", value).then( res => {
          console.log(1,res);
          if(res.status === 200) {  // ID가 존재 시
            window.sessionStorage.setItem('userNo', res.data.no);
            window.sessionStorage.setItem('userRole', res.data.role);
            // window.localStorage.setItem('userNo', res.data.no);
            // window.localStorage.setItem('userRole', res.data.role);
    
            window.location.replace("/")  
          }
          else { // 존재하지 않을 시
            alert("없는 사원번호 입니다.");
          }
        });
      } 
    }

    const inNumber = (e) => {
      if(e.keyCode<48 || e.keyCode>57){
        e.returnValue=false;
     }
    }

    return (
      <Container>
    <Form
      name="global_state"
      layout="inline"
      onFinish={onfinish}
    >
      <Form.Item name="no">
        <Input type="number" maxLength="8" required placeholder="사원번호 (숫자만 입력가능)" prefix={<UserOutlined />} value={value}/> 
      </Form.Item>
      <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
    </Form>
    </Container>
    
  )
}