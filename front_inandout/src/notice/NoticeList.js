import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout,Breadcrumb, Table, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

const columns = [

    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        width:60,
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/notice/" + record.no}>{text}</Link>
            </Space>
        )
    },
    {
        title: '작성자',
        dataIndex: 'name',
        key: 'name',
        width:30
    },
    {
        title: '작성시간',
        dataIndex: 'date',
        key: 'date',
        width:30
    },
];

const header = { 
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const NoticeList = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/list",header).then((res)=>{
            setList(res.data);

            })
    },[])

    var moment=require('moment');

    const data = [];
    list.map( (li,index) => data.push({
        key: index+1,
        name: li.user.name,
        date:moment(li.regDate).format('YY년 MM월 DD일'),
        ...li
    }))

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
                <h2>
                    공지사항
                </h2>
                <Table style={{textAlign:"center"}} dataSource={data} columns={columns} />
            </Layout>
        </SiteLayout>
    );
}
export default NoticeList;