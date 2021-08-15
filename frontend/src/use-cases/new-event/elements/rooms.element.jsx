import {
  DigitAutocompleteSelectSingle,
  DigitRadioButtonGroup,
  useDigitFormField,
} from "@cthit/react-digit-components";
import React from "react";

const Rooms = ({ rooms, onChange }) => {
  const roomValues = useDigitFormField("room");
  return (
    <DigitAutocompleteSelectSingle
      {...roomValues}
      upperLabel="Room"
      options={rooms}
      onChange={e => {
        onChange(e);
        roomValues.onChange(e);
      }}
    />
  );
};
/**
<DigitRadioButtonGroup
    {...roomValues}
    upperLabel="Rum"
    radioButtons={rooms.map(r => ({
        label: r.name,
        ...r,
    }))}
/> */

export default Rooms;
