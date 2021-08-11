import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const LoginForm = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
    action=''
    method='post'
  >
    <Form.Item>
      <Input name='userno' placeholder="사원번호"prefix={<UserOutlined />}  />
      <Button className="btn1" type='Primary' htmlType="submit" value='LOGIN'>LOGIN</Button>
    </Form.Item>
  </Form>
); 

  export default LoginForm;