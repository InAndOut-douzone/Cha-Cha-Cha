import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';
import SiteLayout from '../SiteLayout';

const columns = [
    {
        title: '번호',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: '사원번호',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Birth',
        dataIndex: 'birth',
        key: 'birth',
    },
    {
        title: 'Hire Date',
        dataIndex: 'hireDate',
        key: 'hireDate',
    },
    {
        title: 'Details',
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/employeedetails/" + record.id}>자세히</Link>
                {/* <Link to={`/employeedetails/${record.id}`}>자세히</Link> */}
            </Space>
        )
    },
];

const columns2 = [
    {
        title: '번호',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: '사원번호',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Birth',
        dataIndex: 'birth',
        key: 'birth',
    },
    {
        title: 'Hire Date',
        dataIndex: 'hireDate',
        key: 'hireDate',
    },
    {
        title: 'Leave Date',
        dataIndex: 'leaveDate',
        key: 'leaveDate',
    },
    {
        title: 'Details',
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/employeedetails/" + record.id}>자세히</Link>
                {/* <Link to={`/employeedetails/${record.id}`}>자세히</Link> */}
            </Space>
        )
    },
];

const Employee_Management = () => {

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    const [users, setUsers] = useState([]);
    const [leaveUsers, setLeaveUsers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/list", header).then(res => {
            setUsers(res.data);
        }).catch();
        getLeaveUser();
    }, [])

    const data = [];
    users.map((user, index) => data.push({
        key: index + 1,
        ...user
    }));

    const getLeaveUser = async () => {
        await axios.get("http://localhost:8080/api/user/leavelist", header).then(res => {
            console.log(res);
            setLeaveUsers(res.data);
        }).catch()
    }

    const data2 = [];
    leaveUsers.map((user, index) => data2.push({
        key: index + 1,
        ...user
    }));

    const openState = () => {
        setOpen(!open);
    }

    return (
        <SiteLayout>
            <ManagementLayout>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <br />
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                        <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                        <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ borderTop: "1px solid #eee" }} />
                    <br /><br />
                    <div style={{ textAlign: "center" }}>
                        사원 목록이 나오는 화면입니다. 자세히 버튼을 통해서 해당 사원 상세 정보를 볼 수 있습니다. <br /><br /><br />
                    </div>
                    <Table style={{ textAlign: "center" }} dataSource={data} columns={columns} />

                    <br/><br/><br/>
                    <div style={{ textAlign: "center" }}>
                        퇴사자 목록이 나오는 화면입니다. 
                        &nbsp;  &nbsp; <button onClick={openState} style={{color:"#4EAFFF", border:"0px solid gray", background:"white" }}>펼치기</button><br/><br/><br/>
                    </div>
                    <div>
                    { open ? <Table style={{ textAlign: "center" }} dataSource={data2} columns={columns2} /> : 2 }
                    </div>  
                </Layout>
            </ManagementLayout>
        </SiteLayout>
    );
};


const ManagementLayout = styled.div`
    .ant-table-cell { text-align:center }

`

export default Employee_Management;
