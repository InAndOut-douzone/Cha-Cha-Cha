import React from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Option } = Select;

const Add_Employee = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('값 : ', values);
    };

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

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                style={{ width: "500px", alignSelf: "center" }}
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
                    <Input placeholder="사원번호를 입력해주세요"/>
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
    );
};

export default Add_Employee;