import React from 'react';
import { List, Avatar,Typography, Space } from 'antd';
import image from '../../assets/images/52.jpg'
import styled from 'styled-components';

const { Text, Link } = Typography;

const data = [
    {
      title: '김정현',
    },
    {
      title: '김정인',
    },
    {
      title: '이재성',
    },
    {
      title: '안대혁',
    },
  ];

const EmployeeOnOffListLayout = styled.div`
  .ant-list-item-meta-title { font-size:12px },
  .ant-list-item-meta-description { font-size:12px },
  .ant-typography-success { font-size: 12px; }


`

const EmployeeOnOffList = () => {
    return (
        <EmployeeOnOffListLayout>
            <div style={{height:"100%", width:"200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item
                        actions={[<Text style={{color:"#40BCFF"}}>출근</Text>]}
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={image} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="의사"
                        />
                    </List.Item>
                    )}
                />
            </div>
        </EmployeeOnOffListLayout>
    );
};

export default EmployeeOnOffList;