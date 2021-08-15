import {
  DigitTextField,
  useDigitFormField,
} from "@cthit/react-digit-components";

const Title = () => {
  const titleValues = useDigitFormField("title");
  return (
    <DigitTextField
      {...titleValues}
      size={{ width: "20rem" }}
      upperLabel="Title"
    />
  );
};

export default Title;
