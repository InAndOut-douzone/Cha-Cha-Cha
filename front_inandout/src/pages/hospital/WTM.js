import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Form, Image, DatePicker, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import image from "../../assets/images/double-right.jpg";
import "../../assets/css/wtm.css"
import { Typography } from 'antd';
import axios from 'axios';
import TimeItem from '../../components/HospitalOnOff/TimeItem'
import FormItem from '../../components/HospitalOnOff/FormItem'
import SiteLayout from '../SiteLayout';
import Fade from 'react-reveal/Fade';
import HolidayItem from '../../components/holiday/HolidayItem'
import { Timeline } from 'antd';
import moment from 'moment'

const { Title, Text } = Typography;

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

  const header = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
      "Content-Type": "application/json; charset=utf-8"
    },
  };

  const [time, setTime] = useState([]);
  const [formRef] = Form.useForm();
  const [holidays, setHolidays] = useState([]);

  const updateApi = async (week, moment) => {
    let data = {
      week: week,
      onTime: moment[0].format("HH:mm"),
      offTime: moment[1].format("HH:mm")
    }

    await axios.put("http://localhost:8080/api/hospitalOnOff", JSON.stringify(data), header).then(res => {
      fetch();
    }).catch(error => {
      console.log("error" + error);
    })
  }

  const fetch = () => {
    axios.get("http://localhost:8080/api/hospitalOnOff", header).then(res => {
      setTime(res.data);
    }).catch(err => {
      console.log("err :" + err);
    });
  }

  useEffect(() => {
    fetch();
    holidayAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Monday = (moment, week) => { updateApi(week, moment); }
  // const Tuesday = (moment) => { updateApi("Tuesday", moment); }
  // const Wednesday = (moment) => { updateApi("Wednesday", moment); }
  // const Thursday = (moment) => { updateApi("Thursday", moment); }
  // const Friday = (moment) => { updateApi("Friday", moment); }
  // const Saturday = (moment) => { updateApi("Saturday", moment); }
  // const Sunday = (moment) => { updateApi("Sunday", moment); }

  const onFinish = (moment) => {
    axios.post("/api/holiday", moment,header).then(res => {
      alert("?????? ???????????????.")
      formRef.current.setFieldsValue({
          content: "",
          holiday: "",
      });
    }).catch(err => {
      console.log("err :" + err);
    });
  }

  const holidayAll = async () => {
    await axios.get("http://localhost:8080/api/holiday/all",header).then(res => {setHolidays(res.data);}).catch(err => {});
  }

  const today = moment().format("YYYY MM DD");

  return (
    <SiteLayout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <br />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>?????? ??????</Breadcrumb.Item>
          <Breadcrumb.Item>???????????? ??????</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ borderTop: "1px solid #eee" }} />
        <br /><br />

        <Fade bottom>
        <div style={{display:"flex", width:"100%"}}>
          <div style={{ textAlign: "center", width:"50%" }}>
            <Title level={2}>?????? ?????? ??????</Title>
            {time.map((time) => (<TimeItem key={time.no} time={time} />))}
            <br />
            <Text type="danger">??? 52?????????</Text>
            <Text>??? ???????????? ????????????.</Text>
          </div>
          <div style={{marginLeft:"10%"}}>
              <Title level={2}>????????? ??????</Title>    
              <Text>* ????????? ????????? ??? ??? ????????????. ( {today} ~ {moment(today).add(30,'days').format("MM DD")} )</Text> <br/><br/><br/>
              <div>
                <Timeline>
                    {holidays.map((holiday) => (<HolidayItem key={holiday.no} holiday={holiday}/>))}
                  </Timeline>
              </div>
          </div>
        </div>


        <section id="about-fifty-two-hours-work-week">
          <div className="container">
            <div className="row sft-align-center">
              <div className="col-12 mb-5">
                <h2 className="wtm-h2">??? 52?????? ?????????????</h2>
                <p className="sft-text-20">2018??? ??????????????? ???????????? ??????????????? ??? 1?????? ????????? ????????? 7?????? ?????????????????????.</p>
              </div>
              <div className="col-12 col-sm-10 col-lg-6 col-xl-5 sft-scroll-interval" data-sr-id="1" style={{ visibility: "visible", opacity: 1, transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", transition: "opacity 1.2s ease-out 0s, transform 1.2s ease-out 0s" }}>
                <div className="sft-before-work-hours-card sft-shadow-sm">
                  <div className="sft-work-hours">
                    <div>
                      <p className="sft-text-15">????????????</p>
                      <p className="sft-text-20">40??????</p>
                    </div>
                    <p className="sft-text-24">+</p>
                    <div>
                      <p className="sft-text-15">??????????????????</p>
                      <p className="sft-text-20">12??????</p>
                    </div>
                    <p className="sft-text-24">+</p>
                    <div>
                      <p className="sft-text-15">????????????</p>
                      <p className="sft-text-20">16??????</p>
                    </div>
                  </div>
                  <h3>?????? 68??????</h3>
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
              <div className="col-12 col-lg-5 col-xl-6 sft-scroll-interval" data-sr-id="3" style={{ visibility: "visible", opacity: 1, transform: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", transition: "opacity 1.2s ease-out 0s, transform 1.2s ease-out 0s" }}>
                <div className="sft-after-work-hours-card sft-shadow-md">
                  <div className="sft-work-hours sft-align-center">
                    <div>
                      <p className="sft-text-15">????????????</p>
                      <p className="sft-text-20">40??????</p>
                    </div>
                    <p className="sft-text-24">+</p>
                    <div>
                      <p className="sft-text-15">????????????</p>
                      <p className="sft-text-20">12??????</p>
                    </div>
                  </div>
                  <h3>?????? 52??????</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: "center" }}>
          <Title level={3}>?????? ?????? ??????</Title>
          <Text>* ?????? ?????? ???</Text> <Text type="danger">?????? ??????</Text> <Text>????????? .</Text>
          <br /><br />
          {
            sessionStorage.getItem("userRole") === "ROLE_ADMIN"
              ?
              <Form name="time_related_controls" {...formItemLayout}>
                {time.map((time) => (<FormItem key={time.no} time={time} onChange={Monday} />))}
              </Form>
              : " - ???????????? ?????? ??? ??? ????????????. - "
          }
        </div> <br/><br/><br/><br/>
        <div style={{ textAlign: "center" }}>
          <Title level={3}>????????? ??????</Title>
          <Text>* ???????????? ?????? ??? ??? ????????????.</Text> <br/>
          <Text>* ?????? ???????????? ?????? ?????????</Text> <Text type="danger">?????? ??????</Text> <Text>????????? .</Text>
          <br /><br /><br/><br/>

          {
            sessionStorage.getItem("userRole") === "ROLE_ADMIN"
              ?
              <Form
              name="basic"
              ref={formRef}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="?????????"
                name="holiday"
                rules={[
                  {
                    required: true,
                    message: 'Please input holiday!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
  
              <Form.Item
                label="??????"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please input content',
                  },
                ]}
              >
                <Input style={{width:"150px"}}/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
              <Button type="primary" htmlType="submit">
                  ??????
                </Button>
              </Form.Item>
            </Form>
              : " - ???????????? ?????? ??? ??? ????????????. - "
          }          
        </div>
        </Fade>
        
      </Layout>
    </SiteLayout>
  );
};

export default WTM;