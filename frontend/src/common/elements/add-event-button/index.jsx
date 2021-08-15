import { DigitIconButton } from "@cthit/react-digit-components";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import "./add-event-button.css";

const AddEventButton = () => {
  const history = useHistory();

  return (
    <div className="add-event-button">
      <DigitIconButton
        icon={AddIcon}
        onClick={() => history.push("/new-event")}
      />
    </div>
  );
};

export default AddEventButton;
