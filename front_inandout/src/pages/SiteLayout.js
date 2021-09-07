/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Layout } from 'antd';
import Header from '../components/_Header';
import Header_Mobile from '../mobile/_Header_Mobile';
import Navigation from '../components/Navigation';
// import Navigation2 from '../components/Navigation2';
// import Navigation_Mobile from '../mobile/Navigation_Mobile';
import Media from 'react-media';

export default function SiteLayout({ children }) {
    return (
        <>
            <Media query="(max-width: 600px)" render={() =>
            (
                <Layout >
                    <Header_Mobile />
                    <Layout>
                        {/* <Navigation_Mobile /> */}
                        <div>
                            {children}
                        </div>
                    </Layout>
                </Layout>
            )}
            />

            {/* <Media query="(min-width: 601px) and (max-width: 960px)" render={() =>
            (
                <Layout >
                    <Header />
                    <Layout>
                        <Navigation2 name="ok2" />
                            <div>
                                {children}
                            </div>
                    </Layout>
                </Layout>
            )}
            /> */}

            {/* <Media query="(min-width: 961px) and (max-width: 1300px)" render={() =>
            (
                <Layout >
                    <Header />
                    <Layout>
                        <Navigation2 name="ok2" />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <div>
                                {children}
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
            )}
            /> */}

            <Media query="(min-width: 601px )" render={() =>
            (
                <Layout >
                    <Header />
                    <Layout>
                        <Navigation name="ok2" />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <div>
                                {children}
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
            )}
            />
        </>
    );
}