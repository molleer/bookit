import NewReservationFrom from "./new-event.form";
import { DigitDesign, DigitLayout } from "@cthit/react-digit-components";
import { createEvent } from "../../api/backend.api";

const NewReservation = () => {
  const handleSubmit = ({
    title,
    phone,
    room,
    start,
    end,
    description,
    ...other
  }) => {
    createEvent({
      title,
      //phone,
      room,
      start: start.toISOString(),
      end: end.toISOString(),
      description,
    })
      .then(() => console.log("Event created"))
      .catch(err => console.log(err));
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
