import React from 'react';
import SiteLayout from './SiteLayout';
import styled from 'styled-components'
import { Layout,Breadcrumb, Descriptions, Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 800px;
    height: 80%;
    `;

const Add_Notice = () => {

    return (
        <SiteLayout>
            <Layout style={{padding: '0 24px 24px'}}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>사원 등록</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br />
                <Container>
                <form action='' method='post'>
                    <Descriptions title="공지사항 등록" column={1} bordered size='small'>
                        <Descriptions.Item label="제목">
                            <Input name='title' style={{width:'100%'}} />
                        </Descriptions.Item>
                        <Descriptions.Item label="내용">
                            <Input.TextArea name='contents' style={{height:'400px'}} />
                        </Descriptions.Item>
                    </Descriptions>
                    <br/>
                    <Button type='primary' htmlType='submit'>등록</Button>
                </form>
                </Container>
            </Layout>
        </SiteLayout>
    );
}
export default Add_Notice;