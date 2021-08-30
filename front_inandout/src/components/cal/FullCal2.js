import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Checkbox, Drawer, Input, Select, Form, Button, DatePicker, Modal } from 'antd';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import axios from 'axios';
import EmployeeOnOffList from "../../pages/user/EmployeeOnOffList";
import styled from 'styled-components';
import moment from 'moment';

// 
const { Option } = Select;
const { RangePicker } = DatePicker;
// 

const FullCal2 = () => {

  const [leaves, setLeaves] = useState([]);
  const [내일정, 내일정체크] = useState(false);
  const [연차, 연차체크] = useState(false);
  const [출장, 출장체크] = useState(false);
  const [외근, 외근체크] = useState(false);

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/leaves", header).then((res) => {
      console.log(res);
      setLeaves(res.data);
    });
  }, []);

  // 
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [no1, setNo1] = useState();
  const [category1, setCategory1] = useState();
  const [content1, setContent1] = useState();
  const [fromDate1, setFromDate1] = useState();
  const [toDate1, setToDate1] = useState();
  const [user, setUser] = useState({});
  const handleDateClick = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleDateClick2 = (eventClick) => {
    setNo1(eventClick.event.id);
    setCategory1(eventClick.event.extendedProps.category);
    setContent1(eventClick.event.extendedProps.content);
    setFromDate1(eventClick.event.start);
    setToDate1(eventClick.event.end);
    console.log(eventClick.event)
    console.log(eventClick.event.id);
    console.log(eventClick.event.extendedProps.category)
    console.log(eventClick.event.extendedProps.content)
    console.log(eventClick.event.start)
    setVisible2(true);
  };
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
  }, [])
  const onFinish = (value) => { // 일정 등록
    let data3 = {
      category: value.category,
      content: value.content,
      toDate: value.date[1],
      fromDate: value.date[0],
      state: "success",
      fromUser: 1 // 일단 1번 으로 해놓음
    }
    axios.post("http://localhost:8080/api/leave", data3, header).then(res => {
      alert("일정 등록이 완료되었습니다.");
      window.location.replace("/")
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
      window.location.replace("/")
    })
  }
  const onDelete = async (value) => { // 일정 삭제
    await axios.delete("http://localhost:8080/api/leaves/" + no1, header).then((res) => {
      alert("일정 삭제가 완료되었습니다.");
      window.location.replace("/")
    });
  }
  // 

  const fetch = (no) => {
    axios.get("http://localhost:8080/api/leaves/" + no, header).then((res) => {
      console.log(res);
      setLeaves(res.data);
    });
  }

  const dd = () => {
    axios.get("http://localhost:8080/api/leaves", header).then((res) => {
      console.log(res);
      setLeaves(res.data);
    });
  }

  function onChange1(e) {
    내일정체크(!내일정);
    if (e.target.checked) {
      if (연차 && 출장 && 외근) {
        fetch(1234) // 내일정, 연차, 출장, 외근
      } else if (연차 && 출장) {
        fetch(123) // 내일정, 연차, 출장
      } else if (연차 && 외근) {
        fetch(124) // 내일정, 연차, 외근
      } else if (출장 && 외근) {
        fetch(134) // 내일정, 출장, 외근
      } else if (연차) {
        fetch(12) // 내일정, 연차
      } else if (출장) {
        fetch(13) // 내일정, 출장
      } else if (외근) {
        fetch(14) // 내일정, 외근
      } else {
        fetch(1) // 내일정
      }
    } else {
      if (연차 && 출장 && 외근) {
        fetch(234) // 연차, 출장, 외근
      } else if (연차 && 출장) {
        fetch(23) // 연차, 출장
      } else if (연차 && 외근) {
        fetch(24) // 연차, 외근
      } else if (출장 && 외근) {
        fetch(34) // 출장, 외근
      } else if (연차) {
        fetch(2) // 연차
      } else if (출장) {
        fetch(3) // 출장
      } else if (외근) {
        fetch(4) // 외근
      } else {
        dd()
      }
    }
  }

  function onChange2(e) {
    연차체크(!연차);
    if (e.target.checked) {
      if (내일정 && 출장 && 외근) {
        fetch(1234) // 내일정, 연차, 출장, 외근
      } else if (내일정 && 출장) {
        fetch(123) // 내일정, 연차, 출장
      } else if (내일정 && 외근) {
        fetch(124) // 내일정, 연차, 외근
      } else if (출장 && 외근) {
        fetch(234) // 내일정, 출장, 외근
      } else if (내일정) {
        fetch(12) // 내일정, 연차
      } else if (출장) {
        fetch(23) // 연차, 출장
      } else if (외근) {
        fetch(24) // 연차, 외근
      } else {
        fetch(2) // 연차
      }
    } else {
      if (내일정 && 출장 && 외근) {
        fetch(134) // 내일정, 출장, 외근
      } else if (내일정 && 출장) {
        fetch(13) // 내일정, 출장
      } else if (내일정 && 외근) {
        fetch(14) // 내일정, 외근
      } else if (출장 && 외근) {
        fetch(34) // 내일정, 출장, 외근
      } else if (내일정) {
        fetch(1) // 내일정
      } else if (출장) {
        fetch(3) // 출장
      } else if (외근) {
        fetch(4) // 외근
      } else {
        dd()
      }
    }
  }

  function onChange3(e) {
    출장체크(!출장);
    if (e.target.checked) {
      if (내일정 && 연차 && 외근) {
        fetch(1234) // 내일정, 연차, 출장, 외근
      } else if (내일정 && 연차) {
        fetch(123) // 내일정, 연차, 출장
      } else if (내일정 && 외근) {
        fetch(134) // 내일정, 출장, 외근
      } else if (연차 && 외근) {
        fetch(234) // 연차, 출장, 외근
      } else if (내일정) {
        fetch(13) // 내일정, 출장
      } else if (연차) {
        fetch(23) // 연차, 출장
      } else if (외근) {
        fetch(34) // 출장, 외근
      } else {
        fetch(3) // 출장
      }
    } else {
      if (내일정 && 연차 && 외근) {
        fetch(124) // 내일정, 연차, 외근
      } else if (내일정 && 연차) {
        fetch(12) // 내일정, 연차 
      } else if (내일정 && 외근) {
        fetch(14) // 내일정, 외근
      } else if (연차 && 외근) {
        fetch(24) // 연차, 외근
      } else if (내일정) {
        fetch(1) // 내일정
      } else if (연차) {
        fetch(2) // 연차
      } else if (외근) {
        fetch(4) // 외근
      } else {
        dd()
      }
    }
  }
  function onChange4(e) {
    외근체크(!외근);
    if (e.target.checked) {
      if (내일정 && 연차 && 출장) {
        fetch(1234) // 내일정, 연차, 출장, 외근
      } else if (내일정 && 연차) {
        fetch(124) // 내일정, 연차, 외근
      } else if (내일정 && 출장) {
        fetch(134) // 내일정, 출장, 외근
      } else if (연차 && 출장) {
        fetch(234) // 연차, 출장, 외근
      } else if (내일정) {
        fetch(14) // 내일정, 외근
      } else if (연차) {
        fetch(24) // 연차, 외근
      } else if (출장) {
        fetch(34) // 출장, 외근
      } else {
        fetch(4) // 외근
      }
    } else {
      if (내일정 && 연차 && 출장) {
        fetch(123) // 내일정, 연차, 출장
      } else if (내일정 && 연차) {
        fetch(12) // 내일정, 연차
      } else if (내일정 && 출장) {
        fetch(13) // 내일정, 출장
      } else if (연차 && 출장) {
        fetch(23) // 연차, 출장
      } else if (내일정) {
        fetch(1) // 내일정
      } else if (연차) {
        fetch(2) // 연차
      } else if (출장) {
        fetch(3) // 출장
      } else {
        dd()
      }
    }
  }

  const eventClick = eventClick => {
    Alert.fire({
      id: eventClick.event.id,
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>제목</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>시작</td>
      <td><strong>
      ` +
        moment(eventClick.event.start, "YYYY.MM.DD").format("YYYY-MM-DD") +
        // eventClick.event.start +
        `</strong></td>
      </tr>
      <tr >
      <td>종료</td>
      <td><strong>
      ` +
        moment(eventClick.event.end, "YYYY.MM.DD").format("YYYY-MM-DD") +
        `</strong></td>
      </tr>
      <tr >
      <td>내용</td>
      <td><strong>
      ` +
        eventClick.event.extendedProps.content +
        `</strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "닫기"
    }).then(result => {
      if (result.value) {
        //   let leaves = { // 수정
        //     headers: { "Content-Type": "application/json; charset=utf-8" },
        //     fromDate: ,
        //     toDate: ,
        // };

        axios.delete("http://localhost:8080/api/leaves/" + eventClick.event.id, header).then((res) => {
          console.log(res)
          console.log(res.data)
        });

        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("삭제!", "삭제가   완료되었습니다.", "success");
      }
    });
  };

  let data = []; // 연차
  leaves.map((leave) => data.push({
    id: leave.no,
    title: '[' + leave.user.name + '] ' + leave.category,
    color: leave.category === "연차" ? "skyblue" :
      leave.category === "오후 반차" ? "#ff9aa3" :
        leave.category === "오전 반차" ? "lightgrey" :
          leave.category === "출장" ? "yellowgreen" : "gold",
    // textColor: leave.category === "출장" ? "blue" : "red",
    start: leave.fromDate,
    end: leave.toDate,
    category: leave.category,
    content: leave.content,

  }))

  console.log(data);

  const CalendarLayout = styled.div`
    .fc-next-button, .fc-prev-button, .fc-button-primary:disabled { background: white; color: black; border: 1px solid #d9d9d9 }, 
    .fc-col-header-cell-cushion { color: black; font-weight: 400; },
    .fc-daygrid-day-number { color: black; font-weight: 400; }
  `;

  return (
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={10} sm={10} md={10}>
          <CalendarLayout>
            <div className="demo-app-calendar" id="mycalendartest">
              <CalendarLayout>
                <FullCalendar
                  defaultView="dayGridMonth"

                  // eventColor="skyblue"

                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                  }}
                  locale='ko'
                  dayMaxEvents={true} // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
                  rerenderDelay={10}
                  eventDurationEditable={false}
                  editable={true}
                  droppable={true}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  dateClick={handleDateClick} // 날짜 클릭시 함수 실행
                  // eventClick={eventClick} // 이벤트 클릭시 함수 실행
                  eventClick={handleDateClick2} // 이벤트 클릭시 함수 실행
                  selectable={true}
                  events={data} // 이벤트 데이터
                // calendarEvents={data}
                // events={data2} // 일정

                // ref={calendarComponentRef}
                // weekends={this.state.calendarWeekends}
                // eventDrop={this.drop}
                // drop={this.drop}
                // eventReceive={this.eventReceive}
                />
              </CalendarLayout>
            </div>
          </CalendarLayout>
        </Col>
        <Col lg={2} sm={2} md={2}>
          {/* <Checkbox defaultChecked onChange={onChange1}>내 일정</Checkbox><br /> */}
          <br /><br /><br />
          <div style={{ marginTop: "-7.5px", height: "40px", width: "200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock" }}>
            <Checkbox onChange={onChange1}>내 일정</Checkbox><br />
          </div><br />
          <div style={{ height: "100px", width: "200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock" }}>
            <Checkbox style={{ marginBottom: "5px" }} onChange={onChange2}>연차</Checkbox><br />
            <Checkbox style={{ marginBottom: "5px" }} onChange={onChange3}>출장</Checkbox><br />
            <Checkbox style={{ marginBottom: "5px" }} onChange={onChange4}>외근</Checkbox><br /><br /><br /><br />
          </div>
          <br />
          <EmployeeOnOffList />

          <Drawer
            title="일정 등록"
            width="40%"
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
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
                      showTime={{ format: 'HH' }}
                      format="YYYY-MM-DD HH"
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
                      showTime={{ format: 'HH' }}
                      format="YYYY-MM-DD HH"
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

                  {/*  */}
                  <Form.Item>

                  </Form.Item>
                  {/*  */}

                </Col>
              </Row>
              <div style={{ display: "flex", textAlign: "right" }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    등록
                  </Button>
                </Form.Item>
                <Button onClick={onDelete} style={{ marginLeft: "10px" }}>
                  삭제
                </Button>
                <Button onClick={onClose2} style={{ marginLeft: "10px" }}>
                  취소
                </Button>
              </div>
            </Form>
          </Drawer>






        </Col>
      </Row>
    </div>
  );
}

export default FullCal2;