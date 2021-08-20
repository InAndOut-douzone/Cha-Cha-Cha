import React from 'react';
import { Layout, Progress, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const dataSource = [
    {
        key: '1',
        wd: '0000-00-00',
        workstate: '총 근무8시간',
        remark: '',
    },
    {
        key: '2',
        wd: '0000-00-00',
        workstate: '휴가',
        remark: '휴가',
    },
];

const columns = [
    {
        title: '근무일',
        dataIndex: 'wd',
        key: 'wd',
    },
    {
        title: '근무상태',
        dataIndex: 'workstate',
        key: 'workstate',
    },
    {
        title: '비고',
        dataIndex: 'remark',
        key: 'remark',
    },
];

const Work = () => {
    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>내 근무</Breadcrumb.Item>
                    <Breadcrumb.Item>근무 현황</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={99.9}
                />
                <Progress
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    percent={99.9}
                    status="active"
                />
                {/* <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={90}
                />
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={100}
                /> */}
                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </SiteLayout>
    );
};

export default Work;