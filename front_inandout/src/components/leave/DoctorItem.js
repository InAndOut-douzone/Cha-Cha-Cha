import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const DoctorItem = (props) => {

    const { address } = props.doctor;

    return (
        <Option value={address}>12</Option>
    );
};

export default DoctorItem;