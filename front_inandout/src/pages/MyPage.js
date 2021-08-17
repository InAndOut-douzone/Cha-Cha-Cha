import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Descriptions, Badge, Breadcrumb, Input,Form,Button } from 'antd';


const MyPage = () => {

    const [user,setUser] = useState({});

    const data = axios.get("http://localhost:8080/api/user/1").then((res)=>{
        console.log(123,res);
        console.log(12344,res.data.name);
        setUser(res.data);
    });

    // useEffect 써서 처음 한번만 실행되게 하기
    
    console.log(data.data);
    

 

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>홈</Breadcrumb.Item>
                <Breadcrumb.Item>내 정보</Breadcrumb.Item>
                <Breadcrumb.Item>프로필 수정</Breadcrumb.Item>
            </Breadcrumb>
            <Form style={{width:'90%'}}>
            <Descriptions title="사용자 정보" layout="vertical" bordered>
                <Descriptions.Item label="이름">{user.name}</Descriptions.Item>
                <Descriptions.Item label="직급">{user.position}</Descriptions.Item>
                <Descriptions.Item label="생년월일">바꿀 수 없음</Descriptions.Item>
                
                <Descriptions.Item label="이메일">
                    <Form.Item name="email" 
                        rules={[{type:'email', message:'이메일형식을 맞게 입력하세요.'}]}>
                        <Input style={{width:'350px'}}/>
                    </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="연락처" span={2}>
                    <Form.Item rules={[{ required:true, message:'연락처를 입력하세요.'}]}>
                        <Input />
                    </Form.Item>
                </Descriptions.Item>
                
                <Descriptions.Item label="근무 상태" span={3}>
                    <Badge status="processing" text="근무 중" />
                </Descriptions.Item>
            </Descriptions>
            <br/>
            <Form.Item>
                <Button  type='Primary' htmlType="submit">수정</Button>
            </Form.Item>
            </Form>
        </Layout>
    );
};

export default MyPage;