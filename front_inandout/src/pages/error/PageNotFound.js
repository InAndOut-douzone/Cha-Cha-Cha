import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

const PageNotFound = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Empty />
            페이지를 찾을 수 없습니다.
            <Link to="/">돌아가기</Link>
        </div>
    );
};

export default PageNotFound;