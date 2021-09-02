import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout,Breadcrumb, Table, Space } from 'antd';
import { AlignCenterOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const columns = [
    {
        title: '번호',
        dataIndex: 'no',
        key: 'no',
        width: '10%'
    },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        width:'40%',
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
        width:'25%'
    },
    {
        title: '작성시간',
        dataIndex: 'date',
        key: 'date',
        width:'25%'
    },
];

const header = { 
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const NoticeListLayout = styled.div `

.ant-pagination { margin-right:120px}
`

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
                <div style={{textAlign:"center"}}>
                    공지사항 화면입니다. <br/><br/><br/>
                </div>
                <NoticeListLayout>
                <Table style={{textAlign:"center"}} dataSource={data} columns={columns}
                pagination={{hideOnSinglePage:true, position:['bottomCenter']}} />
                </NoticeListLayout>
            </Layout>
        </SiteLayout>
    );
}
export default NoticeList;