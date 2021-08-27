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
<<<<<<< HEAD:front_inandout/src/notice/NoticeList.js
        dataIndex: 'date',
        key: 'date',
        width:30
=======
        dataIndex: 'regDate',
        key: 'regDate',
        render: (record) => ( <div>{moment(record.regDate).format("yyyy-MM-DD")} </div>)
>>>>>>> 48242a4f9146b4aced06ca555b416a6864cbe30b:front_inandout/src/notice/Notice.js
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
<<<<<<< HEAD:front_inandout/src/notice/NoticeList.js
        name: li.user.name,
        date:moment(li.regDate).format('YY년 MM월 DD일'),
        ...li
=======
        regDate: moment(li.regDate).format("HH mm"),
        ...li,
>>>>>>> 48242a4f9146b4aced06ca555b416a6864cbe30b:front_inandout/src/notice/Notice.js
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
                <div style={{textAlign:"center"}}>
                    공지사항 화면입니다. <br/><br/><br/>
                </div>
                <Table style={{textAlign:"center"}} dataSource={data} columns={columns} />
            </Layout>
        </SiteLayout>
    );
}
export default NoticeList;