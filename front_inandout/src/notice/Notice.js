import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout,Breadcrumb, Table } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: '번호',
        dataIndex: 'no',
        key: 'no'    
    },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '내용',
        dataIndex: 'contents',
        key: 'contents',
    },
    {
        title: '작성시간',
        dataIndex: 'regDate',
        key: 'regDate',
    },
];

const header = { 
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const Notice = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/list",header).then((res)=>{
            setList(res.data);
            console.log(res);
            })
    },[])


    const data = [];
    list.map( (li,index) => data.push({
        key: index+1,
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
                <div style={{textAlign:"center"}}>
                    공지사항 화면입니다. <br/><br/><br/>
                </div>
                <Table style={{textAlign:"center"}} dataSource={data} columns={columns} />
            </Layout>
        </SiteLayout>
    );
}
export default Notice;