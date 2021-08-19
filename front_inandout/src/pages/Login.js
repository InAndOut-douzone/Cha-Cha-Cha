import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../assets/css/loginForm.css"
import styled from 'styled-components'
import img from '../assets/images/hospital.jpg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${img});
  background-size: cover;
`;

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const header = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("Authorization"),
  },
};


export default function Login({ history, location }){

  const onfinish = async (value) => {
    let data = {
      username:value.no,
      password:"1"
    }
    console.log(4444,data)
    await axios.post(
      "http://localhost:8080/login",
      JSON.stringify(data),
      config
    ).then(res => {
    if(res.status === 200) {
      console.log("Authorization:" + res.headers.authorization);
      localStorage.setItem("Authorization", res.headers.authorization);
      axios.get("http://localhost:8080/api/user",header).then(res => {
        console.log(123,res);
        localStorage.setItem('userNo', res.data.no);
        localStorage.setItem('userRole', res.data.roles);
        window.location.replace("/")  
      }).catch (err => {
        console.log(err);
      })
    }
  }).catch(err => {
    alert('a');
  });
}
    return (
      <Container>
    <Form
      name="global_state"
      layout="inline"
      onFinish={onfinish}
    >
      <Form.Item name="no">
        <Input type="number" maxLength="8" required placeholder="사원번호 (숫자만 입력가능)" prefix={<UserOutlined />} /> 
      </Form.Item>
      <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
    </Form>
    </Container>
  )
}