import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './assets/css/loginForm.css';

const LoginForm = ({ onChange, fields }) => (
    <div className={styles.loginForm}>
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        name="username"
        label="사원 번호"
        /* rules={[
          {
            required: true,
            message: 'Username is required!',
          },
        ]}
        */
      >
        <Input />
      </Form.Item>
      <Button type='Primary' value='login'>LOGIN</Button>
    </Form>
    </div>
  ); 

  export default LoginForm;