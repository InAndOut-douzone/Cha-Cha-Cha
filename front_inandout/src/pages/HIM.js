import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Layout, Breadcrumb, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const HIM = () => {
    const [hospital, setHospital] = useState({});
    const [form] = Form.useForm();

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

    const onFinish = (values) => {
        console.log('값 : ', values);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital", header).then((res) => {
            console.log(res);
            setHospital(res.data);
        });
    }, []);

    return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                {hospital.no}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>의원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>의원 정보 관리</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />


                <Form
                    style={{ width: "350px", alignSelf: "center" }}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    scrollToFirstError
                >
                    {/* <Form.Item
                        name="no"
                        label="의원 번호"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your no!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="의원명을 입력해주세요" />
                    </Form.Item> */}
                    <Form.Item
                        name="name"
                        label="의원명"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <input defaultValue={hospital.name} />
                    </Form.Item>
                    <Form.Item
                        name="logo"
                        label="기업로고"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your logo!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="기업로고를 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        name="telNum"
                        label="의원 연락처"
                        rules={[
                            {
                                type: 'telNum',
                                message: 'The input is not valid telNum',
                            },
                            {
                                required: true,
                                message: 'Please input your telNum',
                            },
                        ]}
                    >
                        <Input placeholder="이메일을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="의원 주소"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="주소를 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        name="ceoName"
                        label="대표자명"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your ceoName!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input placeholder="직급을 입력해주세요" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            등록
                        </Button>
                    </Form.Item>
                </Form>






            </Layout>
    );
};

export default HIM;