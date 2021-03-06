/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Layout, Descriptions, Table, Breadcrumb, Select, Form, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import SiteLayout from '../SiteLayout';
import moment from 'moment';
import styled from 'styled-components';

const { Option } = Select;

const columns = [

    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'onTime',
        dataIndex: 'onTime',
        key: 'onTime',
    },
    {
        title: 'offTime',
        dataIndex: 'offTime',
        key: 'offTime',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
];

const Pagi = styled.div`
    .ant-pagination { margin-right:100px}
`;

const Employee_Details = (props) => {

    const header = {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
        },
    };
    const { id } = props.match.params;

    const [user, setUser] = useState({
    });
    const [works, setWorks] = useState([]);
    // const [state, setState] = useState(true);

    useEffect(() => {
        userFetch();
        workFetch();
    }, [])

    const userFetch = () => {
        axios.get("http://localhost:8080/api/user/" + id, header).then(res => {
            setUser(res.data);
            // if(res.data.leaveDate !== null) {
            //     setState(false);
            // }
        }).catch();
    }

    const data = [];
    const workFetch = async () => {
        await axios.get("http://localhost:8080/api/getwork/" + id, header).then(res => {
            setWorks(res.data);

        }).catch();
    }

    works.map((work, index) => data.push({
        key: index + 1,
        date: moment(work.date).format("yyyy-MM-DD"),
        onTime: moment(work.onTime).format("HH : mm")  !== "Invalid date" ? moment(work.onTime).format("HH : mm") : "",
        offTime: moment(work.offTime).format("HH : mm") !== "Invalid date" ? moment(work.offTime).format("HH : mm") : "",
        state: work.state
    }));

    const updateRole = (value) => {
        let data = {
            roles: value
        }
        axios.put("http://localhost:8080/api/user/" + id, data, header).then().catch();
    }

    const leaveDate = (value) => {
        let data = {
            leaveDate : value
        }
        axios.put("http://localhost:8080/api/user/updateLeaveDate/"+user.id,data,header).then(res=>{
            // setState(false);
        }).catch();
    }

    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>?????? ??????</Breadcrumb.Item>
                    <Breadcrumb.Item>?????? ??????</Breadcrumb.Item>
                    <Breadcrumb.Item>?????????</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <Link to="/employeemanagement" style={{ textAlign: "end" }}>?????? ?????? ??????</Link>
                <Descriptions title="[?????? ??????]" bordered>
                    <Descriptions.Item label="??????">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{user.birth}</Descriptions.Item>
                    <Descriptions.Item label="??????">{user.gender}</Descriptions.Item>
                    <Descriptions.Item label="?????????">{user.phone}</Descriptions.Item>
                    <Descriptions.Item label="?????????" span={2}>{user.email}</Descriptions.Item>
                    <Descriptions.Item label="??????" span={3}>{user.address}</Descriptions.Item>
                    <Descriptions.Item label="??????">{user.position}</Descriptions.Item>
                    <Descriptions.Item label="?????????">{user.hireDate}</Descriptions.Item>
                    <Descriptions.Item label="?????????">{user.leaveDate}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{user.mleave}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{user.aleave}</Descriptions.Item>
                    <Descriptions.Item label="????????????"></Descriptions.Item>
                    {sessionStorage.getItem("userRole") === "ROLE_ADMIN" ?
                        <Form.Item
                            name="roles"
                            label="??????"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your roles!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Select onChange={updateRole} placeholder="????????? ??????????????????. ">
                                <Option value="ROLE_USER">??????</Option>
                                <Option value="ROLE_ADMIN">?????????</Option>
                            </Select> <br/>
                            &nbsp; * ?????? ?????? ?????????.
                        </Form.Item>
                        : 2
                    }
                     <Form.Item
                            name="roles"
                            label="?????? ??????"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your roles!',
                                    whitespace: true,
                                },
                            ]}
                        >   
                            <DatePicker onSelect={leaveDate} inputReadOnly/> <br/> &nbsp; * ?????? ?????? ?????????. 
                        </Form.Item>
                </Descriptions>
                <br /><br />
                [?????? ??????]
                <Pagi>
                    <Table dataSource={data} columns={columns} pagination={{position:['bottomCenter']}} />
                </Pagi>
            </Layout>
        </SiteLayout>
    );
};

export default Employee_Details;