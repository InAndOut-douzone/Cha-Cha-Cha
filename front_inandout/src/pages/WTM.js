import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const WTM = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>병원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>근무시간 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }}/>
            <br /><br />
            [근무시간 관리 화면]
        </Layout>
    );
};

export default WTM;