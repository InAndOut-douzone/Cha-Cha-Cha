import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Header from '../components/_Header';
import Navigation from '../components/Navigation';
import Footer from '../components/_Footer'

const Add_Notice = () => {
    return (
        <Layout >
            <Header />
            <Layout>
                <Navigation />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>홈</Breadcrumb.Item>
                        <Breadcrumb.Item>공지사항 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>공지사항 등록</Breadcrumb.Item>
                    </Breadcrumb>
                    [공지사항 등록 화면]
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default Add_Notice;