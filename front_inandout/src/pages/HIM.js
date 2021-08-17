import React from 'react';
import { Descriptions, Layout, Breadcrumb } from 'antd';
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
            <Descriptions
                title="의원 정보 관리"
                bordered
                column={{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
                <Descriptions.Item label="의원 번호">[데이터]</Descriptions.Item>
                <Descriptions.Item label="의원명">[데이터]</Descriptions.Item>
                <Descriptions.Item label="의원 로고">[데이터]</Descriptions.Item>
                <Descriptions.Item label="의원 연락처">[데이터]</Descriptions.Item>
                <Descriptions.Item label="의원 주소">[데이터]</Descriptions.Item>
                <Descriptions.Item label="대표자명">[데이터]</Descriptions.Item>
            </Descriptions>
        </Layout>
    );
};

export default HIM;