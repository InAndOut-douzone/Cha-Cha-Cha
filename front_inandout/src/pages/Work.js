import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Progress, Breadcrumb, Table,DatePicker,Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const {RangePicker} = DatePicker
const header = { 
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization")
    }
  };

const columns = [
    {
        title: '근무일',
        dataIndex: 'strDate',
        key: 'strDate',
    },
    {
        title: '근무상태',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '출근시간',
        dataIndex: 'strOn',
        key: 'strOn',
    },
    {
        title: '퇴근시간',
        dataIndex: 'strOff',
        key: 'strOff',
    }
];

const Work = () => {

    const [onoff, setOnoff] = useState([]);

    useEffect(() => { // user정보 get, useEffect를 사용하여 한번만 get 하도록 설정
        axios.get("/api/work",header).then((res)=>{
            setOnoff(res.data);
        });
    },[]);

    const dateHandler = (value,dateString) => {

        let data = {
            onTime :dateString[0],
            offTime : dateString[1]
        }

        axios.post("/api/workdate",data,header).then((res)=>{
            console.log(res.data);
            setOnoff(res.data);
        });
    }
    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>내 근무</Breadcrumb.Item>
                    <Breadcrumb.Item>근무 현황</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />

                <h1>21년 8월 23일 ~ 21년 8월 29일</h1>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={99.9}
                />
                <Progress
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    percent={99.9}
                    status="active"
                />
                <br />
                <Space direction="vertical" size={12}>
                    <RangePicker onChange={dateHandler}/>
                </Space>
                <br />
                <Table dataSource={onoff} columns={columns} />
            </Layout>
            </SiteLayout>
    );
};

export default Work;