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

const Add_Notice = (props) => {

    const { no } = props.match.params;
    const [notice,setNotice]=useState({});
    const [title, setTitle] = useState({});
    const [contents, setContents] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/api/notice/"+no, header).then((res)=>{
            console.log(res.data);
            setNotice(res.data);
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

    const add = (e) => {
    
        let notice = {
            title: title,
            contents: contents
        }
        console.log(notice);
        axios.post("http://localhost:8080/api/notice/update", notice, header).then((res) => {
            console.log(res);
        });
        window.location.reload("/")
    }
    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />

                <Container>
                    <Form onFinish={add} style={{textAlign:'center'}}>
                        <Descriptions title="공지사항 등록" column={1} bordered size='small' style={{textAlign:'left'}}>
                            <Descriptions.Item label="제목" style={{textAlign:'center'}}>
                                <FormItem>
                                    <input name='title' onChange={titleHandler} style={{ width: '100%' }} defaultValue={notice.title} />
                                </FormItem>
                            </Descriptions.Item>
                            <Descriptions.Item label="내용" style={{textAlign:'center'}}>
                                <FormItem>
                                    <textarea name='contents' onChange={contentsHandler} style={{ height: '400px' }} defaultValue={notice.contents}/>
                                </FormItem>
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type='default' htmlType='submit' >등록</Button>
                    </Form>
                </Container>
            </Layout>
        </SiteLayout>
    );
}
export default Add_Notice;