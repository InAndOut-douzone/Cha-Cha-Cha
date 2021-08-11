import React, {useState} from 'react';
import LoginForm from './LoginForm';
import './assets/css/loginForm.css';

export default function Login(){
    const [fields, setFields] = useState([
      {
        name: ['username'],
        value: '',
      },
    ]);

    return (
      <div>
        <LoginForm
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
        />
        <pre className="language-bash"></pre>
      </div>
    );
  };