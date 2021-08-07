import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
    const [users, setUsers] = useState([]); // 배열

    useEffect(() => {
        axios.get("http://localhost:8080/user/list").then(res => {
            console.log(1,res);
            console.log(2,res.data);
            console.log(3,res.data.name);

            setUsers(res.data);
        })
    },[]); // 빈 괄호 = 최초 처음 한번만 실행한다.
    return (
        <div>
            <div>
                {users.map( (user) => <div>{user.name}</div>  )}
            </div>
        </div>
    );
};

export default ApiTest;