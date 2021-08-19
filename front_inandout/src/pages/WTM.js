import React from 'react';
import { Layout, Breadcrumb, Form, DatePicker, TimePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

const WTM = () => {
    const onFinish = (value) => {
       console.log("value:" + value);
      };
    return (
        <SiteLayout>
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>병원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>근무시간 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }} />
            <br /><br />
            <strong>근무시간 등록</strong>
            <Form name="time_related_controls" onFinish={onFinish}>
                <Form.Item id="f" name="time-picker" label="TimePicker" {...config}>
                    <TimePicker />
                </Form.Item>
                <Form.Item name="time-picker2" label="TimePicker" {...config}>
                    <TimePicker />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
         </Layout>
         </SiteLayout>
    );
};

export default WTM;