import React from 'react';
import axios from 'axios';
import { Form } from 'antd';
import "../assets/css/loginForm.css"
import styled from 'styled-components'
import img from '../assets/images/hospital.jpg';
import { TextField, Button } from "@material-ui/core";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 850px;
  background-image: url(${img});
  background-size: cover;
  `;

// const Inandout = styled.div`
// body { width: 100%; height: 100%; background: #16345A; padding:0; margin:0; } 
// text-box { width: 100%; height: 100%; display:flex; justify-content: center; align-items: center; }
// font-family: 'Staatliches', cursive; font-size: 6em; text-align: center; color: #F1C164; text-shadow: 5px 5px #2D63A7; margin: 0;
// `;

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
          localStorage.setItem('userNo', res.data.no);
          localStorage.setItem('userRole', res.data.roles);
          window.location.replace("/")
        }).catch(err => {
          console.log(err);
        })
      }
    }).catch(err => {
      alert('존재하지 않는 사원번호입니다.');
    });
  }
  return (
    <Container>
      {/* <Inandout>In and Out</Inandout> */}
      <Form
        name="global_state"
        layout="inline"
        onFinish={onfinish}
      >
        <Form.Item name="no">
          {/* <Input type="number" maxLength="8" required placeholder="사원번호 (숫자만 입력가능)" prefix={<UserOutlined />} /> */}
          {/* <TextField type="number" maxLength="8" id="standard-basic" label="사원번호" /> */}
          <TextField maxLength="8" id="standard-basic" label="사원번호" />
        </Form.Item>
        <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
        {/* <Button variant="outlined" color="primary">
        LOGIN
      </Button>      */}
      </Form>
    </Container>
  )
}