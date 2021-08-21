import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Layout, Breadcrumb, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const HIM = () => {
    const [hospital, setHospital] = useState({});
    const [form] = Form.useForm();

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [ceoName, setCeoName] = useState();
    const [logo, setLogo] = useState();
    const [telNum, setTelNum] = useState();

    // const config = {
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //     },
    // };

    const HIM_name = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const HIM_address = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    };

    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital", header).then((res) => {
            console.log(res);
            setHospital(res.data);
            setName(res.data.name);
        });
    }, []);

    const dataUpdate = (e) => {
        let hospital = {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            name: name,
            address: address
        };

        axios.post("http://localhost:8080/api/hospital2", hospital, header).then((res) => {
            console.log(res)
        });
    }



    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>의원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>의원 정보 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }} />
            <br /><br />

            <Form
                style={{ width: "350px", alignSelf: "center" }}
                // form={form}
                // name="register"
                onFinish={dataUpdate}
                // scrollToFirstError
            >
                {hospital.no}{hospital.name}
                <Form.Item
                    name="no"
                    label="의원 번호"
                >
                    {hospital.no}
                </Form.Item>
                <Form.Item
                    name="name"
                    label="의원명"
                >
                    <input defaultValue={hospital.name} onChange={HIM_name} />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="의원 주소"
                >
                    <Input defaultValue={hospital.address} onChange={HIM_address}/>
                </Form.Item>
                {/* <Form.Item
                    name="logo"
                    label="기업로고"
                >
                    <Input defaultValue={hospital.logo} />
                </Form.Item>
                <Form.Item
                    name="telNum"
                    label="의원 연락처"
                >
                    <Input defaultValue={hospital.telNum} />
                </Form.Item>
                <Form.Item
                    name="ceoName"
                    label="대표자명"
                >
                    <Input defaultValue={hospital.ceoName} />
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
            </Form>






        </Layout>
    );
};

export default HIM;