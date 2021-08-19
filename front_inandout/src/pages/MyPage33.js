import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Breadcrumb, Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const MyPage = () => {

    const [form] = Form.useForm();

    const [user,setUser] = useState({});
    const [fileUrl, setFileUrl] = useState({});

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
        axios.get("http://localhost:8080/api/user/1",header).then((res)=>{
        console.log(res);
        setUser(res.data);
        setFileUrl(res.data.profile)
        });
    },[]);

    const processImage = (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
     }

    const dataUpdate = () => {
        axios.post("http://localhost:8080/api/user/update",config,header).then((res)=>{
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
            <br />
            <h2>사용자 정보</h2>
            <Form
                style={{width:"100%", alignSelf: "center" }}
                form={form}
                name="register"
                onFinish={dataUpdate}
                scrollToFirstError
            >
                <table cellPadding="15">
                    <tr>
                        <td rowspan="2">
                        <img style={{width:'200px', height:'250px'}} src={fileUrl}></img>
                        <br/>
                        <input type="file" accept="image/*" onChange={processImage}></input>    
                        </td>
                        <td>
                        <Form.Item name="name" label="이름"> {user.name} </Form.Item>
                        </td>
                        <td>
                        <Form.Item name="birthday" label="생년월일">{user.birth}</Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <Form.Item name="username" label="사원번호">{user.username}</Form.Item>
                        </td>
                        <td>
                        <Form.Item name="position" label="직급">{user.position}</Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        <Form.Item
                    
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: '이메일 타입으로 입력해주세요.',
                        },
                        {
                            required: true,
                            message: '이메일주소를 입력하세요.',
                        },
                    ]}
                >
                    <input defaultValue={user.email} />
                </Form.Item>
                </td>
                <td>
                    <Form.Item
                        name="phone"
                        label="전화번호"
                        rules={[
                            {
                                required: true,
                                message: '전화번호를 입력하세요.',
                            },
                        ]}
                    >
                        <Input defaultValue={user.phone}/>
                    </Form.Item>
                </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                    <Form.Item
                    name="address"
                    label="주소"
                    rules={[
                        {
                            required: true,
                            message: '주소를 입력해주세요.',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input defaultValue={user.address}/>
                </Form.Item>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
                    </td>
                </tr>
                </table>
                <br/>

            </Form>
        </Layout>
        </SiteLayout>
    );
};

export default MyPage;