import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default class FullCal2 extends Component {
  state = {
    calendarEvents: [
      {
        title: "이재성 휴가",
        start: new Date("2021-08-01 00:00"),
        id: "1"
      },
      {
        title: "김정현 휴가",
        start: new Date("2021-08-03 00:00"),
        id: "2"
      },
      {
        title: " 김정인휴가",
        start: new Date("2021-08-11 00:00"),
        id: "3"
      },
      {
        title: "안대혁 휴가",
        start: new Date("2021-08-12 00:00"),
        id: "4"
      },
      {
        title: "이재성 출장",
        start: new Date("2021-08-20 00:00"),
        id: "5"
      },
      {
        title: "안대혁 출장",
        start: new Date("2021-08-28 00:00"),
        id: "6"
      }
    ],
    events: [
      { title: "이재성 휴가", id: "1" },
      { title: "이재성 출장", id: "2" },
      { title: "김정현 휴가", id: "3" },
      { title: "김정현 출장", id: "4" },
      { title: "김정인 휴가", id: "5" },
      { title: "김정인 출장", id: "6" },
    //   { title: '이재성 휴가', date: '2021-08-01' },
    //   { title: '이재성 휴가', date: '2021-08-12' },
    //   { title: '김정현 휴가', date: '2021-08-12' },
    //   { title: '김정현 휴가', date: '2021-08-17' },
    //   { title: '김정인 휴가', date: '2021-08-17' },
    //   { title: '김정인 휴가', date: '2021-08-25' }
    ]
  };

  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

  /**
   * when we click on event we are displaying event details
   */
  eventClick = eventClick => {
    Alert.fire({
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
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  handleDateClick = eventClick => {
    Alert.fire({
        title: eventClick.event?.title,
        html:
          `<div class="table-responsive">
        <table class="table">
        <tbody>
        <tr >
        <td>이름</td>
        <td><strong>` +
          eventClick.event?.title +
          `</strong></td>
        </tr>
        <tr >
        <td>날짜</td>
        <td><strong>
        ` +
          eventClick.event?.start +
          `
        </strong></td>
        </tr>
        </tbody>
        </table>
        </div>`,
  
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "일정 등록",
        cancelButtonText: "닫기"
      }).then(result => {
        if (result.value) {
          eventClick.event.remove(); // It will remove event from the calendar
          Alert.fire("Deleted!", "Your Event has been deleted.", "success");
        }
      });
  }

  render() {
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
                dateClick={this.handleDateClick}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                // drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                // selectable={true}
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
              {/* <p align="center">
                <strong> Events</strong>
              </p> */}
              {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}