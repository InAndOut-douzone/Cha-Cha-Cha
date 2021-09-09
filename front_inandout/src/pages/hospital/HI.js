import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions, Layout, Breadcrumb, Image } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from '../SiteLayout';
import Fade from 'react-reveal/Fade';
import DefaultLogo from '../../assets/images/defaultProfile.png';

const HIM = () => {
    const imgPath = "/images/";
    const [hospital, setHospital] = useState({});
    const [image, setImage] = useState();

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    // const config = {
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //     },
    // };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital", header).then((res) => {
            console.log(res);
            setHospital(res.data);
            if(res.data.logo != null) {
                setImage(imgPath + res.data.logo);
            } else {
                setImage(null);
            }
            JSON.stringify(res.data)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Fade bottom>
                    <div style={{ textAlign: "-webkit-center", width: "100%" }}>
                        <Descriptions title="의원 정보 관리" bordered style={{ textAlign: "-webkit-center", width: "50%" }}>
                            <Descriptions.Item label="의원 로고" span={3}><Image style={{ width: "200px" }} src={image === null ? DefaultLogo : image} roundedCircle /></Descriptions.Item>
                            <Descriptions.Item label="의원 번호" span={3}>{hospital.no}</Descriptions.Item>
                            <Descriptions.Item label="의원명" span={3}>{hospital.name}</Descriptions.Item>
                            <Descriptions.Item label="의원 주소" span={3}>{hospital.address}</Descriptions.Item>
                            <Descriptions.Item label="의원 연락처" span={3}>{hospital.telNum}</Descriptions.Item>
                            <Descriptions.Item label="대표자명" span={3}>{hospital.ceoName}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Fade>
            </Layout>
        </SiteLayout>
    );
};

export default HIM;