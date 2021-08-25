import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Space, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import SiteLayout from '../SiteLayout';
import LeaveItem from '../../components/leave/LeaveItem';
import styled from 'styled-components';
import axios from 'axios';

const { Text } = Typography;

const LeaveManagementLayout = styled.div`
  .ant-card-bordered{ margin-bottom: 40px }
  .ant-table-cell { text-align:center }
`

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
    title: 'Hire Date',
    dataIndex: 'hireDate',
    key: 'hireDate',
  },
  {
    title: 'aleave',
    dataIndex: 'aleave',
    key: 'aleave',
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

const Leave_Management = () => {

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };

  const [users, setUsers] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/list", header).then(res => {
      setUsers(res.data);
    }).catch();
    getLeaves();
  }, [])

  const data = [];
  users.map((user, index) => data.push({
    key: index + 1,
    ...user
  }))

  const getLeaves = () => {
    axios.get("http://localhost:8080/api/leave", header).then(res => {
      setLeaves(res.data);
    }).catch()
  }

  return (
    <LeaveManagementLayout>
      <SiteLayout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <br />
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
            <Breadcrumb.Item>사원 관리</Breadcrumb.Item>
            <Breadcrumb.Item>휴가 관리</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ borderTop: "1px solid #eee" }} />
          <br /><br />
          <div style={{ textAlign: "center" }}>
            사원들의 연차 현황을 볼 수 있고, 사원들의 연차 승인, 거절을 할 수 있습니다.
          </div>
          <br /><br />
          <Table style={{ textAlign: "center" }} dataSource={data} columns={columns} /><br /><br /><br />
          <Text style={{ textAlign: "center" }}>현재 의원님한테 들어온 휴가신청 목록 입니다.  <button onClick={getLeaves} style={{ border: "0px", background: "white", color: "cadetblue" }}>*새로 고침*</button></Text><br /><br />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {leaves.map((leave) => (<LeaveItem key={leave.no} leave={leave} onClick={getLeaves} />))}
          </div>
        </Layout>
      </SiteLayout>
    </LeaveManagementLayout>
  );
};

export default Leave_Management;