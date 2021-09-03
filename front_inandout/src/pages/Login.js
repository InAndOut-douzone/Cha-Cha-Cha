import React from 'react';
import axios from 'axios';
import { Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../assets/css/loginForm.css"
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
  
  p {text-align: center;}

  Form {
    width: 300px;
    background: $white;
    padding: 1.5em;
    border-radius: 20px;
    border-left: 1px solid $white;
    border-top: 1px solid $white;
    backdrop-filter: blur(30px);
    box-shadow: 20px 20px 40px -6px rgba(0,0,0,0.2);
    text-align: center;
    position: relative;
    
    input, Form.Item, button {
      text-align: center;
      background: bottom;
      padding: 0.75em;
      margin-top: 1.5em;
      border: none;
      border-left: 1px solid $white;
      border-top: 1px solid $white;
      border-radius: 10px;
      backdrop-filter: blur(5px);
      box-shadow: 4px 4px 60px rgba(0,0,0,0.2);
      color: #3F5EFB;
      font-family: Montserrat, sans-serif;
      font-weight: 500;
      transition: all 0.2s ease-in-out;

      &:hover {
        font-size: 1.2em;
      }
    }
  }

  `;

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

export default function Login({ history, location }) {

  const onfinish = async (value) => {
    let data = {
      username: value.no,
      password: "1"
    }
    console.log(4444, data)
    await axios.post(
      "http://localhost:8080/login",
      JSON.stringify(data),
      config
    ).then(async res => {
      if (res.status === 200) {
        localStorage.setItem("Authorization", res.headers.authorization);
        const header = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
          },
        };
        await axios.get("http://localhost:8080/api/user", header).then(res => {
          localStorage.setItem('userNo', res.data.id);
          localStorage.setItem('userRole', res.data.roles);
          localStorage.setItem('username', res.data.username);
          window.location.replace("/")
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      alert('없는 사원번호 입니다.');
    });
  }
  return (
    <Container>
      <Form
        name="global_state"
        layout="inline"
        onFinish={onfinish}
        >
        <div style={{width:'100%', textAlign:'center', fontSize:'2em', marginBottom:'30px', fontFamily: 'system-ui', color: 'lightslategrey'}}>IN AND OUT</div>
        <Form.Item name="no">
          {/* <input type="number" maxLength="8" required placeholder="사원번호 (숫자만 입력가능)" prefix={<UserOutlined />} /> */}
          <input style={{width:'100%'}} maxLength="8" required placeholder="사원번호" prefix={<UserOutlined />} />
        </Form.Item>
        <button className="btn1" type='Primary' htmlType="submit">LOGIN</button>
      </Form>
    </Container>
  )
}