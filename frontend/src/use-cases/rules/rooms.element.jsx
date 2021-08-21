import { roomNames } from "../../api/backend.api";

const Rooms = ({ rooms }) => {
  return (
    <div>
      {rooms.map(r => (
        <div key={r}>{roomNames[r]}</div>
      ))}
    </div>
  );
};

export default Rooms;
