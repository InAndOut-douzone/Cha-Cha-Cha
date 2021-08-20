import React from 'react';
import { Layout, Breadcrumb, Table } from 'antd';
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

const Employee_Management = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }}/>
            <br /><br />
            <Table dataSource={dataSource} columns={columns} />
        </Layout>
    );
};

export default Employee_Management;