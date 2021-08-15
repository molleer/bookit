import React from "react";
import {
  useDigitFormField,
  DigitTextField,
} from "@cthit/react-digit-components";
import { string } from "prop-types";

const PhoneNumber = ({ name, label }) => {
  const phoneValues = useDigitFormField(name);
  return <DigitTextField {...phoneValues} upperLabel={label} />;
};

PhoneNumber.propTypes = {
  name: string.isRequired,
  label: string,
};

export default PhoneNumber;
