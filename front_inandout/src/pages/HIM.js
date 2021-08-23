import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Layout, Breadcrumb, Button, Input, Descriptions, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { InputGroup, FormControl, Image, Container, Row, Col } from 'react-bootstrap';
const HIM = () => {
    const [hospital, setHospital] = useState({});
    const [form] = Form.useForm();

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [logo, setLogo] = useState();
    const [telNum, setTelNum] = useState();
    const [ceoName, setCeoName] = useState();

    const HIM_name = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const HIM_address = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    };

    const HIM_logo = (e) => {
        e.preventDefault();
        setLogo(e.target.value);
    };

    const HIM_telNum = (e) => {
        e.preventDefault();
        setTelNum(e.target.value);
    };

    const HIM_ceoName = (e) => {
        e.preventDefault();
        setCeoName(e.target.value);
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
            setAddress(res.data.address);
            setLogo(res.data.logo);
            setTelNum(res.data.telNum);
            setCeoName(res.data.ceoName);
        });
    }, []);

    const dataUpdate = (e) => {
        let hospital = {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            name: name,
            address: address,
            logo: logo,
            telNum: telNum,
            ceoName: ceoName
        };

        axios.put("http://localhost:8080/api/hospital2", hospital, header).then((res) => {
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

            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src={hospital.logo} rounded />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" roundedCircle />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" thumbnail />
                    </Col>
                </Row>
            </Container>

            <Form style={{ width: "350px", alignSelf: "center" }} onFinish={dataUpdate}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원 번호</InputGroup.Text>
                    <FormControl aria-label="의원 번호" aria-describedby="inputGroup-sizing-sm" value={hospital.no} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원명</InputGroup.Text>
                    <FormControl aria-label="의원명" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.name} onChange={HIM_name} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원 주소</InputGroup.Text>
                    <FormControl aria-label="의원 주소" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.address} onChange={HIM_address} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원 로고</InputGroup.Text>
                    <FormControl aria-label="의원 로고" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.logo} onChange={HIM_logo} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원 전화번호</InputGroup.Text>
                    <FormControl aria-label="의원 전화번호" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.telNum} onChange={HIM_telNum} />
                </InputGroup>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">대표자명</InputGroup.Text>
                    <FormControl aria-label="대표자명" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.ceoName} onChange={HIM_ceoName} />
                </InputGroup>
                <Form.Item>
                    {/* <Button variant="dark" type='Primary' htmlType="submit">수정</Button> */}
                    <Button type='Primary' htmlType="submit">수정</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default HIM;