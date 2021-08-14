import { getEvents } from "../../api/backend.api";
import Calendar from "./calendar.view";

const Home = () => {
  return (
    <div style={{ width: "100%", margin: "1rem", height: "40rem" }}>
      <Calendar getEvents={getEvents} />
    </div>
  );
};

export default Home;
