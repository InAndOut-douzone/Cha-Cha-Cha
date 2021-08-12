import React from 'react';
import { Layout, Progress } from 'antd';

const Work = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            [근무 현황 화면]
            <br />
            <Progress
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={99.9}
            />
            <Progress
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
                percent={99.9}
                status="active"
            />
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={90}
            />
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={100}
            />
        </Layout>
    );
};

export default Work;