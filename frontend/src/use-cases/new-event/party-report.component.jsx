import {
  useDigitFormField as formField,
  DigitCheckbox,
  DigitTextField,
  DigitLayout,
} from "@cthit/react-digit-components";

const PartyReport = () => {
  const activityValues = formField("isActivity");
  const permitValues = formField("permit");
  const repNameValues = formField("responsible_name");
  const repNumberValues = formField("responsible_number");
  const repEmailValues = formField("responsible_email");

  return (
    <>
      <DigitCheckbox
        {...activityValues}
        label="Submit party report"
        size={{ width: "100%" }}
      />
      {activityValues.value && (
        <>
          <DigitCheckbox {...permitValues} label="Serving permit" />

          <DigitLayout.Row>
            <DigitTextField {...repNameValues} upperLabel="Responsible name" />
            <DigitTextField
              {...repNumberValues}
              upperLabel="Responsible phone"
            />
            <DigitTextField
              {...repEmailValues}
              upperLabel="Responsible email"
            />
          </DigitLayout.Row>
        </>
      )}
    </>
  );
};

export default PartyReport;
