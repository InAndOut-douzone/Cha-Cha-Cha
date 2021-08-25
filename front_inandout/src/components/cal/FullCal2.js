import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import axios from 'axios';

const FullCal2 = () => {

  const [leaves, setLeaves] = useState([]);

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
      no: eventClick.event.no,
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
        eventClick.event.no +
        `
      </strong></td>
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

      axios.delete("http://localhost:8080/api/leaves", leaves, header).then((res) => {
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

  let data = [];
  leaves.map((leave) => data.push({
    no: leave.no,
    title: leave.user.name + ' ' + leave.category,
    start: leave.fromDate,
    end: leave.toDate
  }))

  return (
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={9} sm={9} md={9}>
          <div className="demo-app-calendar" id="mycalendartest">
            <FullCalendar
              defaultView="dayGridMonth"
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

              // ref={calendarComponentRef}
              // weekends={this.state.calendarWeekends}
              // events={this.state.calendarEvents}
              // eventDrop={this.drop}
              // drop={this.drop}
              // eventReceive={this.eventReceive}
            />
          </div>
        </Col>
        {/* <Col lg={3} sm={3} md={3}>
          <div
            id="external-events"
            style={{
              padding: "10px",
              width: "80%",
              height: "auto",
              maxHeight: "-webkit-fill-available"
            }}
          >
          </div>
        </Col> */}
      </Row>
    </div>
  );
}

export default FullCal2;