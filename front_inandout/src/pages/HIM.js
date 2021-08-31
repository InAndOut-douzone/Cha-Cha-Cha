import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Layout, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { InputGroup, FormControl, Image } from 'react-bootstrap';
import DefaultLogo from '../assets/images/defaultProfile.png';
import SiteLayout from './SiteLayout';

const HIM = () => {
    const imgPath = "/images/";
    const [hospital, setHospital] = useState({});
<<<<<<< HEAD
    // const [form] = Form.useForm();
    const formData = new FormData();

=======
    const [form] = Form.useForm();
>>>>>>> 0c9cf2e982cf00c6cf606569fa478903a8c403ce
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

        console.log(imageUrl);
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
            Authorization: "Bearer " + localStorage.getItem("Authorization")
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/hospital2", header).then((res) => {
            console.log(res);
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

                <Form style={{ width: "350px", alignSelf: "center" }} onFinish={dataUpdate}>
                    <Image style={{ width: "200px" }} src={image === null ? DefaultLogo : image} roundedCircle />
                    <br /><br />
                    <input type="file" accept="image/*" onChange={HIM_logo}></input>
                    {/* <Form.Item
                    // name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={HIM_logo}
                // extra="logo"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Logo 변경</Button>
                    </Upload>
                </Form.Item> */}
                    {/* <input type="file" onClick={HIM_logo}/> */}


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
                    {/* <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">의원 로고</InputGroup.Text>
                    <FormControl aria-label="의원 로고" aria-describedby="inputGroup-sizing-sm" defaultValue={hospital.logo} onChange={HIM_logo} />
                </InputGroup> */}
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
        </SiteLayout>
    );
};

export default HIM;