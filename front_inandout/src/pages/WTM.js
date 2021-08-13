import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const WTM = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>홈</Breadcrumb.Item>
                <Breadcrumb.Item>병원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>근무시간 관리</Breadcrumb.Item>
            </Breadcrumb>
            [근무시간 관리 화면]
        </Layout>
    );
};

export default WTM;