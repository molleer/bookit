import { getEvents } from "../../api/backend.api";
import AddEventButton from "../../common/elements/add-event-button";
import Calendar from "./calendar.view";

const Home = () => {
  return (
    <div style={{ width: "100%", margin: "1rem", height: "40rem" }}>
      <Calendar getEvents={getEvents} />
      <AddEventButton />
    </div>
  );
};

export default Home;
