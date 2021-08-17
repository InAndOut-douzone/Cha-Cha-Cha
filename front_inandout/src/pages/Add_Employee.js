import React from 'react';
import { Layout, Descriptions, Badge, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Add_Employee = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
            </Breadcrumb>
            <Descriptions title="사원 등록" bordered>
                <Descriptions.Item label="이름">[데이터]</Descriptions.Item>
                <Descriptions.Item label="생년월일">[데이터]</Descriptions.Item>
                <Descriptions.Item label="성별">[데이터]</Descriptions.Item>
                <Descriptions.Item label="연락처">[데이터]</Descriptions.Item>
                <Descriptions.Item label="이메일" span={2}>[데이터]</Descriptions.Item>
                <Descriptions.Item label="주소" span={3}>[데이터]</Descriptions.Item>
                <Descriptions.Item label="직급">[데이터]</Descriptions.Item>
                <Descriptions.Item label="입사일">[데이터]</Descriptions.Item>
                <Descriptions.Item label="퇴사일">[데이터]</Descriptions.Item>
            </Descriptions>
        </Layout>
    );
};

export default Add_Employee;