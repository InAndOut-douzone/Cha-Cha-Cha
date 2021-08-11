import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const ApiTest = () => {
    const [user, setUser] = useState(); // 배열은 useState([])
    const [userNo, setUserNo] = useState(1);
    const [value, setValue] = useState(true);

    // 로딩 spinner
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/user/"+userNo).then(res => {
            setLoading(true);
            setTimeout( () => {
                setLoading(false);
                console.log(1,res);
                console.log(2,res.data);
                console.log(3,res.data.name);
    
                setUser(res.data.name);
            }, 500);       
        })
    },[userNo]); // 빈 괄호 = 최초 처음 한번만 실행한다.

    const userUp = () =>{
        if(userNo === 3){
            setValue(false);
        }
        setUserNo(userNo + 1);
        setLoading(true);
    }
    
    return (
        <div>
            <div>
                {   value ?
                        loading ? 
                            <Button type="primary" loading onClick={userUp}>123</Button> 
                        :   <Button type="primary" onClick={userUp}>123</Button> 
                    : null
                }
                { user }
            </div>
        </div>
    );
};

export default ApiTest;