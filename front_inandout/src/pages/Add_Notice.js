import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Add_Notice = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>공지사항 관리</Breadcrumb.Item>
                <Breadcrumb.Item>공지사항 등록</Breadcrumb.Item>
            </Breadcrumb>
            [공지사항 등록 화면]
        </Layout>
    );
};

export default Add_Notice;