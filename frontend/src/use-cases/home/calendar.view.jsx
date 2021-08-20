import FullCallendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const Calendar = ({ getEvents, eventClick }) => {
  getEvents = getEvents ?? (() => new Promise(res => res([])));
  eventClick = eventClick ?? (() => {});

  return (
    <FullCallendar
      eventClick={eventClick}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      rerenderDelay={1000}
      allDaySlot
      weekNumbers
      editable
      headerToolbar={{
        start: "title",
        center: "",
        end: "listWeek,timeGridWeek,today,prev,next",
      }}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
      initialView={window.innerWidth > 600 ? "timeGridWeek" : "timeGridDay"}
      eventOverlap
      height={window.innerWidth > 600 ? "100%" : "auto"}
      events={async info => {
        const events = await getEvents(info.start, info.end);
        return events;
      }}
    />
  );
};

export default Calendar;
