import React, { useState, useRef } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, CloseOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';
import SiteLayout from '../SiteLayout';

const { Option } = Select;

const Add_Employee = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (usernameCheckState === false) {
            alert("사원번호가 중복되었습니다. ")
            return;
        } else {
            // console.log(values.birthday);
            // console.log(values.birthday.format('YYYY MM DD'));
            // console.log(values.birthday.toDate());

            axios.post("http://localhost:8080/api/user/add", values, header).then(res => {
                alert(res.data.name + " 사원 등록이 완료되었습니다. (사원번호 : " + res.data.username + ")");
                setUsernameCheckState(false);
                formRef.current.setFieldsValue({
                    name: "",
                    username: "",
                    birth: "",
                    gender: "",
                    email: "",
                    roles: "",
                    position: "",
                    hireDate: "",
                    address: "",
                    phone: ""
                });
            }).catch(err => {
                console.log(err);
                alert("사원 등록에 실패하였습니다.")
            });
        }
    };

    const [username, setUsername] = useState();
    const [usernameCheckState, setUsernameCheckState] = useState(false);
    const inputRef = useRef(null);
    const formRef = useRef(null);

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    const usernameCheck = async (event) => {
        setUsername(event.target.value);
        if (event.target.value === "") {
            setUsernameCheckState(false);
            inputRef.current.focus();
        }
        await axios.get("http://localhost:8080/api/user/usernameCheck/" + event.target.value, header).then(res => {
            if (res.data === "") {
                setUsernameCheckState(true);
                inputRef.current.focus();
            } else {
                setUsernameCheckState(false);
                inputRef.current.focus();
            }
        }).catch(err => {
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
                <Option value="82">+82</Option>
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
        label {
            width: 100px;
        }
    `
    return (
        <SiteLayout>
            <DIV>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <br />
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                        <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ borderTop: "1px solid #eee" }} />
                    <br /><br />
                    <div style={{ textAlign: "center" }}>
                        사원을 등록할 수 있는 화면입니다. 사원 번호는 임의로 줄 수 있고, 중복은 허용되지 않습니다. <br/> ( *사원번호는 입력 시 중복을 확인합니다.) <br /><br /><br />
                    </div>
                    <Form
                        style={{ width: "350px", alignSelf: "center" }}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        ref={formRef}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '82',
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
                            <Input placeholder="이름을 입력해주세요" />
                        </Form.Item>
                        <div style={{ display: "flex", alignItems: "baseline" }}>
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
                                <Input ref={inputRef} value={username} defaultValue={username} onChange={usernameCheck} style={{ display: "flex" }} placeholder="사원번호를 입력해주세요" />
                            </Form.Item>
                            {
                                usernameCheckState ?
                                    <CheckCircleTwoTone style={{ marginLeft: "10px" }} twoToneColor="#52c41a" /> :
                                    <CloseOutlined style={{ marginLeft: "10px", color: "red" }} />
                            }
                        </div>
                        <Form.Item
                            name="birth"
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
                            <Input placeholder="이메일을 입력해주세요" />
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
                            <Input placeholder="주소를 입력해주세요" />
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
                            <Select placeholder="직급을 선택해주세요">
                                <Option value="간호사">간호사</Option>
                                <Option value="의사">의사</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="roles"
                            label="권한"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your role!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Select placeholder="권한을 선택해주세요">
                                <Option value="ROLE_USER">일반</Option>
                                <Option value="ROLE_ADMIN">관리자</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="hireDate"
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
        </SiteLayout>
    );
};

export default Add_Employee;