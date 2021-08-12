import React from 'react';
import { Layout, Descriptions, Badge } from 'antd';

const MyPage = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            [프로필 수정 화면]
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
    );
};

export default MyPage;