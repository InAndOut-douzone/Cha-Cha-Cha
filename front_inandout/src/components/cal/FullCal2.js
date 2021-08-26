import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Checkbox } from 'antd';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import axios from 'axios';
import EmployeeOnOffList from "../../pages/user/EmployeeOnOffList";
import styled from 'styled-components';

const FullCal2 = () => {

  const [leaves, setLeaves] = useState([]);
  const [내일정, 내일정체크] = useState(false);
  const [연차, 연차체크] = useState(false);
  const [출장, 출장체크] = useState(false);
  const [외근, 외근체크] = useState(false);

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
      } else if (출장 && 외근) {
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
      } else if (출장 && 외근) {
        fetch(23) // 연차, 출장
      } else if (내일정) {
        fetch(1) // 내일정
      } else if (연차) {
        fetch(2) // 연차
      } else if (외근) {
        fetch(3) // 출장
      } else {
        dd()
      }
    }
  }

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

  const eventClick = eventClick => {
    Alert.fire({
      id: eventClick.event.id,
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>이름</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>날짜</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `</strong></td>
      </tr>
      <tr >
      <td>번호</td>
      <td><strong>
      ` +
        eventClick.event.id +
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
        Alert.fire("삭제!", "삭제가 완료되었습니다.", "success");
      }
    });
  };

  const handleDateClick = eventClick => {
    Alert.fire({
      title: eventClick.event?.title,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "일정 등록",
      cancelButtonText: "닫기"
    }).then(result => {
      if (result.value) {
        // eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("아직", "구현 안함.", "fail");
      }
    });
  }

  let data = []; // 연차
  leaves.map((leave) => data.push({
    id: leave.no,
    title: leave.user.name + ' ' + leave.category,
    start: leave.fromDate,
    end: leave.toDate
  }))

  let data2 = []; // 일정
  leaves.map((leave) => data2.push({
    id: leave.no,
    title: leave.user.name + ' ' + leave.category,
    start: leave.fromDate,
    end: leave.toDate,
  }))


  const CalendarLayout = styled.div`
    .fc-next-button, .fc-prev-button, .fc-button-primary:disabled { background: white; color: black; border: 1px solid #d9d9d9 }, 
    .fc-col-header-cell-cushion { color: black; font-weight: 400; },
    .fc-daygrid-day-number { color: black; font-weight: 400; }   
  `;

  const eventColor = () => {
    "skyblue"
  }
 
  return (
    <CalendarLayout>
      <div className="animated fadeIn p-4 demo-app">
        <Row>
          <Col lg={9} sm={9} md={9}>
            <div className="demo-app-calendar" id="mycalendartest">
              <FullCalendar

                defaultView="dayGridMonth"

                eventColor="skyblue"

                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                dateClick={handleDateClick} // 날짜 클릭시 함수 실행
                eventClick={eventClick} // 이벤트 클릭시 함수 실행
                selectable={true}
                events={data} // 이벤트 데이터
              // calendarEvents={data}
              // events={data2} // 일정

<<<<<<< HEAD
              // ref={calendarComponentRef}
              // weekends={this.state.calendarWeekends}
              // eventDrop={this.drop}
              // drop={this.drop}
              // eventReceive={this.eventReceive}
              />
            </div>
          </Col>
          <Col lg={3} sm={3} md={3}>
            {/* <Checkbox defaultChecked onChange={onChange1}>내 일정</Checkbox><br /> */}
            <br /><br /><br />
            <div style={{ marginTop: "-7.5px", height: "40px", width:"200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock"}}>
            <Checkbox onChange={onChange1}>내 일정</Checkbox><br />   
            </div><br />
            <div style={{ height: "100px", width:"200px", border: "1px solid whitesmoke", padding: "10px", display: "inlineBlock"}}>
            <Checkbox style={{marginBottom:"5px"}} onChange={onChange2}>연차</Checkbox><br />
            <Checkbox style={{marginBottom:"5px"}} onChange={onChange3}>출장</Checkbox><br />
            <Checkbox style={{marginBottom:"5px"}} onChange={onChange4}>외근</Checkbox><br /><br /><br /><br />
            </div>
            <br/>
            <EmployeeOnOffList />
            {/* <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available"
              }}
            >
            </div> */}
          </Col>
        </Row>
      </div>
    </CalendarLayout>
=======
            // ref={calendarComponentRef}
            // weekends={this.state.calendarWeekends}
            // eventDrop={this.drop}
            // drop={this.drop}
            // eventReceive={this.eventReceive}
            />
          </div>
        </Col>
        <Col lg={3} sm={3} md={3}>
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
          {/* <div
            id="external-events"
            style={{
              padding: "10px",
              width: "80%",
              height: "auto",
              maxHeight: "-webkit-fill-available"
            }}
          >
          </div> */}
        </Col>
      </Row>
    </div>
>>>>>>> 25ac49edc70940ecee6828932a21ae4737b8b921
  );
}

export default FullCal2;