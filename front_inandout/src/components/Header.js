import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            헤더입니다.
            
            <Link to="/">홈</Link>
            <Link to="/login">로그인</Link>
            <Link to="/mypage">내정보</Link>

        </div>
    );
};

export default Header;