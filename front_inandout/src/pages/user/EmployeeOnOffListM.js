/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { List, Avatar,Typography } from 'antd';
// import image from '../../assets/images/nurse.jpg'
import styled from 'styled-components';
import axios from 'axios';
import SockJsClient from 'react-stomp';

const { Text } = Typography;

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
    getOnUser();
  },[])

  const getOnUser = async () => {
    await axios.get("http://localhost:8080/api/onoff/onuser", header).then((res) => {
      setOnUsers(res.data);
    });
  }
  const $websocket = useRef(null);


  //   const handleClickSendTo = () => { 
  //     $websocket.current.sendMessage ('/sendTo'); 
  // }; 

    return (
        <EmployeeOnOffListLayout>
          
        <SockJsClient
          url="http://localhost:8080/webSocket"
          topics={['/topics/sendTo', '/topics/sendTo2']}
          // onMessage={msg => { setCount(count + 1) }}
          onMessage={
              (msg) => { 
                getOnUser();
                console.log("msg : " + msg);
              }
          }
          ref={$websocket} />
            <div style={{height:"100%", width:"100%", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock"}}>
                <div style={{textAlign:"center", fontSize:"12px", background:"aliceblue"}}>출근 현황</div>
                <List
                    itemLayout="horizontal"
                    dataSource={onUsers}
                    renderItem={item => (
                      item.onTime === null ? null : 
                      
                          <List.Item
                          actions={ 
                            item.offTime === null ? 
                            [<Text style={{fontSize:"12px", color:"#40BCFF"}}>출근</Text>] : [<Text style={{fontSize:"12px", color:"#ff0000"}}>퇴근</Text>]}
                      >
                        {/* { item.offTime === null ? <Badge status="processing"/> : <Badge status="error "/>} */}
                          <List.Item.Meta
                          avatar={<Avatar src={'images/'+item.user.profile}/>}
                          title={item.user.name}
                          // title={<a href="#">{item.title}</a>}
                          description={item.user.position}
                          />
                      </List.Item>
                      
                    )}
                />
            </div>
        </EmployeeOnOffListLayout>
    );
};

export default EmployeeOnOffList;