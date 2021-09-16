/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "reactstrap";
import { Checkbox, Drawer, Input, Select, Form, Button, DatePicker, Badge } from 'antd';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import EmployeeOnOffList from "../../pages/user/EmployeeOnOffList";
import styled from 'styled-components';
import moment from 'moment';
import Fade from 'react-reveal/Fade';
import SockJsClient from 'react-stomp';
import '../../assets/css/placeholder.css'

const { Option } = Select;
const { RangePicker } = DatePicker;

const CalendarLayout = styled.div`
    .fc-next-button, .fc-prev-button, .fc-button-primary:disabled { background: white; color: black; border: 1px solid #d9d9d9 }, 
    .fc-col-header-cell-cushion { color: black; font-weight: 400; },
    .fc-daygrid-day-number { color: black; font-weight: 400; },
    `;
const CalendarLayout2 = styled.div`
    .fc-toolbar-chunk {display: flex; align-items: center;}
    // .fc-event-title {color:red;}
  `;

const FullCal2 = () => {
  const formRef = useRef(null);
  const [leaves, setLeaves] = useState([]);
  const [내일정, 내일정체크] = useState(false);
  const [연차, 연차체크] = useState(false);
  const [출장, 출장체크] = useState(false);
  const [외근, 외근체크] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [no1, setNo1] = useState();
  const [category1, setCategory1] = useState();
  const [content1, setContent1] = useState();
  const [fromDate1, setFromDate1] = useState();
  const [toDate1, setToDate1] = useState();
  const [user, setUser] = useState({});
  const [userId1, setUserId1] = useState({});
  const [username, setUsername] = useState();
  const [userRole, setUserRole] = useState();
  const [startDate, setStartDate] = useState();
  const [holidays, setHolidays] = useState();

  const header = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/leaves", header).then((res) => {
      setLeaves(res.data);
    });
  }, []);

  const handleDateClick = (eventClick) => {
    setStartDate(eventClick.dateStr)
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    formRef.current.setFieldsValue({
      category: "",
      content: "",
      date: "",
    });
  };

  const handleDateClick2 = (eventClick) => {
    console.log(eventClick)
    setNo1(eventClick.event.id);
    setUserId1(eventClick.event.extendedProps.userId);
    setCategory1(eventClick.event.extendedProps.category);
    setContent1(eventClick.event.extendedProps.content);
    setFromDate1(eventClick.event.start);
    setToDate1(eventClick.event.end);
    setUsername(eventClick.event.extendedProps.username);
    setUserRole(eventClick.event.extendedProps.roles)
    setVisible2(true);
  };


  const 드래그 = async (eventClick) => {
    console.log(eventClick.event)
    // console.log(eventClick.event.id)
    console.log(eventClick.event.start)
    console.log(eventClick.event.end)
    let data3 = {
      id: eventClick.event.id, // 수정할 이벤트 번호
      category: eventClick.event.extendedProps.category,
      content: eventClick.event.extendedProps.content,
      fromDate: eventClick.event.start,
      roles: eventClick.event.extendedProps.roles,
      toDate: eventClick.event.extendedProps.category === "연차" ? moment(eventClick.event.end).add(-1, 'd').toDate() : eventClick.event.end,
    }

    eventClick.event.end !== null ?
      eventClick.event.extendedProps.roles !== 'ROLE_ADMIN' ?
        await axios.put("http://localhost:8080/api/leave", data3, header).then(res => {
          eventClick.event.extendedProps.category === "연차" ?
            alert(`일정 수정 : ${moment(eventClick.event.start).format("YYYY-MM-DD")} ~ ${moment(eventClick.event.end).add(-1, 'd').format("YYYY-MM-DD")}`)
            : alert(`일정 수정 : ${moment(eventClick.event.start).format("YYYY-MM-DD")} ~ ${moment(eventClick.event.end).format("YYYY-MM-DD")}`)
        })
        :
        eventClick.event.extendedProps.userId === user.id ?
          await axios.put("http://localhost:8080/api/leave", data3, header).then(res => {
            eventClick.event.extendedProps.category === "연차" ?
              alert(`일정 수정 : ${moment(eventClick.event.start).format("YYYY-MM-DD")} ~ ${moment(eventClick.event.end).add(-1, 'd').format("YYYY-MM-DD")}`)
              : alert(`일정 수정 : ${moment(eventClick.event.start).format("YYYY-MM-DD")} ~ ${moment(eventClick.event.end).format("YYYY-MM-DD")}`)
          })
          :
          alert('일정 수정 권한이 없습니다.')
      :
      await axios.put("http://localhost:8080/api/leave", data3, header).then(res => {
        alert(`일정 수정 : ${moment(eventClick.event.start).format("YYYY-MM-DD")}`);
      })
    check(내일정, 연차, 출장, 외근);
  };

  // 현재 달력 옵션 클릭 상태를 유지하면서 달력 데이터 초기화
  const check = (a, b, c, d) => {
    if (a === true) {
      a = 1;
    } else { a = "" };
    if (b === true) {
      b = 2;
    } else { b = "" };
    if (c === true) {
      c = 3;
    } else { c = "" };
    if (d === true) {
      d = 4
    } else { d = "" };

    fetch(a + b + c + d);
  }

  const onClose2 = () => {
    setVisible2(false);
  };
  const getUser = () => {
    axios.get("http://localhost:8080/api/user", header).then(res => {
      setUser(res.data);
    }).catch();
  }
  useEffect(() => {
    getUser();
    holidayFetch();
  }, [])


  const holidayFetch = async () => {
    await axios.get("http://localhost:8080/api/holiday/", header).then(res => {
      setHolidays(res.data);
    }).catch();
  }

  const onFinish = (value) => { // 일정 등록
    let data3 = {
      category: value.category,
      content: value.content,
      toDate: value.date[1],
      fromDate: value.date[0],
      state: "success",
      fromUser: 2 // 일단 1번 으로 해놓음
    }
    axios.post("http://localhost:8080/api/leave2", data3, header).then(res => {
      alert("일정 등록이 완료되었습니다.");
      formRef.current.setFieldsValue({
        category: "",
        content: "",
        date: "",
      });
      check(내일정, 연차, 출장, 외근)
      setVisible(0)
    }).catch();
  }
  const onUpdate = async (value) => { // 일정 수정
    let data3 = {
      id: no1, // 수정할 이벤트 번호
      category: value.category,
      content: value.content,
      toDate: value.date[1],
      fromDate: value.date[0],
    }

    await axios.put("http://localhost:8080/api/leave", data3, header).then(res => {
      alert("일정 수정이 완료되었습니다.");
      check(내일정, 연차, 출장, 외근)
      setVisible2(0)
    })
  }
  const onDelete = async (value) => { // 일정 삭제
    let ch = window.confirm("정말 삭제하시겠습니까?");
    if (ch) {
      await axios.delete("http://localhost:8080/api/leaves/" + no1, header).then((res) => {
        alert("일정 삭제가 완료되었습니다.");
        check(내일정, 연차, 출장, 외근)
        setVisible2(0)
      });
    } else {
      alert("일정 삭제가 취소되었습니다.");
    }
  }

  const fetch = (no) => {
    axios.get("http://localhost:8080/api/leaves/" + no, header).then((res) => {
      setLeaves(res.data);
    });
  }

  const dd = () => {
    axios.get("http://localhost:8080/api/leaves", header).then((res) => {
      setLeaves(res.data);
    });
  }

  const 체크박스 = (a, b, c, d) => {
    if (a && b && c && d) dd()
    else if (a && b && c) fetch(123)
    else if (a && b && d) fetch(124)
    else if (a && c && d) fetch(134)
    else if (b && c && d) fetch(234)
    else if (a && b) fetch(12)
    else if (a && c) fetch(13)
    else if (a && d) fetch(14)
    else if (b && c) fetch(23)
    else if (b && d) fetch(24)
    else if (c && d) fetch(34)
    else if (a) fetch(1)
    else if (b) fetch(2)
    else if (c) fetch(3)
    else if (d) fetch(4)
    else dd()
  }

  function onChange1(e) {
    내일정체크(!내일정);
    체크박스(e.target.checked, 연차, 출장, 외근);
  }

  function onChange2(e) {
    연차체크(!연차);
    체크박스(내일정, e.target.checked, 출장, 외근);
  }

  function onChange3(e) {
    출장체크(!출장);
    체크박스(내일정, 연차, e.target.checked, 외근);
  }

  function onChange4(e) {
    외근체크(!외근);
    체크박스(내일정, 연차, 출장, e.target.checked);
  }

  function asd(e) {
    setCategory1(e.target.value);
  }

  let data = []; // 연차
  leaves.map((leave) => data.push({
    username: leave.user.name,
    userId: leave.user.id,
    roles: leave.user.roles,
    id: leave.no,
    title: '[' + leave.user.name + '] ' + leave.category,
    color: leave.category === "연차" ? "skyblue" :
      leave.category === "오후 반차" ? "#ff9aa3" :
        leave.category === "오전 반차" ? "lightgrey" :
          leave.category === "출장" ? "yellowgreen" : "gold",

    start: leave.fromDate,
    // end: leave.toDate,
    end: leave.category === "연차" ? moment(leave.toDate).add(1, 'd').toDate() : leave.toDate,
    category: leave.category,
    content: leave.content,
    allDay: leave.category === "연차" ? 1 : leave.category === "오후 반차" ? 1 : leave.category === "오전 반차" ? 1 : 0
  }))

  holidays && holidays.map((holiday) => data.push({
    userId: holiday.id,
    title: holiday.content,
    color: "white",
    // color:"red",
    start: holiday.holiday,
    allDay: 1,
    display: "background",
  }))

  const $websocket = useRef(null);

  return (
    <div className="animated fadeIn p-4 demo-app">
      <SockJsClient
        url="http://localhost:8080/webSocket"
        topics={['/topics/sendTo2']}
        // onMessage={msg => { setCount(count + 1) }}
        onMessage={
          (msg) => {
            check(내일정, 연차, 출장, 외근);
          }
        }
        ref={$websocket} />
      <Row>
        <Col lg={10} sm={10} md={10}>
          <CalendarLayout>
            <div className="demo-app-calendar" id="mycalendartest">
              <CalendarLayout2>
                <Fade bottom>
                  {user.roles === 'ROLE_ADMIN' ?
                    <FullCalendar
                      // defaultView="dayGridMonth"
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                      height="750px"
                      locale='ko'
                      headerToolbar={{
                        right: "today",
                        // center: "prevYear prev title next nextYear",
                        center: "prev title next",
                        left: "dayGridMonth,timeGridWeek,listWeek"
                      }}
                      buttonText={{
                        today: '오늘',
                        month: '월',
                        week: '주',
                        day: '일',
                        list: '목록'
                      }}
                      dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                      rerenderDelay={10}
                      eventDurationEditable={false}
                      editable={true}
                      dateClick={handleDateClick} // 날짜 클릭시 함수 실행
                      eventClick={handleDateClick2} // 이벤트 클릭시 함수 실행
                      selectable={true}
                      events={data} // 이벤트 데이터
                      droppable={true}
                      eventDrop={드래그}
                      drop={드래그}
                    />
                    :
                    <FullCalendar
                      // defaultView="dayGridMonth"
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                      height="750px"
                      locale='ko'
                      headerToolbar={{
                        right: "today",
                        // center: "prevYear prev title next nextYear",
                        center: "prev title next",
                        left: "dayGridMonth,timeGridWeek,listWeek"
                      }}
                      buttonText={{
                        today: '오늘',
                        month: '월',
                        week: '주',
                        day: '일',
                        list: '목록'
                      }}
                      dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                      rerenderDelay={10}
                      eventDurationEditable={false}
                      editable={false} // 드래그 비활성화
                      dateClick={handleDateClick} // 날짜 클릭시 함수 실행
                      eventClick={handleDateClick2} // 이벤트 클릭시 함수 실행
                      selectable={true}
                      events={data} // 이벤트 데이터
                    />}
                </Fade>
              </CalendarLayout2>
            </div>
          </CalendarLayout>
        </Col>
        <Col lg={2} sm={2} md={2}>
          {/* <Checkbox defaultChecked onChange={onChange1}>내 일정</Checkbox><br /> */}
          <br /><br /><br />

          <Fade right>
            <div style={{ marginTop: "-7.5px", height: "40px", width: "200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock" }}>
              <Checkbox onChange={onChange1}>내 일정</Checkbox><br />
            </div><br />
            <div style={{ height: "100px", width: "200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock" }}>
              <Checkbox style={{ marginBottom: "5px" }} onChange={onChange2}>연차</Checkbox><Badge color="skyblue" /><Badge color="#d3d3d3" /><Badge color="#ff9aa3" /><br />
              <Checkbox style={{ marginBottom: "5px" }} onChange={onChange3}>출장</Checkbox><Badge color="#9acd32" /><br />
              <Checkbox style={{ marginBottom: "5px" }} onChange={onChange4}>외근</Checkbox><Badge color="gold" /><br /><br /><br /><br />
            </div>
          </Fade>
          <br />
          <Fade right>
            <EmployeeOnOffList />
          </Fade>




          <Drawer
            title="일정 등록"
            width="40%"
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <Form ref={formRef} layout="vertical" hideRequiredMark onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label="일정 구분"
                    rules={[{ required: true, message: '일정 구분을 선택해주세요' }]}
                  >
                    <Select placeholder="일정 구분을 선택해주세요">
                      <Option value="출장">출장</Option>
                      <Option value="외근">외근</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="user"
                    label="대상"
                  // rules={[{ required: true, message: 'Please choose the user' }]}
                  >

                    <Input placeholder="이름입니다." value={user.name} defaultValue={user.name} readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="date"
                    label="일시"
                  >
                    <RangePicker
                      // defaultValue={[
                      //   moment(startDate, "YYYY-MM-DD HH mm"),
                      //   moment("2022-01-01", "YYYY-MM-DD HH mm")
                      // ]}
                      placeholder={[startDate, null]}
                      showTime={{ format: 'HH mm' }}
                      format="YYYY-MM-DD HH mm"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="content"
                    label="일정 내용"
                    rules={[
                      {
                        required: true,
                        message: '일정 내용을 입력해주세요',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="일정 내용을 입력해주세요" />
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

          <Drawer
            title="일정 관리"
            width="40%"
            onClose={onClose2}
            visible={visible2}
            bodyStyle={{ paddingBottom: 80 }}
          >

            <Form layout="vertical" hideRequiredMark onFinish={onUpdate}>


              <Form.Item>
                {user.roles === 'ROLE_ADMIN' && userRole !== 'ROLE_ADMIN' ? // 이벤트 주인 (userRole)
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="category"
                          label="일정 구분"

                          rules={[{ required: true, message: '일정 구분을 선택해주세요' }]}
                        >
                          <Select value={category1} placeholder={category1}>
                            <Option value="출장">출장</Option>
                            <Option value="외근">외근</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="user"
                          label="대상"
                        // rules={[{ required: true, message: 'Please choose the user' }]}
                        >
                          <Input placeholder={username} value={username} initialvalues={username} readOnly />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="date"
                          label="일시"
                        >
                          <RangePicker
                            showTime={{ format: 'HH mm' }}
                            format="YYYY-MM-DD HH mm"
                            placeholder={[moment(fromDate1).format("YYYY-MM-DD HH"), moment(toDate1).format("YYYY-MM-DD HH")]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="content"
                          label="일정 내용"
                          rules={[
                            {
                              required: true,
                              message: '일정 내용을 입력해주세요',
                            },
                          ]}
                        >
                          {/* <Input.TextArea value={content1} rows={4} placeholder="일정 내용을 입력해주세요" /> */}
                          <Input.TextArea rows={4} placeholder={content1} ></Input.TextArea>
                        </Form.Item>

                      </Col>  
                    </Row>
                    <div style={{ textAlign: "right" }}>
                      <Button type="primary" htmlType="submit">
                        수정
                      </Button>
                      <Button onClick={onDelete} style={{ marginLeft: "10px" }}>
                        삭제
                      </Button>
                    </div>
                  </>
                  : userId1 === user.id && category1 !== '연차' && category1 !== '오전 반차' && category1 !== '오후 반차' ?
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="category"
                            label="일정 구분"

                            rules={[{ required: true, message: '일정 구분을 선택해주세요' }]}
                          >
                            <Select value={category1} placeholder={category1}>
                              <Option value="출장">출장</Option>
                              <Option value="외근">외근</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="user"
                            label="대상"
                          // rules={[{ required: true, message: 'Please choose the user' }]}
                          >
                            <Input placeholder={username} value={username} initialvalues={username} readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="date"
                            label="일시"
                          >
                            <RangePicker
                              showTime={{ format: 'HH mm' }}
                              format="YYYY-MM-DD HH mm"
                              placeholder={[moment(fromDate1).format("YYYY-MM-DD HH"), moment(toDate1).format("YYYY-MM-DD HH")]}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="content"
                            label="일정 내용"
                            rules={[
                              {
                                required: true,
                                message: '일정 내용을 입력해주세요',
                              },
                            ]}
                          >
                            {/* <Input.TextArea value={content1} rows={4} placeholder="일정 내용을 입력해주세요" /> */}
                            <Input.TextArea rows={4} placeholder={content1} ></Input.TextArea>
                          </Form.Item>

                        </Col>
                      </Row>
                      <div style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">
                          수정
                        </Button>
                        <Button onClick={onDelete} style={{ marginLeft: "10px" }}>
                          삭제
                        </Button>
                      </div>
                    </> : <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="category"
                            label="일정 구분"

                            rules={[{ required: true, message: '일정 구분을 선택해주세요' }]}
                          >
                            <Input placeholder={category1} value={category1} initialvalues={category1} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="user"
                            label="대상"
                          // rules={[{ required: true, message: 'Please choose the user' }]}
                          >
                            <Input placeholder={username} value={username} initialvalues={username} readOnly />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="date"
                            label="일시"
                          >
                            <RangePicker
                              disabled
                              showTime={{ format: 'HH mm' }}
                              format="YYYY-MM-DD HH mm"
                              placeholder={[moment(fromDate1).format("YYYY-MM-DD HH"), moment(toDate1).format("YYYY-MM-DD HH")]}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="content"
                            label="일정 내용"
                            rules={[
                              {
                                required: true,
                                message: '일정 내용을 입력해주세요',
                              },
                            ]}
                          >
                            {/* <Input.TextArea value={content1} rows={4} placeholder="일정 내용을 입력해주세요" /> */}
                            <Input.TextArea readOnly rows={4} placeholder={content1} ></Input.TextArea>
                          </Form.Item>

                        </Col>
                      </Row>
                    </>
                }
              </Form.Item>
            </Form>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
}

export default FullCal2;