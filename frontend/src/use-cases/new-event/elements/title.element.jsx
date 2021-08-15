import React from "react";
import {
  DigitTextField,
  useDigitFormField,
} from "@cthit/react-digit-components";

const Title = () => {
  const titleValues = useDigitFormField("title");
  return <DigitTextField {...titleValues} upperLabel="Title" />;
};

export default Title;
