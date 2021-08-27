import React, { useEffect, useState } from 'react';
import { Layout, Descriptions, Table, Breadcrumb, Select, Form } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import SiteLayout from '../SiteLayout';
import moment from 'moment';

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

const Employee_Details = (props) => {

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    const { id } = props.match.params;

    const [user, setUser] = useState({});
    const [works, setWorks] = useState([]);

    useEffect(() => {
        userFetch();
        workFetch();
    }, [])

    const userFetch = () => {
        axios.get("http://localhost:8080/api/user/" + id, header).then(res => {
            setUser(res.data);
            console.log(res.data)
        }).catch();
    }

    const data = [];
    const workFetch = async () => {
        await axios.get("http://localhost:8080/api/getwork/" + id, header).then(res => {
            console.log(res.data);
            setWorks(res.data);

        }).catch();
    }

    works.map((work, index) => data.push({
        key: index + 1,
        date: moment(work.date).format("yyyy MM DD"),
        onTime: moment(work.onTime).format("HH : mm"),
        offTime: moment(work.offTime).format("HH : mm") !== "Invalid date" ? moment(work.offTime).format("HH : mm") : "",
        state: work.state
    }));

    const updateRole = (value) => {
        let data = {
            roles: value
        }
        axios.put("http://localhost:8080/api/user/" + id, data, header).then().catch();
    }

    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>자세히</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />
                <Link to="/employeemanagement" style={{ textAlign: "end" }}>사원 목록 이동</Link>
                <Descriptions title="[사원 정보]" bordered>
                    <Descriptions.Item label="이름">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="생년월일">{user.birth}</Descriptions.Item>
                    <Descriptions.Item label="성별">{user.gender}</Descriptions.Item>
                    <Descriptions.Item label="연락처">{user.phone}</Descriptions.Item>
                    <Descriptions.Item label="이메일" span={2}>{user.email}</Descriptions.Item>
                    <Descriptions.Item label="주소" span={3}>{user.address}</Descriptions.Item>
                    <Descriptions.Item label="직급">{user.position}</Descriptions.Item>
                    <Descriptions.Item label="입사일">{user.hireDate}</Descriptions.Item>
                    <Descriptions.Item label="퇴사일">{user.leaveDate}</Descriptions.Item>
                    <Descriptions.Item label="월차갯수">{user.mleave}</Descriptions.Item>
                    <Descriptions.Item label="연차갯수">{user.aleave}</Descriptions.Item>
                    <Descriptions.Item label="반차갯수"></Descriptions.Item>
                    {localStorage.getItem("userRole") === "ROLE_ADMIN" ?
                        <Form.Item
                            name="roles"
                            label="권한"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your roles!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Select onChange={updateRole} placeholder="권한을 설정해주세요. ">
                                <Option value="ROLE_USER">일반</Option>
                                <Option value="ROLE_ADMIN">관리자</Option>
                            </Select> <br/>
                            &nbsp; * 자동 저장 됩니다.
                        </Form.Item>
                        : 2
                    }
                     <Form.Item
                            name="roles"
                            label="권한"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your roles!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Select onChange={updateRole} placeholder="권한을 설정해주세요. ">
                                <Option value="ROLE_USER">일반</Option>
                                <Option value="ROLE_ADMIN">관리자</Option>
                            </Select>
                        </Form.Item>
                </Descriptions>
                <br /><br />
                [근무 현황]
                <Table dataSource={data} columns={columns} />
            </Layout>
        </SiteLayout>
    );
};

export default Employee_Details;