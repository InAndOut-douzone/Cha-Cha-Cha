import React from 'react';
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const layout = {
    labelCol: {
        span: 1,
    },
    wrapperCol: {
        span: 22,
    },
};

// const validateMessages = {
//     required: '${label} is required!',
//     types: {
//         email: '${label} is not a valid email!',
//         number: '${label} is not a valid number!',
//     },
//     number: {
//         range: '${label} must be between ${min} and ${max}',
//     },
// };

const Add_Notice = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>공지사항 관리</Breadcrumb.Item>
                <Breadcrumb.Item>공지사항 등록</Breadcrumb.Item>
            </Breadcrumb>
            [공지사항 등록 화면]
            <br /><br />

            {/* <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}> */}
            <Form {...layout} name="nest-messages" onFinish={onFinish} >
                <Form.Item
                    name={['notice', 'title']}
                    label="제목"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="제목"/>
                </Form.Item>
                <Form.Item name={['notice', 'content']} label="내용" >
                    <Input.TextArea placeholder="내용"/>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default Add_Notice;