import React from 'react';
import { Form, TimePicker } from 'antd'

const FormItem = (props) => {

    const { week, onTime, offTime } = props.time;
    const onChange = props.onChange;

    const weekUpdate = (moment) => {
        onChange(moment, week)
    }

    return (
        <Form.Item name={week} label={week}>
            <TimePicker.RangePicker placeholder={[onTime, offTime]} onChange={weekUpdate} bordered={true} format="HH:mm" />
        </Form.Item>
    );
};

export default FormItem;