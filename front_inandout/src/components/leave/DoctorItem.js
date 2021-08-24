import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const DoctorItem = (props) => {

    const { name, username, address } = props.doctor;

    console.log("닥터아이템입니ㅏ다");
    console.log(props);

    return (
        <Option value={address}>12</Option>
    );
};

export default DoctorItem;