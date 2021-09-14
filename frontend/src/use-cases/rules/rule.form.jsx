import {
  DigitTextField,
  DigitDatePicker,
  DigitTextArea,
  DigitTimePicker,
  DigitSwitch,
  DigitAutocompleteSelectMultiple,
} from "@cthit/react-digit-components";
import { DayMaskInput } from "./day-mask.element";
import { roomNames } from "../../api/backend.api";

export const ruleForm = {
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
};
