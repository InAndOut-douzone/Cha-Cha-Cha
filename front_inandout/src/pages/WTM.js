import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Form, TimePicker, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import image from "../assets/images/double-right.jpg";
import "../assets/css/wtm.css";
import moment from 'moment';
import { Typography } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

  const config = {
      rules: [
          {
              type: 'object',
              required: true,
              message: 'Please select time!',
          },
      ],
  };

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
      "Content-Type": "application/json; charset=utf-8"
    },
  };

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

const WTM = () => {

    const [open,setOpen] = useState();
    const [close,setClose] = useState();

    useEffect(()=>{
      axios.get("http://localhost:8080/api/hospital", header).then(res=> {
        setOpen(res.data.onTime);
        setClose(res.data.offTime);
      }).catch(err => {
        console.log("err :" + err);
      });
    },[])

    const openTime = (value) => {
      const timeString = moment(value).format("HH:mm");
      setOpen(timeString);
      console.log("updateTime value" + timeString);
    }

    const closeTime = (value) => {
      const timeString = moment(value).format("HH:mm");
      setClose(timeString);
      console.log("updateTime value" + timeString);
    }

    const onFinish = async () => {
      let data = {
        onTime: open,
        offTime: close
      }

      console.log("123",data);

      await axios.put("http://localhost:8080/api/hospital",JSON.stringify(data), header).then(res => {
        console.log("res" + res)
      }).catch(error => {
        console.log("error" + error);
      })
    };
    return (      
        <Layout style={{ padding: '0 24px 24px', maxWidth: "960px"}}>
            <br />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
                <Breadcrumb.Item>병원 관리</Breadcrumb.Item>
                <Breadcrumb.Item>근무시간 관리</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ borderTop: "1px solid #eee" }} />
            <br/><br/>

            <div style={{textAlign:"center"}}>
            <Title level={2}>현재 근무 시간</Title>
            <Text>근무 시간은 {open} ~ {close} 입니다.</Text>
             <br/>
             <Text type="danger">주 52시간제</Text>
             <Text>를 적용하고 있습니다.</Text>
            </div>

            <section id="about-fifty-two-hours-work-week">
              <div className="container">
                <div className="row sft-align-center">
                  <div className="col-12 mb-5">
                    <h2 className="wtm-h2">주 52시간 근무제란?</h2>
                    <p className="sft-text-20">2018년 근로기준법 개정으로 근로기준법 상 1주가 휴일을 포함한 7일로 정의되었습니다.</p>
                  </div>
                  <div className="col-12 col-sm-10 col-lg-6 col-xl-5 sft-scroll-interval" data-sr-id="1" style={{visibility: "visible", opacity: 1, transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", transition: "opacity 1.2s ease-out 0s, transform 1.2s ease-out 0s"}}>
                    <div className="sft-before-work-hours-card sft-shadow-sm">
                      <div className="sft-work-hours">
                        <div>
                          <p className="sft-text-15">평일근로</p>
                          <p className="sft-text-20">40시간</p>
                        </div>
                        <p className="sft-text-24">+</p>
                        <div>
                          <p className="sft-text-15">평일연장근로</p>
                          <p className="sft-text-20">12시간</p>
                        </div>
                        <p className="sft-text-24">+</p>
                        <div>
                          <p className="sft-text-15">휴일근로</p>
                          <p className="sft-text-20">16시간</p>
                        </div>
                      </div>
                      <h3>최대 68시간</h3>
                    </div>
                  </div>
                  {/* <CaretRightOutlined /> */}
                  <Image width={70} src={image} />
                  {/* <div className="d-none d-lg-block col-lg-1">
                    <i className="far fa-chevron-double-right"></i>
                  </div>
                  <div className="d-block d-lg-none col-12">
                    <i className="far fa-chevron-double-down"></i>
                  </div> */}
                  <div className="col-12 col-lg-5 col-xl-6 sft-scroll-interval" data-sr-id="3" style={{visibility: "visible", opacity: 1, transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", transition: "opacity 1.2s ease-out 0s, transform 1.2s ease-out 0s"}}>
                    <div className="sft-after-work-hours-card sft-shadow-md">
                      <div className="sft-work-hours sft-align-center">
                        <div>
                          <p className="sft-text-15">평일근로</p>
                          <p className="sft-text-20">40시간</p>
                        </div>
                        <p className="sft-text-24">+</p>
                        <div>
                          <p className="sft-text-15">연장근로</p>
                          <p className="sft-text-20">12시간</p>
                        </div>
                      </div>
                      <h3>최대 52시간</h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div style={{textAlign:"center"}}>
              <h2>근무 시간 수정</h2>
              <br/><br/>
              {
                localStorage.getItem("userRole") === "ROLE_ADMIN" 
                  ? 
                  <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
                    <Form.Item name="t" label="open" {...config}>
                      <TimePicker 
                        format="HH:mm" 
                        onSelect={openTime} />
                    </Form.Item>
                    <Form.Item name="f" label="close" {...config}>
                      <TimePicker 
                        format="HH:mm" 
                        onSelect={closeTime} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                  </Form>
                  : 12
              }
            </div>
         </Layout>
    );
};

export default WTM;