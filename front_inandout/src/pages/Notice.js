import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout,Breadcrumb, } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const header = { 
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const Notice = (props) => {

    const { no } = props.match.params;
    const [notice,setNotice]=useState({});
    var moment = require('moment');
    const date = moment(notice.regDate).format('YY년 MM월 DD일');

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/"+no, header).then((res)=>{
            setNotice(res.data);
            console.log(res.data);
            })
    },[])

    return (
        <SiteLayout>
            <Layout style={{padding: '0 24px 24px'}}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }}/>
                <br /><br />
                <div style={{width:'80%'}}>
                    <h3>{notice.title}</h3>
                    <div style={{display:'inline'}}>
                        <p>{date}</p>
                        <p style={{textAlign:'right'}}>작성자 : {notice.user && notice.user.name}</p>
                    </div>
                    <h4>
                        {notice.contents && notice.contents.split("\n").map((line) => {
                            return (<span>{line}<br /></span>);
                            })}
                    </h4>
                </div>
            </Layout>
        </SiteLayout>
    );
}
export default Notice;