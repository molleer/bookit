import React from "react";
import {
  useDigitFormField,
  DigitTextArea,
} from "@cthit/react-digit-components";

const Description = () => {
  const descriptionValues = useDigitFormField("description");
  return (
    <DigitTextArea
      size={{ width: "100%" }}
      rows={5}
      rowsMax={8}
      {...descriptionValues}
      upperLabel="Description"
    />
  );
};

export default Description;
