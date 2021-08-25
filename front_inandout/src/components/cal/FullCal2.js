import React, { Component, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import axios from 'axios';
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const FullCal2 = () => {

  const [leaves, setLeaves] = useState([]);

  // const events= () => [{
  //   title:"",
  //   date:""
  // }]



  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/leaves", header).then((res) => {
      // console.log(res);
      setLeaves(res.data);
      // JSON.stringify(res.data)
    });
  }, []);

  // {leaves.map((leave) => events.push("titl"))}

  // const event = leaves.map(leave => event.push(leave));

  // setLeaves(events)

  /**
   * when we click on event we are displaying event details
   */
  // const eventClick = eventClick => {
  //   Alert.fire({
  //     title: eventClick.event.title,
  //     html:
  //       `<div class="table-responsive">
  //     <table class="table">
  //     <tbody>
  //     <tr >
  //     <td>이름</td>
  //     <td><strong>` +
  //       eventClick.event.title +
  //       `</strong></td>
  //     </tr>
  //     <tr >
  //     <td>날짜</td>
  //     <td><strong>
  //     ` +
  //       eventClick.event.start +
  //       `
  //     </strong></td>
  //     </tr>
  //     </tbody>
  //     </table>
  //     </div>`,

  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "삭제",
  //     cancelButtonText: "닫기"
  //   }).then(result => {
  //     if (result.value) {
  //       eventClick.event.remove(); // It will remove event from the calendar
  //       Alert.fire("Deleted!", "Your Event has been deleted.", "success");
  //     }
  //   });
  // };

  // const handleDateClick = eventClick => {
  //   Alert.fire({
  //     title: eventClick.event?.title,
  //     html:
  //       `<div class="table-responsive">
  //       <table class="table">
  //       <tbody>
  //       <tr >
  //       <td>이름</td>
  //       <td><strong>` +
  //       eventClick.event?.title +
  //       `</strong></td>
  //       </tr>
  //       <tr >
  //       <td>날짜</td>
  //       <td><strong>
  //       ` +
  //       eventClick.event?.start +
  //       `
  //       </strong></td>
  //       </tr>
  //       </tbody>
  //       </table>
  //       </div>`,

  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "일정 등록",
  //     cancelButtonText: "닫기"
  //   }).then(result => {
  //     if (result.value) {
  //       eventClick.event.remove(); // It will remove event from the calendar
  //       Alert.fire("Deleted!", "Your Event has been deleted.", "success");
  //     }
  //   });
  // }

  let data = [];

      leaves.map((leave) => data.push({
                    title: leave.category,
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
              // dateClick={handleDateClick}
              rerenderDelay={10}
              eventDurationEditable={false}
              editable={true}
              droppable={true}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              // ref={calendarComponentRef}
              // weekends={this.state.calendarWeekends}
              // events={this.state.calendarEvents}
              events={data}
                // [
                  // leaves.map((leave) => ({
                  //   title: leave.category, date: leave.fromdate
                  // })
                  // {title : leaves.map(leave => leave.category), date: '2021-08-19' },
                  //   { title: leaves[0].category, start: leaves[0].fromDate, end: leaves[0].toDate },
                  // { title: leaves[1].category, start: leaves[1].fromDate, end: leaves[1].toDate },
                  // { title: leaves[2].category, start: leaves[2].fromDate, end: leaves[2].toDate },
                  // { title: '이재성 휴가', date: '2021-08-12' },
                  // { title: '김정현 휴가', date: '2021-08-12' },
                  // { title: '김정현 휴가', date: '2021-08-17' },
                  // { title: '김정인 휴가', date: '2021-08-17' },
                  // { title: leaves.events.category, date: '2021-08-25' }
                // ]}
              // eventDrop={this.drop}
              // drop={this.drop}
              // eventReceive={this.eventReceive}
              // eventClick={eventClick}
              selectable={true}
            />
          </div>
        </Col>
        <Col lg={3} sm={3} md={3}>
          <div
            id="external-events"
            style={{
              padding: "10px",
              width: "80%",
              height: "auto",
              maxHeight: "-webkit-fill-available"
            }}
          >
            {/* {leaves.map((leave) => (<div>{leave.category}</div>))} */}
            {/* {leaves.no} <br />
            {leaves.category} <br />
            {leaves.content} <br />
            {leaves.fromDate} <br />
            {leaves.state} <br />
            {leaves.toDate} <br />
            {leaves.userId} <br />
            {leaves.fromUserId} <br /> */}
            {/* <p align="center">
                <strong> Events</strong>
              </p> */}
            {/* {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))} */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FullCal2;