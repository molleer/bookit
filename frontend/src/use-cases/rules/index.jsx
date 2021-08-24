import {
  DigitCRUD,
  DigitTextField,
  DigitDatePicker,
  DigitTextArea,
  DigitTimePicker,
  DigitSwitch,
  DigitAutocompleteSelectMultiple,
} from "@cthit/react-digit-components";
import DayMask, { DayMaskInput } from "./day-mask.element";
import Rooms from "./rooms.element";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import "./index.css";
import {
  createRule,
  deleteRule,
  getRule,
  getRules,
  roomNames,
} from "../../api/backend.api";
import { formatDate, formatDT, formatTime } from "../../utils/utils";
import {
  detailed_view_keys,
  detailed_view_texts,
  table_header_keys,
  table_header_texts,
} from "./rules.labels";

const formatRule = r => ({
  ...r,
  _time: `${r.start_time}-${r.end_time}`,
  start_date: r.start_date.split(" ")[0],
  end_date: r.end_date.split(" ")[0],
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

const createRuleCallback = async rule =>
  createRule({
    description: rule.description,
    priority: rule.priority,
    title: rule.title,
    allow: rule._allow,
    day_mask: rule._day_mask,
    room: rule._room,
    start_date: formatDate(rule.start_date),
    end_date: formatDate(rule.end_date),
    start_time: formatTime(rule.start_time),
    end_time: formatTime(rule.end_time),
  });

const Rules = () => {
  return (
    <div className="container">
      <DigitCRUD
        readAllRequest={getRulesFormatted}
        readOneRequest={getRuleFormatted}
        createRequest={createRuleCallback}
        deleteRequest={deleteRule}
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
        createTitle="Create Rule"
        formInitialValues={{
          title: "",
          priority: 10,
          start_date: new Date(),
          end_date: new Date("2040-12-31"),
          start_time: new Date("2021-08-21T08:00"),
          end_time: new Date("2021-08-21T17:00"),
          _allow: true,
          _day_mask: 0,
          description: "",
          _room: [],
        }}
        formComponentData={{
          title: {
            component: DigitTextField,
            componentProps: {
              outlined: true,
              upperLabel: "Title",
            },
          },
          priority: {
            component: DigitTextField,
            componentProps: {
              outlined: true,
              upperLabel: "Priority",
            },
          },
          start_date: {
            component: DigitDatePicker,
            componentProps: {
              outlined: true,
              upperLabel: "Start date",
            },
          },
          end_date: {
            component: DigitDatePicker,
            componentProps: {
              outlined: true,
              upperLabel: "End date",
            },
          },
          start_time: {
            component: DigitTimePicker,
            componentProps: {
              outlined: true,
              upperLabel: "Start time",
            },
          },
          end_time: {
            component: DigitTimePicker,
            componentProps: {
              outlined: true,
              upperLabel: "End time",
            },
          },
          description: {
            component: DigitTextArea,
            componentProps: {
              outlined: true,
              upperLabel: "Description",
              rows: 3,
            },
          },
          _room: {
            component: DigitAutocompleteSelectMultiple,
            componentProps: {
              options: Object.keys(roomNames).map(k => ({
                value: k,
                text: roomNames[k],
              })),
            },
          },
          _day_mask: {
            component: DayMaskInput,
          },
          _allow: {
            component: DigitSwitch,
            componentProps: {
              primary: true,
              label: "Allow",
            },
          },
        }}
      />
    </div>
  );
};

export default Rules;
