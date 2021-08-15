import {
  DigitAutocompleteSelectSingle,
  useDigitFormField,
} from "@cthit/react-digit-components";

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

export default Rooms;
