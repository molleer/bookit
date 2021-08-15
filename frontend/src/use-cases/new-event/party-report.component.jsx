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
        label="Jag vill aktivitetsanmäla"
        size={{ width: "100%" }}
      />
      {activityValues.value && (
        <>
          <DigitCheckbox {...permitValues} label="Serveringstillstånd" />

          <DigitLayout.Row>
            <DigitTextField
              {...repNameValues}
              upperLabel="Namn aktivitetsansvarig"
            />
            <DigitTextField
              {...repNumberValues}
              upperLabel="Tel aktivitetsansvarig"
            />
            <DigitTextField
              {...repEmailValues}
              upperLabel="Email aktivitetsansvarig"
            />
          </DigitLayout.Row>
        </>
      )}
    </>
  );
};

export default PartyReport;
