import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SiteLayout from '../pages/SiteLayout';
import styled from 'styled-components'
import { Layout, Breadcrumb, Descriptions, Button, Form } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';

const Container = styled.div`
    width: 900px;
    height: 80%;
    padding: 30px 10px 10px 100px;
    `;
const header = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const NoticeModify = (props) => {

    const { no } = props.match.params;
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();
    const [noti, setNoti] = useState();

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/"+no, header).then((res)=>{
            setNoti(res.data);
            setTitle(res.data.title);
            setContents(res.data.contents);

            })
    },[])

    const titleHandler = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const contentsHandler = (e) => {
        e.preventDefault();
        setContents(e.target.value);
    }

    const update = (e) => {

        let notice = {
            title: title,
            contents: contents,
            regDate: noti.regDate
        }
        
        axios.post("http://localhost:8080/api/notice/update/"+no, notice, header).then((res) => {
            
        });
        window.location.href="/notice/"+no;
    }
    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항</Breadcrumb.Item>
                    <Breadcrumb.Item>공지사항 수정</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />

                <Container>
                    <Form onFinish={update} style={{textAlign:'center'}}>
                        <Descriptions title="공지사항 수정" column={1} bordered size='small' style={{textAlign:'left'}}>
                            <Descriptions.Item label="제목" style={{textAlign:'center'}}>
                                <FormItem style={{margin:'0'}}>
                                    <input name='title' onChange={titleHandler}
                                    style={{ width: '100%' }} defaultValue={title} />
                                </FormItem>
                            </Descriptions.Item>
                            <Descriptions.Item label="내용" style={{textAlign:'center'}}>
                                <FormItem style={{margin:'0'}}>
                                    <textarea name='contents' onChange={contentsHandler}
                                    style={{ height: '400px',width:'100%'}} defaultValue={contents}/>
                                </FormItem>
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type='default' htmlType='submit' >수정</Button>
                    </Form>
                </Container>
            </Layout>
        </SiteLayout>
    );
}
export default NoticeModify;