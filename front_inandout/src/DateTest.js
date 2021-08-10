import React from 'react';
import { Form, DatePicker, Input } from 'antd'
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
          console.log(e.target.value)
          console.log(123);
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