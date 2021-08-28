import NewReservationFrom from "./new-event.form";
import {
  DigitDesign,
  DigitLayout,
  useDigitToast,
} from "@cthit/react-digit-components";
import { createEvent } from "../../api/backend.api";
import { useHistory } from "react-router";

const NewReservation = () => {
  const [openToast] = useDigitToast({
    duration: 3000,
    actionText: "Ok",
    actionHandler: () => {},
  });
  const history = useHistory();
  const handleSubmit = async event => {
    const res = await createEvent({
      title: event.title,
      phone: event.phone,
      room: event.room,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      description: event.description,
      party_report: !event.isActivity
        ? null
        : {
            responsible_name: event.responsible_name,
            responsible_number: event.responsible_number,
            responsible_email: event.responsible_email,
            serving_permit: event.permit,
          },
    });
    if (res === true) {
      openToast({
        text: "A new event was created",
      });
      history.push("/");
      return;
    }
    openToast({
      //TODO: Show description of broken rule
      text: "Failed to create event",
    });
  };

  return (
    <DigitLayout.Center>
      <DigitDesign.Card>
        <DigitDesign.CardBody>
          <DigitDesign.CardTitle text="New booking" />
          <NewReservationFrom onSubmit={handleSubmit} />
        </DigitDesign.CardBody>
      </DigitDesign.Card>
    </DigitLayout.Center>
  );
};

export default NewReservation;
