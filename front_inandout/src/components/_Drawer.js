import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import SockJsClient from 'react-stomp';

const { Option } = Select;

const _Drawer = () => {

  const formRef = useRef(null);
  const [state1, setState1] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState({});

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };

  const showDrawer = () => {
    setState1({
      visible: true,
    });
  };

  const onClose = (value) => {
    setState1({
      visible: false,
    });
  };

  useEffect(() => {
    getDoctor();
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDoctor = () => {
    axios.get("http://localhost:8080/api/user/getdoctor", header).then(res => {
      setDoctors(res.data);
    }).catch();
  }

  const getUser = () => {
    axios.get("http://localhost:8080/api/user", header).then(res => {
      setUser(res.data);
    }).catch();
  }

  const leavePost = (data) => {
    axios.post("http://localhost:8080/api/leave", data, header).then(res => {
    // axios.post("http://localhost:8080/api/leave", data, header).then(res => {
      alert("연차 신청이 완료되었습니다.");
      formRef.current.setFieldsValue({
        category: "",
        content: "",
        toDate: "",
        fromDate: "",
        name: ""
      });
      // window.location.replace("/")
    }).catch();

    setState1({
      visible: false,
    });
  }

  const onFinish = (value) => {
    let data = {
      category: value.category,
      content: value.content,
      toDate: moment(value.date[1]).add(1, 'm'),
      fromDate: value.date[0],
      state: "wait",
      fromUser: value.name
    }
    if(value.category === "연차"){
      // 두 기간간의 일 수     
      const day = moment.duration(value.date[1].diff(value.date[0])).asDays()+1;
      if(user.aleave >= day ){
        leavePost(data);
      } else{
        alert("휴가가 부족합니다.");
      }
    } else {
      const day = moment.duration(value.date[1].diff(value.date[0])).asDays()+0.5;
      if(moment.duration(value.date[1].diff(value.date[0])).asDays() > 0){
        alert("반차는 하루만 신청해주세요.");
      } else if (user.aleave >= day ) {
        leavePost(data);
      } else {
        alert("휴가가 부족합니다.");
      } 
    }
  }

  const $websocket = useRef(null);

  return (
    <div>
      <SockJsClient
        url="http://localhost:8080/webSocket"
        topics={['/topics/sendTo2']}
        onMessage={
            (msg) => {
              getUser();
            }
        }
        ref={$websocket} />
      <div type="primary" onClick={showDrawer}>
        {/* <Link to="/" style={{color:'currentcolor'}}>휴가 등록</Link> */}
        휴가 등록
      </div>
      <Drawer
        title="휴가 등록"
        width="40%"
        onClose={onClose}
        visible={state1.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form ref={formRef} layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="휴가 구분"
                rules={[{ required: true, message: '휴가 구분을 선택해주세요' }]}
              >
                <Select placeholder="휴가 구분을 선택해주세요">
                  <Option value="연차">연차</Option>
                  <Option value="오전 반차">오전 반차</Option>
                  <Option value="오후 반차">오후 반차</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="담당의사"
                rules={[{ required: true, message: '담당의사를 선택해주세요' }]}
              >
                <Select placeholder="담당의사를 선택해주세요">
                  {doctors.map((doctor) => (<Option key={doctor.id} value={doctor.id}>{doctor.name}</Option>))}
                  {/* {doctors.map((doctor)=>(<DoctorItem key={doctor.name} doctor={doctor} />))} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="user"
                label="대상"
              // rules={[{ required: true, message: 'Please choose the user' }]}
              >
                <Input placeholder="이름입니다." value={user.name} defaultValue={user.name} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Number_of_days"
                label="남은 휴가 일수"
              >
                {user.aleave}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="date"
                label="기간 선택"
                rules={[{ required: true, message: '기간을 입력해주세요' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="휴가 사유"
                rules={[
                  {
                    required: true,
                    message: '휴가 사유를 입력해주세요',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="휴가 사유를 입력해주세요" />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ display: "flex", textAlign: "right" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                등록
              </Button>
            </Form.Item>
            <Button onClick={onClose} style={{ marginLeft: "10px" }}>
              취소
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default _Drawer;