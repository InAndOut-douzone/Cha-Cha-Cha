import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Card } from 'antd';
import { HomeOutlined, NotificationOutlined, LogoutOutlined } from '@ant-design/icons';
// import Clock from 'react-live-clock';
import { Link } from 'react-router-dom';
import '../assets/css/scroll.css';

const { Header } = Layout;

const _Header = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);

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
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                </Menu>
                {/* <Clock className="clock" format={'YYYY 년 MM 월 DD 일 HH:mm:ss'} ticking={true} timezone={'KR/Pacific'}/> */}
                <Card style={{width:450,height:40,margin:'10px'}}>
                    <div className='animation'>
                        <p><a href="aa">11111111ㅁㄴㅇㄹㅁㄴ리ㅗㅁㅈㄷㄹㅁㄴㅇㄹㅁㄴㅁㄴㅇㄹ111</a></p>
                        <p><a href="bb">222222222222</a></p>
                    </div>
                </Card>
                <Button className="button" type="primary" onClick={showModal}>
                    출근
                </Button>
                <Modal title="출근" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>정말 출근하시겠습니까?</p>
                </Modal>
                <Button className="button" type="primary" onClick={showModal2}>
                    퇴근
                </Button>
                <Modal title="퇴근" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                    <p>정말 퇴근하시겠습니까?</p>
                </Modal>
                <Button className="button" type="primary" shape="circle">
                    <Link to="/"><HomeOutlined/></Link>
                </Button>
                <Button className="button" type="primary" shape="circle">
                    <LogoutOutlined/>
                </Button>
                <Button className="button" type="primary" shape="circle">
                    <NotificationOutlined/>
                </Button>
            </Header>
        </div>
    );
};

export default _Header;