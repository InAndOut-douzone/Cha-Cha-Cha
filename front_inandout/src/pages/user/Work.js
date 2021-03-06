import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Progress, Breadcrumb, Table, DatePicker, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import SiteLayout from '../SiteLayout';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { Chart } from "react-google-charts";

const { RangePicker } = DatePicker
const header = {
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("Authorization")
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

const Pagi = styled.div`
    .ant-pagination { margin-right:100px}
`;
const Work = () => {

    const [onoff, setOnoff] = useState([]);
    const [data,setData] = useState([]);
    const [user,setUser] = useState([]);
    const [nurse,setNurse] = useState([]);

    // const [mon,setMon] = useState({});
    // const [sun,setSun] = useState({});
    // const [workTime,setWorkTime] = useState({});
    // const [workPercent,setWorkPercent] = useState({});
    // const [userName,setUserName] = useState({});

    useEffect(() => { // user정보 get, useEffect를 사용하여 한번만 get 하도록 설정

        axios.get("/api/wokrpercent", header).then((res) => {
            setData(res.data);
            console.log(res.data)
        });

        axios.get("/api/work", header).then((res) => {
            setOnoff(res.data);
            console.log(res.data)
        });

        // 현재 로그인한 사람 데이터 가져오기
        axios.get("/api/user", header).then((res) => {
            setUser(res.data);
        });

        getNurse();

    }, []);

    const data2 = [];
    onoff.map((onoff,index) => data2.push({
        ...onoff,
        key: index
    }))

    // 간호사 목록 가져오기
    const getNurse = async () => {
        await axios.get("/api/user/nurse", header).then((res) => {
            setNurse(res.data);
        });
    }

    let nurses = [
        ["Task", "Hours per Day"],
    ]

    nurse.map((nurse) => nurses.push([
        nurse.name,nurse.aleave+nurse.mleave
    ]));

    const dateHandler = (value, dateString) => {

        let data = {
            onTime: dateString[0],
            offTime: dateString[1]
        }

        axios.post("/api/workdate", data, header).then((res) => {
            setOnoff(res.data);
        });
    }

    const week = () => {
        if(data[2]>52){
            return(<p>이번주 근무시간을 초과했습니다.</p>)
        } else {
            return(<p>{"법정 근로시간 "}{52-data[2]}{" 시간 남았습니다."}</p>)    
        }
    }

    // const a = 16;
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
                <Fade bottom>
                <div>
                    <h1 style={{textAlign:'center'}}>{data[0]}{" 월요일 ~ "}{data[1]}{" 일요일"}</h1>
                    <br/><br/>
                    <p>{data[4]}{"님은 이번주에 "}{data[2]}{"시간 일했습니다."}</p>
                    {week()}
                </div>
                <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={data[3]}/>
                <br />

                <div className="chart" style={{display:"flex", alignSelf:"center"}}>
                    {sessionStorage.getItem("userRole") === 'ROLE_ADMIN' ? 
                        null : 
                        <Chart
                        width={"300px"}
                        height={"300px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                        ["Task", "Hours per Day"],
                        ["사용 연차", user.mleave === 0 ? 1 : 15-user.aleave+user.mleave],
                        ["남은 연차", user.aleave+user.mleave],
                        
                        ]}
                        options={{
                            // pieStartAngle: 30, // 엥글 각도 바꾸기
                            // tooltip: { trigger: 'none' },   // 툴팁 안보이게 하기
                            pieSliceText: 'label',  // 퍼센트 말고 타이틀로 적히기
                            title: "나의 연차 현황",
                            backgroundColor: "transparent",
                            legend: "none",
                            pieHole: 0.3,
                            colors: ["#f7d794", "#f3a683", "#778beb", "#e77f67", "#cf6a87"],    
                        }}
                    />
}
                    

                <Chart
                        width={"300px"}
                        height={"300px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={nurses}
                        options={{
                            pieSliceText: 'label',  // 퍼센트 말고 타이틀로 적히기
                            title: "간호사 미사용 연차 현황",
                            backgroundColor: "transparent",
                            legend: "none",
                            pieHole: 0.3,
                            colors: ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87","red","blue","gold","silver"]
                        }}
                    />

                    <Chart
                        width={"300px"}
                        height={"300px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                        ["Task", "Hours per Day"],
                        ["일한 시간", parseInt(data[2])],
                        ["최대 남은 시간", 52-data[2]],

                        ]}
                        options={{
                            // pieStartAngle: 135, // 엥글 각도 바꾸기
                            // tooltip: { trigger: 'none' },   // 툴팁 안보이게 하기
                            // pieSliceText: 'label',  // 퍼센트 말고 타이틀로 적히기
                            title:"주간 근무 시간",
                            backgroundColor: "transparent",
                            legend: "none",
                            pieHole: 0.3,
                            colors: ["skyblue", "#ff9aa3", "lightgrey", "yellowgreen", "gold"],
                        }}
                    />     
                </div>

                
                {
                // 기본 옵션 차트
                /* <Chart
                        width={"300px"}
                        height={"300px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                        ["Task", "Hours per Day"],
                        ["Work", 25],
                        ["Eat", 10],
                        ["Commute", 10],
                        ["Watch TV", 10],
                        ["Sleep", 45],
                        ]}
                        options={{
                            title: "My Daily Activities",
                            backgroundColor: "transparent",
                            legend: "none",
                            pieHole: 0.3,
                            colors: ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#cf6a87"]
                        }}
                    />           */}
                     

                <Space direction="vertical" size={12}>
                    <RangePicker onChange={dateHandler} />
                </Space>
                <br />
                <Pagi>
                <Table dataSource={data2} columns={columns} pagination={{position:['bottomCenter']}} />
                </Pagi>
                </Fade>
            </Layout>
        </SiteLayout>
    );
};

export default Work;