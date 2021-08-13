import React from 'react';
import { Layout, Descriptions, Badge, Breadcrumb } from 'antd';
import Header from '../components/_Header';
import Navigation from '../components/Navigation';
import Footer from '../components/_Footer'

const MyPage = () => {
    return (
        <Layout >
            <Header />
            <Layout>
                <Navigation />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>홈</Breadcrumb.Item>
                        <Breadcrumb.Item>내 정보</Breadcrumb.Item>
                        <Breadcrumb.Item>프로필 수정</Breadcrumb.Item>
                    </Breadcrumb>
                    <Descriptions title="사용자 정보" layout="vertical" bordered>
                        <Descriptions.Item label="이름">[이재성]</Descriptions.Item>
                        <Descriptions.Item label="직급">[의사]</Descriptions.Item>
                        <Descriptions.Item label="생년월일">[0000-00-00]</Descriptions.Item>
                        <Descriptions.Item label="이메일">[123@123.com]</Descriptions.Item>
                        <Descriptions.Item label="연락처" span={2}>
                            010-0000-0000
                        </Descriptions.Item>
                        <Descriptions.Item label="근무 상태" span={3}>
                            <Badge status="processing" text="근무 중" />
                        </Descriptions.Item>
                        <Descriptions.Item label="1">1</Descriptions.Item>
                        <Descriptions.Item label="2">2</Descriptions.Item>
                        <Descriptions.Item label="3">3</Descriptions.Item>
                        <Descriptions.Item label="4">
                            4
                        </Descriptions.Item>
                    </Descriptions>
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default MyPage;