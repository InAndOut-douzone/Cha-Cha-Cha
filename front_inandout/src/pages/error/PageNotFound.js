import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import SiteLayout from '../SiteLayout';

const PageNotFound = () => {
    return (
        <SiteLayout>
            <div style={{textAlign: 'center'}}>
                <Empty />
                페이지를 찾을 수 없습니다.
                <Link to="/">돌아가기</Link>
            </div>
        </SiteLayout>
    );
};

export default PageNotFound;