import React, { useState, useEffect } from 'react';
import { Layout, Button, Modal, Card } from 'antd';
import { HomeOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
// import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

const { Header } = Layout;

const _Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const header = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      };

    const buttonStyle = {
        transform: "translate(0%, 2%)",
        backgroundColor: "#001529",
        border:"0px solid silver",
        borderRadius:"5px",
        marginLeft:"-1px",
    }

    const buttonStyle2 = {
        transform: "translate(0%, 2%)",
        backgroundColor: "#001529",
        border:"0px solid silver",
        //borderRadius:"5px",
    }

    const showModalOn = () => {
        if(onTime === "IN") {
            setIsModalVisible(true);    
        } else {
            alert("출근을 이미 하였습니다.");
        }
    };

    const [onTime, setOnTime] = useState("IN");
    const [offTime, setOffTime] = useState("OUT");

    const handleOk = () => {
        axios.get("http://localhost:8080/api/onoff/"+localStorage.getItem("username"), header).then(res=>{
            // moment 사용해서 데이터 포멧 2021-08-23T07:20:44.326+00:00 => 
            setOnTime(moment(res.data.onTime).format("HH mm"));
        }).catch();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModalOff = () => {
        if(offTime === "OUT") {
            setIsModalVisible2(true);  
        } else {
            alert("퇴근을 이미 하였습니다.");
        }
    };

    const handleOk2 = () => {
        axios.get("http://localhost:8080/api/onoff", header).then(res=>{
            // moment 사용해서 데이터 포멧 2021-08-23T07:20:44.326+00:00 => 
            setOffTime(moment(res.data.offTime).format("HH mm"));
        }).catch();
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const [notice,setNotice] = useState([]);
    // const notice=[];

    useEffect(()=>{
        axios.get("http://localhost:8080/api/getonoff", header).then(res => {
            if(res.data === "") {
                return;                
            } else {
                if(res.data.onTime !== null) {
                    setOnTime(moment(res.data.onTime).format("HH mm"));
                } 
                if(res.data.offTime !== null) {
                    setOffTime(moment(res.data.offTime).format("HH mm"));
                }
            }
            // console.log(res);
        }).catch();

        axios.get("http://localhost:8080/api/notice/list", header).then(res=>{
            const title=[];
            for(var i in res.data){
                title.push(res.data[i].title);
            }
            setNotice(title);
        })
    },[])

    const noticeList = notice.map((title, index) => <p key={index}><Link to="/notice">{title}</Link><br/></p>);

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
        animation:text-scroll 8s linear infinite;
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

    return (
        <DIV>
            <Header className="header">
                {/* <div className="logo" /> */}
                <div style={{width:"20%", display: "inline-block", background: "#001529", color: "silver", fontSize: "25px", fontStyle:"oblique"}}>IN-N-OUT</div>
                
                {/* <Clock className="clock" format={'YYYY 년 MM 월 DD 일 HH:mm:ss'} ticking={true} timezone={'KR/Pacific'}/> */}
               <div style={{textAlign:"right", width:"40%"}}>
                <Card style={{ width: "100%", height: 40, marginTop: 12, backgroundColor: "#001528" }}>
                    <ul className='animation'>
                        { /* <p><a style={{ color: "white" }} href="/notice">{notice}</a></p> */}
                       {noticeList}
                    </ul>
                </Card>
                </div>
                <div style={{width:"40%", textAlign:"right"}}>

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
                    <BellOutlined />
                </Button>
                </div>
            </Header>
        </DIV>
    );
};

export default _Header;