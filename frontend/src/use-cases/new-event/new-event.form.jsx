import React, { useContext, useState, useEffect } from "react";
import {
  DigitForm,
  DigitLayout,
  DigitButton,
  DigitText,
  useDigitToast,
} from "@cthit/react-digit-components";
import * as yup from "yup";
import { Title, TimeAndTimePicker, Description, Rooms } from "./elements";
import * as moment from "moment";
import ActivityRegistration from "./party-report.component";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const whenTrue = {
  is: true,
  then: yup.string().required(),
  otherwise: yup.string(),
};

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  phone: yup.string().required(),
  room: yup.string().notOneOf([""], "Du måste välja vilket rum du vill boka"),
  description: yup.string(),
  begin_date: yup.date().required(),
  end_date: yup.date().required(),
  isActivity: yup.bool().required(),
  permit: yup.bool(),
  responsible_name: yup.string().when("isActivity", whenTrue),
  responsible_number: yup.string().when("isActivity", whenTrue),
  responsible_email: yup.string().when("isActivity", whenTrue),
});

const default_begin_date = new Date();
const default_end_date = moment(new Date()).add(1, "h").toDate();

const initialValues = {
  title: "Event",
  phone: "123",
  room: "",
  begin_date: default_begin_date,
  end_date: default_end_date,
  description: "Hi there",
  isActivity: false,
  permit: false,
  responsible_name: "",
  responsible_number: "",
  responsible_email: "",
};

const rooms = [
  {
    text: "Storhubben",
    value: "BIG_HUB",
  },
  {
    text: "Grupprummet",
    value: "GROUP_ROOM",
  },
  {
    text: "Studierummet",
    value: "STUDY_ROOM",
  },
];

const NewReservationFrom = ({ onSubmit }) => {
  const [openToast] = useDigitToast({
    duration: 3000,
    actionText: "Ok",
    actionHandler: () => {},
  });
  const me = null;
  const [beginDate, setBeginDate] = useState(default_begin_date);
  const [endDate, setEndDate] = useState(default_end_date);
  const [room, setRoom] = useState(null);
  const [validTime, setValidTime] = useState(false);

  useEffect(() => {
    if (!room) return;
    setValidTime(endDate > beginDate);
  }, [endDate, beginDate, room]);

  return (
    <DigitForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        validationSchema
          .validate(values)
          .then(() => onSubmit(values))
          .catch(err =>
            openToast({
              text: err.message,
            }),
          );
      }}
      render={() => (
        <DigitLayout.Column>
          {/*<DigitText.Text text={`Bokare: ${me ? me.cid : ""}`} />*/}
          <Title />
          <Rooms rooms={rooms} onChange={e => setRoom(e.target.value)} />
          <DigitLayout.Row>
            <TimeAndTimePicker
              name="begin_date"
              label="Startdatum"
              onChange={e => setBeginDate(e.target.value)}
            />
            <TimeAndTimePicker
              name="end_date"
              label="Slutdatum"
              onChange={e => setEndDate(e.target.value)}
            />
            {!room ? null : validTime ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon style={{ color: "red" }} />
            )}
          </DigitLayout.Row>
          <Description />

          <ActivityRegistration />
          {/*<a href="https://prit.chalmers.it/Bokningsvillkor.pdf">
            <DigitText.Subtitle text="*bokningsvillkoren" />
        </a>*/}
          <DigitButton raised submit text="Submit" />
        </DigitLayout.Column>
      )}
    />
  );
};

export default NewReservationFrom;
