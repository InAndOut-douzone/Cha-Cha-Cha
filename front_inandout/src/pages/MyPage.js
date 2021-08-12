import React from 'react';
import Header from '../components/_Header';
import Navigation from '../components/Navigation';
import Footer from '../components/_Footer'
import Layout from 'antd/lib/layout/layout';

const MyPage = () => {
    return (
        <Layout>
            <Header />
                <Layout>
                <Navigation />
                    <div>
                        [프로필 수정 화면]
                    </div>
                </Layout>
            <Footer />
        </Layout>
        
    );
};

export default MyPage;