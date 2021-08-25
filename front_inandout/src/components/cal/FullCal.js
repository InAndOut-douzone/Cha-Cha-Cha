import React from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const FullCal = () => {

  const handleDateClick = (eventInfo) => {
    alert(eventInfo.dateStr)
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <FullCalendar
      plugins={[daygridPlugin, timeGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      eventContent={renderEventContent}
      initialView="dayGridMonth"
      events={[
        { title: '이재성 휴가', date: '2021-08-01' },
        { title: '이재성 휴가', date: '2021-08-12' },
        { title: '김정현 휴가', date: '2021-08-12' },
        { title: '김정현 휴가', date: '2021-08-17' },
        { title: '김정인 휴가', date: '2021-08-17' },
        { title: '김정인 휴가', date: '2021-08-25' }
      ]}
    />
  );
};

export default FullCal;