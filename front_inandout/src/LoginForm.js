import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const LoginForm = ({ onChange, fields }) => {

  const [value, setValue] = useState();

const onfinish = (value) => {
  console.log(value);
  setValue();
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
  action="localhost/4000"
  method='post'
>
  <Form.Item name="username">
    <Input name='userno' placeholder="사원번호"prefix={<UserOutlined />} value={value}/> 
  </Form.Item>

  <Button className="btn1" type='Primary' htmlType="submit">LOGIN</Button>
</Form>
)
}



  export default LoginForm;