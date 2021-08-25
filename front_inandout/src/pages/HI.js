import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions, Layout, Breadcrumb, Image, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import logo from '../assets/images/logo.png';
import SiteLayout from './SiteLayout';

const HIM = () => {
    const [hospital, setHospital] = useState({});

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    const config = {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital", header).then((res) => {
            console.log(res); 
            setHospital(res.data);
            JSON.stringify(res.data)
        });
    }, []);

    return (
        <SiteLayout>
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>의원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>의원 정보 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }} />
            <br /><br />
            <Descriptions title="의원 정보 관리" bordered>
                <Descriptions.Item label="의원 번호" span={3}>{hospital.no}</Descriptions.Item>
                <Descriptions.Item label="의원명" span={3}>{hospital.name}</Descriptions.Item>
                <Descriptions.Item label="의원 로고" span={3}>{hospital.logo}</Descriptions.Item>
                <Descriptions.Item label="의원 연락처" span={3}>{hospital.telNum}</Descriptions.Item>
                <Descriptions.Item label="의원 주소" span={3}>{hospital.address}</Descriptions.Item>
                <Descriptions.Item label="대표자+명" span={3}>{hospital.ceoName}</Descriptions.Item>
            </Descriptions>
        </Layout>
        </SiteLayout>
    );
};

export default HIM;