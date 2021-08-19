import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Descriptions, Badge, Breadcrumb, Form,Button,Input  } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const MyPage = () => {
    
    const [user,setUser] = useState({});
    const [fileUrl, setFileUrl] = useState({});
    const [email, setEmail]=useState({});
    const [phone, setPhone]=useState({});

    const processImage = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
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
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      };

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/1",header).then((res)=>{
        console.log(res);
        setUser(res.data);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setFileUrl(res.data.profile);
        });
    },[]);

    const dataUpdate = (e) => {

        let user = {
        headers:{"Content-Type": "application/json; charset=utf-8"},
        profile:fileUrl,
        email:email,
        phone:phone
        };

        axios.post("http://localhost:8080/api/user/update",user,header).then((res)=>{
            console.log(res);
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
            <div style={{ borderTop: "1px solid #eee" }}/>
            <br /><br />
            <Form style={{width:'90%'}} onFinish={dataUpdate}>
            <h2>사용자 정보</h2>
            <img style={{width:'25%', height:'35%'}} src={fileUrl}></img>
            <input type="file" accept="image/*" onChange={processImage}></input>
            <br/>
            <Descriptions title="" layout="vertical" bordered>
                <Descriptions.Item label="이름">{user.name}</Descriptions.Item>
                <Descriptions.Item label="직급">{user.position}</Descriptions.Item>
                <Descriptions.Item label="생년월일">{user.birth}</Descriptions.Item>
                
                <Descriptions.Item label="이메일">
                    <Form.Item rules={[{type:'email', message:'이메일형식을 맞게 입력하세요.'}]}>
                        <input defaultValue={user.email} onChange={emailHandler}/>
                    </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="연락처" span={2}>
                    <Form.Item rules={[{ required:true, message:'연락처를 입력하세요.'}]}>
                        <input defaultValue={user.phone} onChange={phoneHandler} />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="근무 상태" span={3}>
                    <Badge status="processing" text="근무 중" />
                </Descriptions.Item>
            </Descriptions>
            <br/>
            <Form.Item>
                <Button  type='Primary' htmlType="submit">수정</Button>
            </Form.Item>
            </Form>
        </Layout>
        </SiteLayout>
    );
};

export default MyPage;