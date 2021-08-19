import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Card } from 'antd';
import { HomeOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
// import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import '../assets/css/scroll.css';

const { Header } = Layout;


const _Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const buttonStyle = {
        transform: "translate(0%, 2%)",
        backgroundColor: "#001529",
        border:"1px solid white",
        borderRadius:"5px"
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
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
                <Button style={buttonStyle} className="button" type="primary" onClick={showModal}>
                    출근
                </Button>
                <Modal title="출근" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>정말 출근하시겠습니까?</p>
                </Modal>
                <Button style={buttonStyle} className="button" type="primary" onClick={showModal2}>
                    퇴근
                </Button>
                <Modal title="퇴근" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                    <p>정말 퇴근하시겠습니까?</p>
                </Modal>
                {/* <Button className="button" type="primary">
                    <Link to="/logout">로그아웃</Link>
                </Button> */}

                <Button style={buttonStyle} className="button" type="primary" shape="circle">
                    <Link to="/"><HomeOutlined /></Link>
                </Button>
                <Button style={buttonStyle} className="button" type="primary" shape="circle">
                    <Link to="/logout"><LogoutOutlined /></Link>
                </Button>
                <Button style={buttonStyle} className="button" type="primary" shape="circle">
                    <BellOutlined />
                </Button>
                </div>
            </Header>
        </div>
    );
};

export default _Header;