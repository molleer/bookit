import { DigitCRUD } from "@cthit/react-digit-components";
import DayMask from "./day-mask.element";
import Rooms from "./rooms.element";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import "./index.css";
import { getRule, getRules } from "../../api/backend.api";
import { formatDT } from "../../utils/utils";
import {
  detailed_view_keys,
  detailed_view_texts,
  table_header_keys,
  table_header_texts,
} from "./rules.labels";

const formatRule = r => ({
  ...r,
  _time: `${r.start_time}-${r.end_time}`,
  _start_date: r.start_date.split(" ")[0],
  _end_date: r.end_date.split(" ")[0],
  _room: <Rooms rooms={r.room} />,
  _day_mask: <DayMask day_mask={r.day_mask} />,
  _allow: r.allow ? <CheckIcon /> : <CancelIcon />,
  created_at: formatDT(r.created_at),
  updated_at: formatDT(r.updated_at),
});

const getRulesFormatted = async () => {
  const rules = await getRules();
  return rules.map(r => formatRule(r));
};

const getRuleFormatted = async id => {
  return { data: formatRule(await getRule(id)) };
};

const Rules = () => {
  return (
    <div className="container">
      <DigitCRUD
        readAllRequest={getRulesFormatted}
        readOneRequest={getRuleFormatted}
        path="/rules"
        idProp="id"
        keysOrder={detailed_view_keys}
        keysText={detailed_view_texts}
        tableProps={{
          columnsOrder: table_header_keys,
          headerTexts: table_header_texts,
          titleText: "Rules",
          startOrderBy: "title",
          startRowsPerPage: 10,
        }}
        backButtonText="Back"
        detailsButtonText="Details"
        detailsTitle={data => data.title}
      />
    </div>
  );
};

export default Rules;
