import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiTest = () => {
    const [users, setUsers] = useState(); // 배열

    // 로딩 spinner
    useEffect(() => {
        axios.get("http://localhost:8080/user/list").then(res => {
            console.log(1,res);
            console.log(2,res.data);
            console.log(3,res.data.name);

            //setUsers(res.data);
        })
    },[]); // 빈 괄호 = 최초 처음 한번만 실행한다.

    const fetch = () => {
        axios.get("http://localhost:8080/user/"+1).then(res => {
            console.log(11,res);
            console.log(22,res.data);

            setUsers(res.data.no);
        })
    }
    fetch();

    return (
        <div>
            <div>
                {users}
                {/* {users.map( (user) => <div key={user.no}>{user.name}</div>  )} */}
            </div>
        </div>
    );
};

export default ApiTest;