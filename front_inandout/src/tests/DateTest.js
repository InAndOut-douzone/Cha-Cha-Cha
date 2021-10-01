import React from 'react';
import { Form, DatePicker } from 'antd'
const { RangePicker } = DatePicker

const DateTest = () => {

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const submit = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <Form>
        <Form.Item name="date-picker" label="DatePicker" {...config} >
          <DatePicker />
        </Form.Item>
        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
          <RangePicker />
        </Form.Item>
        <button onClick={submit}>123123</button>
      </Form>
    </div>
  );
};

export default DateTest;