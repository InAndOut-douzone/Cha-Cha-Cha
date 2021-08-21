import React, { useState, useEffect } from 'react';
import { Form, TimePicker } from 'antd'
import axios from 'axios';


const FormItem = (props) => {

        const { week, onTime, offTime } = props.time;
        const onChange = props.onChange;

        const weekUpdate = (moment) => {
            console.log("weekUpdate" + week);
            onChange(moment, week)            
        }
    
        // const Monday = (moment) => { updateApi("Monday", moment); }
        // const Tuesday = (moment) => { updateApi("Tuesday", moment); }
        // const Wednesday = (moment) => { updateApi("Wednesday", moment); }
        // const Thursday = (moment) => { updateApi("Thursday", moment); }
        // const Friday = (moment) => { updateApi("Friday", moment); }
        // const Saturday = (moment) => { updateApi("Saturday", moment); }
        // const Sunday = (moment) => { updateApi("Sunday", moment); }

        // moment 값만 넘겨지는데 해결해보자
    return (
        <Form.Item name={week} label={week}>
            <TimePicker.RangePicker placeholder={[onTime,offTime]} onChange={weekUpdate} bordered={true} format="HH:mm"/>
        </Form.Item>
    );
};

export default FormItem;