import React, { useState } from "react";
import NewReservationFrom from "./new-event.form";
import { DigitDesign, DigitLayout } from "@cthit/react-digit-components";

const NewReservation = () => {
  const handleSubmit = values => {
    //TODO: Send submit request to backend
    console.log(values);
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
