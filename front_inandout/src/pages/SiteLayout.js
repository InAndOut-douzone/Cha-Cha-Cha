/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Layout } from 'antd';
import Header from '../components/_Header';
import Navigation from '../components/Navigation';
import Navigation_Mobile from '../components/Navigation_Mobile';
import Media from 'react-media';

export default function SiteLayout({ children }) {
    return (
        <Layout >
            <Header />
            <Layout>
                <Media query="(max-width: 600px)" render={() =>
                (
                    <Navigation_Mobile />
                )}
                />
                <Navigation name="ok2" />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div>
                        {children}
                    </div>
                </Layout>
            </Layout>
        </Layout>
    );
}