import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const HIM = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>의원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>의원 정보 관리</Breadcrumb.Item>
            </Breadcrumb>
            [의원 정보 관리 화면]
        </Layout>
    );
};

export default HIM;