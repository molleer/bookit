import {
  useDigitFormField,
  DigitDateAndTimePicker,
} from "@cthit/react-digit-components";
import { string } from "prop-types";

const TimeAndTimePicker = ({ name, label, onChange }) => {
  const timeValues = useDigitFormField(name);
  return (
    <DigitDateAndTimePicker
      {...timeValues}
      upperLabel={label}
      onChange={e => {
        onChange(e);
        timeValues.onChange(e);
      }}
    />
  );
};

TimeAndTimePicker.propTypes = {
  name: string.isRequired,
  label: string,
};

export default TimeAndTimePicker;
