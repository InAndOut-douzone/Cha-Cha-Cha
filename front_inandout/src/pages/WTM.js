import React from 'react';
import { Layout, Breadcrumb, Form, Table, TimePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const dataSource = [
    {
        key: '1',
        no: 1,
        name: 'Mike',
        rank: '간호사',
        birthday: '0000-00-00',
        hire_date: '0000-00-00',
        details: '자세히',
    },
    {
        key: '2',
        no: 2,
        name: 'Jone',
        rank: '간호사',
        birthday: '0000-00-00',
        hire_date: '0000-00-00',
        details: '자세히',
    },
];

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
    },
    {
        title: 'Hire_date',
        dataIndex: 'hire_date',
        key: 'hire_date',
    },
    {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        render: ({ details }) => (<Link to={'/employeedetails'}>자세히</Link>),
    },
];

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
                <strong>현재 근무시간</strong>
                하루 근무 시간은 8 시간 입니다.<br /><br />
                주간 근무 시간은 40시간 입니다. 초과 근무 시간은 최대 12시간이고, 주 52시간제를 적용하고 있습니다.
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
                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </SiteLayout>
    );
};

export default WTM;