import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const LoginForm = ({ onChange, fields, history }) => {

  const [value, setValue] = useState();

  const onfinish = (value) => {
    if(!value.no){
      alert("사원번호를 입력해주세요");
    } else {
        axios.post("http://localhost:8080/api/user/login", value).then( res => {
          console.log(res);
          window.localStorage.setItem('userId', res.data.no);
          history.push('/login');
        });
      } 
    }

  return (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFinish={onfinish}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
>
  <Form.Item name="no">
    <Input name='userno' placeholder="사원번호" prefix={<UserOutlined />} value={value}/> 
  </Form.Item>

  <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
  </Form>
  )
}

  export default LoginForm;