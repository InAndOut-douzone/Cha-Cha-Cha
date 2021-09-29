import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Layout, Breadcrumb, Button, Descriptions, Image, Input } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import DefaultLogo from '../../assets/images/defaultProfile.png';
import SiteLayout from '../SiteLayout';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const MyPageLayout = styled.div`
    .ant-descriptions-item-label { text-align:center }
`

const HIM = () => {
    const imgPath = "/images/";
    const [hospital, setHospital] = useState({});
    // const [form] = Form.useForm();
    const formData = new FormData();

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [telNum, setTelNum] = useState();
    const [ceoName, setCeoName] = useState();
    const [logo, setLogo] = useState();
    const [image, setImage] = useState();

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
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);

        setLogo(imageFile); // formdata에 선택된 이미지 파일을 넣기 위해 저장
        setImage(imageUrl);// 프로필 미리보기를 출력하기 위해 이미지 url 저장
    };

    // const normFile = (e) => {
    //     console.log('Upload event:', e);

    //     if (Array.isArray(e)) {
    //         return e;
    //     }

    //     return e && e.fileList;
    // };

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
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + sessionStorage.getItem("Authorization")
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital2", header).then((res) => {
            setHospital(res.data);
            setName(res.data.name);
            setAddress(res.data.address);
            setTelNum(res.data.telNum);
            setCeoName(res.data.ceoName);
            if(res.data.logo != null) {
                setImage(imgPath + res.data.logo);
            } else {
                setImage(null);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataUpdate = (e) => {
        
        let hospitalData = {
            logo:null,
            name: name,
            address: address,
            telNum: telNum,
            ceoName: ceoName
        };
        
        formData.append('file', logo);
        formData.append('hospitalData', JSON.stringify(hospitalData));
        
        axios.post("http://localhost:8080/api/hospital2", formData, header).then((res) => {
            console.log("수정완료");    
        });
    }

    return (
        <SiteLayout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <br />
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>의원 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>의원 정보 관리</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ borderTop: "1px solid #eee" }} />
                <br /><br />

                {/* <Form style={{ width: "450px", alignSelf: "center" }} onFinish={dataUpdate}>
                    <InputLayout>
                        <Image style={{ width: "200px" }} src={image === null ? DefaultLogo : image} roundedCircle />
                        <br /><br />
                        <input type="file" accept="image/*" onChange={HIM_logo}></input>
                        <br />

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
                            <InputGroup.Text id="inputGroup-sizing-sm">의원 전화번호</InputGroup.Text>
                            <FormControl aria-label="의원 전화번호" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.telNum} onChange={HIM_telNum} />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">대표자명</InputGroup.Text>
                            <FormControl aria-label="대표자명" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.ceoName} onChange={HIM_ceoName} />
                        </InputGroup>
                    
                        <Form.Item>
                            <Button type='Primary' htmlType="submit">수정</Button>
                        </Form.Item>
                    </InputLayout>
                </Form> */}

                {/*  */}

                <Fade bottom>
                <Form style={{ width: '90%', textAlign:"center" }} onFinish={dataUpdate} >    
                    <div style={{ textAlign: "center" }}>
                        의원 정보 수정을 할 수 있는 화면입니다. <br/> ( *의원 번호는 수정 불가능합니다.) <br /><br /><br />
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Image style={{ width: "200px" }} src={image === null ? DefaultLogo : image} />
                        <br /><br />
                        <div style={{ textAlign: "-webkit-center"}}>
                            <input style={{textAlignLast:"center"}} type="file" accept="image/*" name="file" onChange={HIM_logo}></input>
                        </div>
                        <br />
                    </div>
                    <MyPageLayout style={{ padding: "30px 150px"}}>
                    <Descriptions title="" layout="vertical" bordered>
                        <Descriptions.Item label="의원 번호">{hospital.no}</Descriptions.Item>

                        <Descriptions.Item label="의원명">
                            <Form.Item>
                                <Input style={{border: "1px solid beige", textAlign: "center"}} value={name} onChange={HIM_name} />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="대표자명">
                            <Form.Item>
                                <Input style={{border: "1px solid beige", textAlign: "center"}} value={ceoName} onChange={HIM_ceoName} />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="의원 주소" span={2}>
                            <Form.Item>
                                <Input style={{border: "1px solid beige", textAlign: "center", width: "70%"}} value={address} onChange={HIM_address} />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item label="의원 전화번호">
                            <Form.Item>
                                <Input style={{border: "1px solid beige", textAlign: "center"}} value={telNum} onChange={HIM_telNum} />
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                    </MyPageLayout>
                    <br />
                    <Form.Item>
                        <Button type='Primary' htmlType="submit">수정</Button>
                    </Form.Item>
                </Form>
                </Fade>
            </Layout>
        </SiteLayout>
    );
};

export default HIM;