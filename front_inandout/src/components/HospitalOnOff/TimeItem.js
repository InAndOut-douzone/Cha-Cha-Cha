import { Form } from 'antd';
import React from 'react';

const TimeComponent = (props) => {

  const { week, onTime, offTime } = props.time;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Form name="time_related_controls" {...formItemLayout} style={{ textAlign: "initial", marginLeft: "23%", marginBottom: "-20px" }}>
      {onTime === "00:00" ? 
        <Form.Item name={week} label={week} >휴 진</Form.Item> : 
        <Form.Item name={week} label={week} >{onTime}~ {offTime}</Form.Item> }
    </Form>
  );
};

export default TimeComponent;