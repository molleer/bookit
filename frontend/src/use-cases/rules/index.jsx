import { DigitTable, DigitButton } from "@cthit/react-digit-components";
import DayMask from "./day-mask.element";
import Rooms from "./rooms.element";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import "./index.css";
import { useEffect, useState } from "react";
import { getRules } from "../../api/backend.api";

/*
  
    id: "12345",
    title: "Study days",
    start_date: "2001-01-01 00:00:00",
    end_date: "2030-12-31 00:00:00",
    start_time: "08:00",
    end_time: "17:00",
    day_mask: 31,
    priority: 10,
    rooms: ["BIG_HUB", "GROUP_ROOM"],
    allow: true,
 */

const Rules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    getRules().then(data => setRules(data));
  }, []);

  return (
    <div className="container">
      <DigitTable
        titleText="Rules"
        idProp="id"
        columnsOrder={[
          "title",
          "priority",
          "start_date",
          "end_date",
          "time",
          "room",
          "day_mask",
          "allow",
          "details",
        ]}
        headerTexts={{
          title: "Title",
          priority: "Prio",
          start_date: "Start",
          end_date: "End",
          time: "Time",
          room: "Rooms",
          day_mask: "M T W T F S S",
          allow: "Allow",
          details: "",
        }}
        startOrderBy="title"
        data={rules.map(r => ({
          ...r,
          time: `${r.start_time}-${r.end_time}`,
          start_date: r.start_date.split(" ")[0],
          end_date: r.end_date.split(" ")[0],
          room: <Rooms rooms={r.room} />,
          day_mask: <DayMask day_mask={r.day_mask} />,
          allow: r.allow ? <CheckIcon /> : <CancelIcon />,
          details: <DigitButton outlined text="Details" />,
        }))}
        startRowsPerPage={10}
      />
    </div>
  );
};

export default Rules;
