import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import { Layout,Breadcrumb, Descriptions, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    padding: 30px;
    width: 800px;
    height: 80%;
    `;

const Cell = styled.div`
    padding: 5px;
    text-Align: left;
    width: 420px;
    `;
const header = { 
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const Notice = (props) => {

    const { no } = props.match.params;
    const [user,setUser] = useState();
    const [notice,setNotice]=useState({});
    var moment = require('moment');
    const date = moment(notice.regDate).format('YY년 MM월 DD일');
    const [prev,setPrev] = useState({
        no: null,
        title: null
    });
    const [next,setNext] = useState({
        no: null,
        title: null
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/"+no, header).then((res)=>{
            setNotice(res.data);
            
            })

        axios.get("http://localhost:8080/api/notice/prev/"+no, header).then((res)=>{   
            setPrev(res.data[0]);
            setNext(res.data[1]);
            console.log(next.no);
            })

        setUser(localStorage.getItem('username'));
    },[no])

    const nextReturn = () => {
        return (
            <Cell><Link to={"/notice/" + next.no}>{next.title}</Link></Cell>
        );
        console.log(next.no);
    }
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
                <Descriptions title="" bordered style={{padding:'20px 0 20px 0'}}>
                    <Descriptions.Item label="제목" span={4} style={{width:'100px', textAlign:'center'}}>
                        <Cell>{notice.title}</Cell>
                    </Descriptions.Item>
                    <Descriptions.Item label="날짜" span={2} style={{textAlign:'center'}}>
                        <Cell>{date}</Cell>
                    </Descriptions.Item>
                    <Descriptions.Item label="작성자" span={2} style={{width:'100px',textAlign:'center'}}>
                        <Cell>{notice.user && notice.user.name}</Cell>
                    </Descriptions.Item>
                </Descriptions>
                <br />
                <Container>
                    {notice.contents && notice.contents.split("\n").map((line) => {
                        return (<span>{line}<br /></span>);
                    })}
                </Container>
                <br /><br /><br />
                <Descriptions title="" bordered>
                    <Descriptions.Item label="이전 글" span={4} style={{width:'120px',textAlign:'center'}}>
                        <Cell><Link to={"/notice/" + prev.no}>{prev.title}</Link></Cell>
                    </Descriptions.Item>
                    <Descriptions.Item label="다음 글" span={4} style={{width:'120px',textAlign:'center'}}>
                        {next.no === null ? "" : <Cell><Link to={"/notice/" + next.no}>{next.title}</Link></Cell>}
                    </Descriptions.Item>
                </Descriptions>
                <br /><br />
                <div style={{textAlign:'center', display:'inline-block', width:'100%'}}>
                    <Button type='default' style={{width:'60px'}}><Link to={"/notice/"}>목록</Link></Button>
                    <div style={{position:'absolute',right:'60px'}}>
                        <Button type='default' style={{width:'60px'}}><Link to={"/notice/modi/" + notice.no}>수정</Link></Button>
                        <Button type='default' style={{width:'60px'}}><Link to={"/notice/del/" + notice.no}>삭제</Link></Button>
                    </div>
                </div>
            </Layout>
        </SiteLayout>
    );
}
export default Notice;