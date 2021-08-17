import React from 'react';
import { Layout, Descriptions, Table, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        date: '0000-00-00',
        on_time: '0000-00-00 00:00:00',
        off_time: '0000-00-00 00:00:00',
        state: '연차',
    },
    {
        key: '2',
        date: '0000-00-00',
        on_time: '0000-00-00 00:00:00',
        off_time: '0000-00-00 00:00:00',
        state: '반차',
    },
];

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'On_time',
        dataIndex: 'on_time',
        key: 'on_time',
    },
    {
        title: 'Off_time',
        dataIndex: 'off_time',
        key: 'off_time',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
];

const Employee_Details = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>자세히</Breadcrumb.Item>
            </Breadcrumb>
            <Descriptions title="[사원 이름]" bordered>
                <Descriptions.Item label="이름">[데이터]</Descriptions.Item>
                <Descriptions.Item label="생년월일">[데이터]</Descriptions.Item>
                <Descriptions.Item label="성별">[데이터]</Descriptions.Item>
                <Descriptions.Item label="연락처">[데이터]</Descriptions.Item>
                <Descriptions.Item label="이메일" span={2}>[데이터]</Descriptions.Item>
                <Descriptions.Item label="주소" span={3}>[데이터]</Descriptions.Item>
                <Descriptions.Item label="직급">[데이터]</Descriptions.Item>
                <Descriptions.Item label="입사일">[데이터]</Descriptions.Item>
                <Descriptions.Item label="퇴사일">[데이터]</Descriptions.Item>
                <Descriptions.Item label="월차갯수">[데이터]</Descriptions.Item>
                <Descriptions.Item label="연차갯수">[데이터]</Descriptions.Item>
                <Descriptions.Item label="반차갯수">[데이터]</Descriptions.Item>
            </Descriptions>
            <br />
            [근무 현황]
            <Table dataSource={dataSource} columns={columns} /> 
        </Layout>
    );
};

export default Employee_Details;