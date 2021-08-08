import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest2 = () => {

    const [users, setUsers] = useState([]) // 배열

    useEffect( () => {
        axios.get("http://localhost:8080/user/list").then( res => {
            setUsers(res.data)
        })
    },[]) 
    
    return (
        <div>
            <h1>==================</h1>
              {users.map( (user) => <div key={user.no}>{user.name}</div>  )}     
        </div>
    );
};

export default ApiTest2;