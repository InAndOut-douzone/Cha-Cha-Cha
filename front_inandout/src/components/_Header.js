import React, { useState } from 'react';
import { Layout, Button, Modal, Card } from 'antd';
import { HomeOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
// import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import '../assets/css/scroll.css';
import axios from 'axios';
import moment from 'moment';

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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const [onTime, setOnTime] = useState("");
    const [offTime, setOffTime] = useState("");

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

    const showModal2 = () => {
        setIsModalVisible2(true);
    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    return (
        <div>
            <Header className="header">
                {/* <div className="logo" /> */}
                <div style={{width:"20%", display: "inline-block", background: "#001529", color: "silver", fontSize: "25px", fontStyle:"oblique"}}>IN-N-OUT</div>
                {/* <Clock className="clock" format={'YYYY 년 MM 월 DD 일 HH:mm:ss'} ticking={true} timezone={'KR/Pacific'}/> */}
               <div style={{textAlign:"right", width:"40%"}}>
                <Card style={{ width: "100%", height: 40, marginTop: 12, backgroundColor: "#001528" }}>
                    <div className='animation'>
                        <p><a style={{ color: "white" }} href="aa">[공지사항 1]</a></p>
                        <p><a style={{ color: "white" }} href="aa">[공지사항 2]</a></p>
                        <p><a style={{ color: "white" }} href="aa">[공지사항 3]</a></p>
                    </div>
                </Card>
                </div>
                <div style={{width:"40%", textAlign:"right"}}>

                <Button style={buttonStyle} className="inbutton" type="primary" onClick={showModal}>
                    <div> { {onTime} ? "IN" : {onTime} } </div>
                </Button>
                <Modal title="출근" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>정말 출근하시겠습니까?</p>
                </Modal>  
                
                <Button style={buttonStyle} className="button" type="primary" onClick={showModal2}>
                <div>OUT</div>
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
        </div>
    );
};

export default _Header;