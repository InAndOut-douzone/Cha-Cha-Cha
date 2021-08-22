import React, { useState, useRef } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, CloseOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';

const { Option } = Select;

const Add_Employee = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('값 : ', values);
        console.log(values.birthday.format('YYYY MM DD'));
        console.log('값 : ', values);
    };

    const [username, setUsername] = useState();
    const [usernameCheckState, setUsernameCheckState] = useState(false);
    const inputRef = useRef(null);

    const header = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      };

    const usernameCheck = async (event) => {
        setUsername(event.target.value);
        if(event.target.value === "") {
            setUsernameCheckState(false);
            inputRef.current.focus();
        }
        await axios.get("http://localhost:8080/api/user/usernameCheck/"+event.target.value, header).then( res => {
            if(res.data === "") {
                setUsernameCheckState(true);
                inputRef.current.focus();
            } else {
                setUsernameCheckState(false);
                inputRef.current.focus();
            }
        }).catch( err => {
            console.log(err);
        });
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const DIV = styled.div`
        .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        }
    `

    return (
        <DIV>
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }}/>
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
                <Form.Item
                    name="name"
                    label="이름"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="사원번호"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input ref={inputRef} value={username} style={{display:"flex"}} onChange={usernameCheck} placeholder="사원번호를 입력해주세요" /> 
                    {
                        usernameCheckState ?
                        <CheckCircleTwoTone style={{marginLeft:"10px"}} twoToneColor="#52c41a" /> :
                         <CloseOutlined style={{marginLeft:"10px", color:"red"}}/>
                    }
                    
                </Form.Item>
                <Form.Item
                    name="birthday"
                    label="생년월일"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your birthday!',
                    //         whitespace: true,
                    //     },
                    // ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="성별"
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="성별을 선택해주세요">
                        <Option value="male">남자</Option>
                        <Option value="female">여자</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="이메일을 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="전화번호"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                        placeholder="전화번호를 입력해주세요"
                    />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="주소"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder="주소를 입력해주세요"/>
                </Form.Item>
                <Form.Item
                    name="position"
                    label="직급"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your position!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder="직급을 입력해주세요"/>
                </Form.Item>
                <Form.Item
                    name="hire_date"
                    label="입사일"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your hire_date!',
                    //         whitespace: true,
                    //     },
                    // ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
        </DIV>
    );
};

export default Add_Employee;