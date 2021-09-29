import React from 'react';
import moment from 'moment';
import { Timeline } from 'antd';

const HolidayItem = (props) => {
    const { content, holiday } = props.holiday;
    
    const randomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      };

    return (
        <Timeline.Item style={{color:randomColor()}}>{moment(holiday).format("yyyy MM DD")} : {content}</Timeline.Item>
    );
};

export default HolidayItem;