/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Descriptions, Badge, Breadcrumb, Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import DefaultProfile from '../../assets/images/defaultProfile.png';
import SiteLayout from '../SiteLayout';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const MyPageLayout = styled.div`
    .ant-descriptions-item-label { text-align:center }
`

const MyPage = () => {

    //const imgPath = "profiles/";
    const imgPath = "/images/";
    const [user, setUser] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [image, setimage] = useState({});
    const [profile, setProfile] = useState({});
    const formData = new FormData();

    const profileHandler = (e) => {
        e.preventDefault();
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);

        setimage(imageFile); // formdata에 선택된 이미지 파일을 넣기 위해 저장
        setProfile(imageUrl);// 프로필 미리보기를 출력하기 위해 이미지 url 저장
    };

    const emailHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const phoneHandler = (e) => {
        e.preventDefault();
        setPhone(e.target.value);
    };

    const header = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + sessionStorage.getItem("Authorization")
        }
    };

    useEffect(() => { // user정보 get, useEffect를 사용하여 한번만 get 하도록 설정
        axios.get("http://localhost:8080/api/user", header).then((res) => {
            setUser(res.data);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            if(res.data.profile != null) {
                setProfile(imgPath + res.data.profile);
            } else {
                setProfile(null);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 프로필 수정
    const dataUpdate = (e) => {

        let userData = {
            profile: null,
            email: email,
            phone: phone
        };

        formData.append('file', image);
        formData.append('userData', JSON.stringify(userData));
        axios.post("http://localhost:8080/api/user/update", formData, header).then((res) => {
            alert("수정 되었습니다.");
            window.location.replace("/");
        });

    }

    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>내 정보</Breadcrumb.Item>
                    <Breadcrumb.Item>프로필 수정</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <Fade bottom>
                <Form style={{ width: '90%', textAlign:"center" }} onFinish={dataUpdate} >    
                    <div style={{ textAlign: "center" }}>
                        프로필을 수정할 수 있는 화면입니다. <br/> ( *사진, 이메일, 연락처만 수정 가능합니다.) <br /><br /><br />
                    </div>
                    <div style={{textAlign:"center"}}>
                        <img style={{width:"200px", height:"200px"}} src={profile === null ? DefaultProfile : profile} />
                        <br/><br/>   
                        <div style={{ textAlign: "-webkit-center"}}>
                            <input style={{textAlignLast:"center"}} type="file" accept="image/*" name="file" onChange={profileHandler}></input>
                        </div>
                    </div>
                    <MyPageLayout style={{ padding: "30px 150px"}}>
                    <Descriptions title="" layout="vertical" bordered>
                        <Descriptions.Item label="이름">{user.name}</Descriptions.Item>
                        <Descriptions.Item label="직급">{user.position}</Descriptions.Item>
                        <Descriptions.Item label="생년월일">{user.birth}</Descriptions.Item>

                        <Descriptions.Item label="이메일">
                            <Form.Item rules={[{ type: 'email', message: '이메일형식을 맞게 입력하세요.' }]}>
                                <Input style={{border: "1px solid beige", textAlign: "center"}} value={email} onChange={emailHandler} />
                            </Form.Item>
                        </Descriptions.Item>

                        <Descriptions.Item label="연락처" span={2}>
                            <Form.Item rules={[{ required: true, message: '연락처를 입력하세요.' }]}>
                                <Input style={{border: "1px solid beige", textAlign: "center"}} value={phone} onChange={phoneHandler} />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="근무 상태" span={3}>
                            <Badge status="processing" text="근무 중" />
                        </Descriptions.Item>
                    </Descriptions>
                    </MyPageLayout>
                    <br />
                    <Form.Item>
                        <Button type='Primary' htmlType="submit">수정</Button>
                    </Form.Item>
                </Form>
                </Fade>
            </Layout>
        </SiteLayout>
    );
};
export default MyPage;
