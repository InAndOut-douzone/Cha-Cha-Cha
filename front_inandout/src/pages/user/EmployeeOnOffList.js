import React, { useEffect, useState } from 'react';
import { List, Avatar,Typography, Space } from 'antd';
import image from '../../assets/images/nurse.jpg'
import styled from 'styled-components';
import axios from 'axios';

const { Text, Link } = Typography;

// const data = [
//     {
//       title: '김정현',
//     },
//     {
//       title: '김정인',
//     },
//     {
//       title: '이재성',
//     },
//     {
//       title: '안대혁',
//     },
//   ];

const EmployeeOnOffListLayout = styled.div`
  .ant-list-item-meta-title { font-size:12px },
  .ant-list-item-meta-description { font-size:12px },
  .ant-typography-success { font-size: 12px; },
//   .fc-event-main-frame { background: #ff9aa3; }


`

const EmployeeOnOffList = () => {

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };

  const [onUsers, setOnUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/onoff/onuser", header).then((res) => {
      setOnUsers(res.data);
    });
  },[])

  let data = [];
  onUsers.map((onUser) => data.push({
    ...onUser}
    ))

    console.log(data);
    return (
        <EmployeeOnOffListLayout>
            <div style={{height:"100%", width:"200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock"}}>
                <div style={{textAlign:"center", fontSize:"12px", background:"aliceblue"}}>출근 현황</div>
                <List
                    itemLayout="horizontal"
                    dataSource={onUsers}
                    renderItem={item => (
                    <List.Item
                        actions={ item.offTime === null ? [<Text style={{fontSize:"12px", color:"#40BCFF"}}>출근</Text>] : [<Text style={{fontSize:"12px", color:"#ff0000"}}>퇴근</Text>]}
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={'images/'+item.user.profile}/>}
                        title={<a href="#">{item.user.name}</a>}
                        // title={<a href="#">{item.title}</a>}
                        description="의사"
                        />
                    </List.Item>
                    )}
                />
            </div>
        </EmployeeOnOffListLayout>
    );
};

export default EmployeeOnOffList;