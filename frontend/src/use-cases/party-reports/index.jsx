import { DigitCRUD, DigitTooltip } from "@cthit/react-digit-components";
import { getPartyReports } from "../../api/backend.api";
import { formatDT } from "../../utils/utils";
import "./index.css";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HelpIcon from "@material-ui/icons/Help";

const getStatusIcon = status => {
  var icon = <HelpIcon />;
  switch (status) {
    case "PENDING":
      icon = (
        <FiberManualRecordIcon fontSize="large" style={{ color: "orange" }} />
      );
      break;
    case "ACCEPTED":
      icon = <CheckCircleIcon style={{ color: "green" }} />;
      break;
    case "DENIED":
      icon = <CancelIcon style={{ color: "red" }} />;
      break;
    default:
  }
  return <DigitTooltip text={status} render={() => icon} />;
};

const readAllPartyReports = async () =>
  (await getPartyReports()).map(e => ({
    ...e,
    ...e.party_report,
    start: formatDT(e.start),
    end: formatDT(e.end),
    created_at: formatDT(e.created_at),
    status: getStatusIcon(e.party_report.status),
  }));

const PartyReports = () => {
  return (
    <div className="container">
      <DigitCRUD
        readAllRequest={readAllPartyReports}
        path="/party_reports"
        idProp="id"
        keysOrder={["title", "created_at", "start", "end", "status"]}
        keysText={{
          start: "Start",
          created_at: "Created",
          end: "End",
          title: "Title",
          status: "Status",
        }}
        backButtonText="Back"
        detailsButtonText="Details"
      />
    </div>
  );
};

export default PartyReports;
