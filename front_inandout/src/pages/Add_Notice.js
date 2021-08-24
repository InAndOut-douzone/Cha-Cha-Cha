import React from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';
import {InputGroup, FormControl} from 'react-bootstrap';

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
        <SiteLayout>
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
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
                <Form.Item
                    name={['notice', 'title']}
                    label="제목"
                // rules={[
                //     {
                //         required: true,
                //     },
                // ]}
                >
                    <Input placeholder="제목" />
                </Form.Item>
                <Form.Item name={['notice', 'content']} label="내용" >
                    <Input.TextArea placeholder="내용" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
            </Form>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
        </Layout>
        </SiteLayout>
    );
};

export default Add_Employee;