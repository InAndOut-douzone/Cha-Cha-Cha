import React from 'react';
import { Layout } from 'antd';
import Header from '../components/_Header';
import Navigation from '../components/Navigation';
import Media from 'react-media';

export default function SiteLayout({ children }) {
    return (
        <Layout >
            <Header />
            <Layout>
                <Media query="(max-width: 600)" render={() =>
                (
                    <p>zxc</p>
                )}
                />
                <Navigation name="ok2"/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div>
                        {children}
                    </div>
                </Layout>
            </Layout>
        </Layout>
    );
}