import React, {useState} from 'react';
import LoginForm from './LoginForm';

export default function Demo(){
    const [fields, setFields] = useState([
      {
        name: ['username'],
        value: '',
      },
    ]);

    return (
      <>
        <LoginForm
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
        />
        <pre className="language-bash"></pre>
      </>
    );
  };