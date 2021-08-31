import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Progress, Breadcrumb, Table, DatePicker, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from './SiteLayout';

const { RangePicker } = DatePicker
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
    const [data,setData] = useState([]);
    // const [mon,setMon] = useState({});
    // const [sun,setSun] = useState({});
    // const [workTime,setWorkTime] = useState({});
    // const [workPercent,setWorkPercent] = useState({});
    // const [userName,setUserName] = useState({});

    useEffect(() => { // user정보 get, useEffect를 사용하여 한번만 get 하도록 설정

        axios.get("/api/wokrpercent", header).then((res) => {
            console.log(res.data);
            setData(res.data);
            // setMon(res.data[0]);
            // setSun(res.data[1]);
            // setWorkTime(res.data[2]);
            // setWorkPercent(res.data[3]);
            // setUserName(res.data[4]);
        });

        axios.get("/api/work", header).then((res) => {
            setOnoff(res.data);
        });

    }, []);

    const dateHandler = (value, dateString) => {

        let data = {
            onTime: dateString[0],
            offTime: dateString[1]
        }

        axios.post("/api/workdate", data, header).then((res) => {
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

                <div>
                    <h1 style={{textAlign:'center'}}>{data[0]}{" 월요일 ~ "}{data[1]}{" 일요일"}</h1>
                    <br/><br/>
                    <p>{data[4]}{"님은 이번주 "}{data[2]}{"시간 일했습니다."}</p>
                    <p>{52-data[2]}{" 시간 더 일할 수 있습니다."}</p>
                </div>

                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={data[3]}/>
                <br />
                <Space direction="vertical" size={12}>
                    <RangePicker onChange={dateHandler} />
                </Space>
                <br />
                <Table dataSource={onoff} columns={columns} />
            </Layout>
        </SiteLayout>
    );
};

export default Work;