import {
  useDigitFormField,
  DigitTextField,
} from "@cthit/react-digit-components";
import { string } from "prop-types";

const PhoneNumber = ({ name, label, ...props }) => {
  const phoneValues = useDigitFormField(name);
  return <DigitTextField {...phoneValues} {...props} upperLabel={label} />;
};

PhoneNumber.propTypes = {
  name: string.isRequired,
  label: string,
};

export default PhoneNumber;
