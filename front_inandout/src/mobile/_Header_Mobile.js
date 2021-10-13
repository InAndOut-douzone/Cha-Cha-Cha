import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, Modal, Card, Drawer, Badge, notification } from 'antd';
import { HomeOutlined, LogoutOutlined, BellOutlined, NotificationOutlined } from '@ant-design/icons';
// import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import SockJsClient from 'react-stomp';

const { Header } = Layout;

const DIV = styled.div`
        .ant-card{
            text-align: left;
            margin-right: 10px;
            display: inline-block;
        }
        
        
        .ant-card-body{
            padding: 5px !important;
            height: 38px;
            overflow: hidden;
        }
        
        .ant-card-bordered {
            border: 0px solid !important;
        }
        
        .animation{
            animation:text-scroll 20s linear infinite;
        }
        .animation a {
            color:white;
            margin-bottom: 10px;
        }
        
        @keyframes text-scroll{
            from{
              transform:translateY(30%);
              -moz-transform:translateY(30%);
              -webkit-transform:translateY(30%);
              -o-transform:translateY(30%);
              -ms-transform:translateY(30%);
            }
            to{
              transform:translateY(-100%);
              -moz-transform:translateY(-100%);
              -webkit-transform:translateY(-100%);
              -o-transform:translateY(-100%);
              -ms-transform:translateY(-100%);
            }
        }
        `
const Card2 = styled.div`
        .ant-card-head-title{
            color: lightgray;
        }
        `


const _Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [visible, setVisible] = useState(false); // 알림 drawer
    const [alarm, setAlarm] = useState([]);
    const [onTime, setOnTime] = useState("IN");
    const [offTime, setOffTime] = useState("OUT");
    const [user, setUser] = useState({});

    const showDrawer = () => { // 알림창 열기
        alarm_fetch()
        setVisible(true);
        setCount(0);
    };

    const onClose = () => { // 알림창 닫기
        setVisible(false);
        axios.put("http://localhost:8080/api/alarm", data, header).then(res => {
        })
    };

    const header = {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
        },
    };

    const buttonStyle = {
        transform: "translate(0%, 2%)",
        backgroundColor: "#001529",
        border: "0px solid silver",
        borderRadius: "5px",
        marginLeft: "-1px",
    }

    const buttonStyle2 = {
        transform: "translate(0%, 2%)",
        backgroundColor: "#001529",
        border: "0px solid silver",
        //borderRadius:"5px",
    }

    const showModalOn = () => { // 출근 버튼 모달
        if (onTime === "IN") {
            setIsModalVisible(true);
        } else {
            alert("출근을 이미 하였습니다.");
        }
    };

    const alarmDelete = async (no) => { // 알림 삭제
        await axios.delete("http://localhost:8080/api/alarm/" + no, header).then((res) => {
            alert("알림이 삭제되었습니다.");
            alarm_fetch()
        });
    }

    const alarmAllDelete = async () => { // 알림 모두 삭제
        await axios.delete("http://localhost:8080/api/alarm", header).then((res) => {
            alert("알림이 모두 삭제되었습니다.");
            alarm_fetch()
        });
    }

    const handleOk = async () => {
        await axios.get("http://localhost:8080/api/onoff/" + sessionStorage.getItem("username"), header).then(res => {
            // moment 사용해서 데이터 포멧 2021-08-23T07:20:44.326+00:00 => 
            setOnTime(moment(res.data.onTime).format("HH mm"));
        }).catch();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModalOff = () => {
        if (offTime === "OUT") {
            setIsModalVisible2(true);
        } else {
            alert("퇴근을 이미 하였습니다.");
        }
    };

    const alarm_fetch = async () => { // 알림 데이터 받아오기
        await axios.get("http://localhost:8080/api/alarm", header).then((res) => {
            setAlarm(res.data);
        })
    };

    const handleOk2 = async () => {
        await axios.get("http://localhost:8080/api/onoff", header).then(res => {
            // moment 사용해서 데이터 포멧 2021-08-23T07:20:44.326+00:00 => 
            setOffTime(moment(res.data.offTime).format("HH mm"));
        }).catch();
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    // const [notice, setNotice] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/getonoff", header).then(res => {
            if (res.data === "") {
                return;
            } else {
                if (res.data.onTime !== null) {
                    setOnTime(moment(res.data.onTime).format("HH mm"));
                }
                if (res.data.offTime !== null) {
                    setOffTime(moment(res.data.offTime).format("HH mm"));
                }
            }
        }).catch();

        axios.get("http://localhost:8080/api/notice/listFour", header).then(res => {
            const title = [];
            for (var i in res.data) {
                title.push({
                    no: res.data[i].no,
                    title: res.data[i].title
                })
            }
            // setNotice(title);
        })

        axios.get("http://localhost:8080/api/alarm/count", header).then(res => { // 알림 개수 찾아오기
            setCount(res.data);
        })

        axios.get("http://localhost:8080/api/user", header).then(res => { // 알림 개수 찾아오기
            setUser(res.data);
        })

        alarm_fetch()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const data = [];
    alarm.map((alarm, index) => data.push({
        key: index + 1,
        ...alarm
    }))

    // const noticeList = notice.map((title, index) =>
    //     <p key={title.no}><Link to={"/notice/" + title.no}>{title.title}</Link></p>);

    //
    const $websocket = useRef(null);
    const [count, setCount] = useState(0); // 알림 개수
    const userNo = sessionStorage.getItem('userNo');
    // const [profileState, setProfileState] = useState();
    // const [user,setUser] = useState();
    //

    return (
        <DIV>
            <Header className="header" style={{ width: '100%', padding: '0' }}>
                <div style={{ paddingLeft: '10px', width: "10px", display: "inline-block", background: "#001529", color: "silver", fontSize: "15px", fontStyle: "oblique" }}><Button style={buttonStyle} className="inbutton" type="primary"><Link to="/">In&Out</Link></Button></div>
                {/* <Image style={{ borderRadius: "80%", width: '100%', height: '100%' }}
                    height='90%' width='50px'
                    src={profileState ? '/images/' + user.profile : DefaultProfile}
                /> */}
                <div style={{ paddingRight: '15px', width: "100%", textAlign: "right" }}>

                    <Button style={buttonStyle} className="inbutton" type="primary" onClick={showModalOn}>
                        <div>{onTime}</div>
                    </Button>
                    <Modal title="출근" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>정말 출근하시겠습니까?</p>
                    </Modal>

                    <Button style={buttonStyle} className="button" type="primary" onClick={showModalOff}>
                        <div>{offTime}</div>
                    </Button>
                    <Modal title="퇴근" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                        <p>정말 퇴근하시겠습니까?</p>
                    </Modal>
                    <Button style={buttonStyle2} className="button" type="primary" shape="circle">
                        <Link to="/"><HomeOutlined /></Link>
                    </Button>
                    <Button style={buttonStyle2} className="button" type="primary" shape="circle">
                        <Link to="/logout"><LogoutOutlined /></Link>
                    </Button>
                    <Button style={buttonStyle2} className="button" type="primary" shape="circle">
                        <Link to="/notice"><NotificationOutlined /></Link>
                    </Button>


                    <Badge count={count}>
                        <Button onClick={showDrawer} style={buttonStyle2} className="button" type="primary" shape="circle">
                            <BellOutlined />
                        </Button>
                    </Badge>
                    <SockJsClient
                        url="http://localhost:8080/webSocket"
                        topics={[`/topics/template${userNo}`]}
                        // onMessage={msg => { setCount(count + 1) }}
                        onMessage={
                            (msg) => {
                                alarm_fetch()
                                setCount(count + 1)
                                notification.open({
                                    message: msg.user.name,
                                    description:

                                        '연차신청을 등록하였습니다.',
                                    onClick: () => {
                                    },
                                })
                            }
                        }
                        ref={$websocket} />

                    <SockJsClient
                        url="http://localhost:8080/webSocket"
                        topics={[`/topics/template2${userNo}`]}
                        // onMessage={msg => { setCount(count + 1) }}
                        onMessage={
                            (msg) => {
                                alarm_fetch()
                                setCount(count + 1)
                                msg.state === "success" ?
                                    msg.category === '출장' || msg.category === '외근' ?
                                        notification.open({
                                            message: msg.user.name,
                                            description:
                                                msg.category + ' 일정이 변경되었습니다.',
                                            onClick: () => {
                                            },
                                        }) :
                                        notification.open({
                                            message: msg.user.name,
                                            description:
                                                msg.category + '가 승인되었습니다.',
                                            onClick: () => {
                                            },
                                        }) :
                                    notification.open({
                                        message: msg.user.name + "님",
                                        description:
                                            msg.category + ' 신청이 반려되었습니다.',
                                        onClick: () => {
                                            window.location.replace("/leavemanagement")
                                        },
                                    })
                            }
                        }
                        ref={$websocket} />

                    <SockJsClient
                        url="http://localhost:8080/webSocket"
                        topics={[`/topics/template3${userNo}`]}
                        onMessage={
                            (msg) => {
                                alarm_fetch()
                                setCount(count + 1)
                                msg.category === '출장' || msg.category === '외근' ?
                                    notification.open({
                                        message: msg.user.name,
                                        description:
                                            msg.category + ' 일정이 삭제되었습니다.',
                                        onClick: () => {
                                        },
                                    }) :
                                    notification.open({
                                        message: msg.user.name,
                                        description:
                                            msg.category + '가 삭제되었습니다.',
                                        onClick: () => {
                                        },
                                    })
                            }
                        }
                        ref={$websocket} />

                    <Drawer
                        title="알림"
                        width="250px"
                        placement="right"
                        closable={true}
                        onClose={onClose}
                        visible={visible}
                    >
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <button onClick={() => alarmAllDelete()} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>모두 삭제</button>
                        </div>
                        {user.position === '간호사' ?
                            alarm.map((al) =>
                                al.state === true ?
                                    <Card style={{ border: "1px solid darkgray", width: "100%", marginBottom: "10px", color: "black", borderRadius: "10px" }}
                                        size="small" title={al.fromUser.name + "　" + moment(al.regDate).format("YYYY-MM-DD HH:mm")}
                                        extra={
                                            <div>
                                                <button onClick={() => alarmDelete(al.no)} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>삭제</button>
                                            </div>} key={al.no}>
                                        {user.position === '간호사' ?
                                            <p>{al.message + " 일정이 변경 되었습니다."}</p> :
                                            <p>{al.message + "신청을 등록 하였습니다."}</p>
                                        }

                                    </Card>
                                    :
                                    <Card2 key={al.no}>
                                        <Card style={{ width: "100%", marginBottom: "10px", color: "lightgray", borderRadius: "10px" }}
                                            size="small" title={al.fromUser.name + "　" + moment(al.regDate).format("YYYY-MM-DD HH:mm")}
                                            extra={
                                                <div>
                                                    <button onClick={() => alarmDelete(al.no)} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>삭제</button>
                                                </div>} key={al.no}>
                                            {user.position === '간호사' ?
                                                <p>{al.message + " 일정이 변경 되었습니다."}</p> :
                                                <p>{al.message + "신청을 등록 하였습니다."}</p>
                                            }
                                        </Card>
                                    </Card2>
                            )
                            :
                            alarm.map((al) =>
                                al.state === true ?
                                    <Link to="/leaveManagement">
                                        <Card hoverable style={{ border: "1px solid darkgray", width: "100%", marginBottom: "10px", color: "black", borderRadius: "10px" }}
                                            size="small" title={al.fromUser.name + "　" + moment(al.regDate).format("YYYY-MM-DD HH:mm")}
                                            extra={
                                                <div>
                                                    <button onClick={() => alarmDelete(al.no)} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>삭제</button>
                                                </div>} key={al.no}>
                                            {user.position === '간호사' ?
                                                <p>{al.message + " 일정이 변경 되었습니다."}</p> :
                                                <p>{al.message + " 일정이 변경 되었습니다."}</p>
                                            }

                                        </Card>
                                    </Link>
                                    :
                                    <Card2 key={al.no}>
                                        <Link to="/leaveManagement">
                                            <Card hoverable style={{ width: "100%", marginBottom: "10px", color: "lightgray", borderRadius: "10px" }}
                                                size="small" title={al.fromUser.name + "　" + moment(al.regDate).format("YYYY-MM-DD HH:mm")}
                                                extra={
                                                    <div>
                                                        <button onClick={() => alarmDelete(al.no)} style={{ color: "#4EAFFF", background: "white", border: "0px" }}>삭제</button>
                                                    </div>} key={al.no}>
                                                {user.position === '간호사' ?
                                                    <p>{al.message + " 일정이 변경 되었습니다."}</p> :
                                                    <p>{al.message + " 일정이 변경 되었습니다."}</p>
                                                }
                                            </Card>
                                        </Link>
                                    </Card2>
                            )
                        }
                        <br />
                    </Drawer>
                </div>
            </Header>
        </DIV>
    );
};

export default _Header;