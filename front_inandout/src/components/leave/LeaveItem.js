import React, {useRef} from 'react';
import { Card, Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';
import SockJsClient from 'react-stomp';

const { Text } = Typography;

const LeaveItem = (props) => {

    const getLeaves = props.onClick;
    const { no, category, toDate, fromDate, content, user } = props.leave;

    const update = () => {
        getLeaves();
    }

    const formatToDate = moment(toDate).format("MM월 DD일");
    const formatFromDate = moment(fromDate).format("MM월 DD일");

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    const $websocket = useRef (null); 
    const userNo = localStorage.getItem('userNo');

    const success = async () => {
        let data = {
            no: no,
            state: "success"
        }
        await axios.post("http://localhost:8080/api/leave/update", data, header).then(res => { console.log(res) }).catch(err => { });
        alert("승인 했습니다.")
        update();
        // $websocket.current.sendMessage('/Template2'); 
    }

    const fail = async () => {
        let data = {
            no: no,
            state: "fail"
        }
        await axios.post("http://localhost:8080/api/leave/update", data, header).then(res => { console.log(res) }).catch(err => { });
        alert("반려 했습니다.")
        update();
        // $websocket.current.sendMessage('/Template2'); 
    }

    return (
        <>
            <Card title={user.name + " " + user.position} extra={
                <div>
                    <SockJsClient
                        url="http://localhost:8080/webSocket"
                        topics={[`/topics/template${userNo}`]}
                        onMessage={msg => { console.log(msg); }}
                        ref={$websocket} />
                    <button onClick={success} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>승인</button>
                    <button onClick={fail} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>거절</button>
                </div>} style={{ width: 300 }} >


                <p><Text type="success">구분 : </Text>{category}</p>
                <p><Text type="success">기간 : </Text>{formatFromDate + " ~ " + formatToDate}</p>
                <p><Text type="success">사유 : </Text> {content}</p>
            </Card>
        </>
    );
};

export default LeaveItem;