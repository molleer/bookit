const prettyNames = {
  BIG_HUB: "Storhubben",
  GROUP_ROOM: "Grupprummet",
  HASEN: "HASen",
};

const Rooms = ({ rooms }) => {
  return (
    <div>
      {rooms.map(r => (
        <div key={r}>{prettyNames[r]}</div>
      ))}
    </div>
  );
};

export default Rooms;
