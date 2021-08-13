import React from 'react';
import { Layout, Progress, Breadcrumb } from 'antd';

const Work = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>홈</Breadcrumb.Item>
                <Breadcrumb.Item>내 근무</Breadcrumb.Item>
                <Breadcrumb.Item>근무 현황</Breadcrumb.Item>
            </Breadcrumb>
            <br />
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
            <Progress
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
            />
        </Layout>
    );
};

export default Work;