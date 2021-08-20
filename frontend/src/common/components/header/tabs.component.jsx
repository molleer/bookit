import { DigitTabs } from "@cthit/react-digit-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const tabs = [
  {
    text: "Calendar",
    value: "",
  },
  {
    text: "Rules",
    value: "rules",
  },
  {
    text: "Party Reports",
    value: "party_reports",
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("");
  const history = useHistory();

  useEffect(() => {
    const value = window.location.pathname.split("/")[1];
    if (!value) return;
    const tab = tabs.find(e => e.value === value);
    if (!tab) return;
    setActiveTab(value);
  }, []);

  return (
    <DigitTabs
      onChange={value => {
        setActiveTab(value);
        history.push("/" + value);
      }}
      centered
      selected={activeTab}
      fullwidth
      tabs={tabs}
    />
  );
};

export default Tabs;
