import React, { useState } from 'react';
import axios from 'axios';
import SiteLayout from './SiteLayout';
import styled from 'styled-components'
import { Layout, Breadcrumb, Descriptions, Input, Button, Form } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';

const Container = styled.div`
    width: 800px;
    height: 80%;
    `;
const header = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
};

const Add_Notice = () => {

    const [title, setTitle] = useState({});
    const [contents, setContents] = useState({});

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
        axios.post("http://localhost:8080/api/notice/add", notice, header).then((res) => {
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
                <br />
                <Container>
                    <Form onFinish={add} >
                        <Descriptions title="공지사항 등록" column={1} bordered size='small'>
                            <Descriptions.Item label="제목">
                                <FormItem>
                                    <Input name='title' onChange={titleHandler} style={{ width: '100%' }} />
                                </FormItem>
                            </Descriptions.Item>
                            <Descriptions.Item label="내용">
                                <FormItem>
                                    <Input.TextArea name='contents' onChange={contentsHandler} style={{ height: '400px' }} />
                                </FormItem>
                            </Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type='primary' htmlType='submit' >등록</Button>
                    </Form>
                </Container>
            </Layout>
        </SiteLayout>
    );
}
export default Add_Notice;