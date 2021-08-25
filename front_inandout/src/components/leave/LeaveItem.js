import React from 'react';
import { Card, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const LeaveItem = (props) => {

    const { category, toDate, fromDate, content, user } = props.leave;

    const formatToDate = moment(toDate).format("MM월 DD일");
    const formatFromDate = moment(fromDate).format("MM월 DD일");

    return (
        <>
            <Card title={user.name + " " + user.position} extra={
                <button style={{color:"#4EAFFF", background:"white", border:"0px"}}>More</button>} style={{ width: 300 }}>
                
                
                <p><Text type="success">구분 : </Text>{category}</p>
                <p><Text type="success">기간 : </Text>{formatToDate + " ~ " + formatFromDate}</p>
                <p><Text type="success">사유 : </Text> {content}</p>
            </Card>
        </>
    );
};

export default LeaveItem;