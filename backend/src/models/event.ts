import { PartyReport } from "./party_report";
import { Room } from "./room";

export interface Event {
  id?: String;
  start: String;
  end: String;
  description?: String;
  title: String;
  created_at: String;
  updated_at: String;
  party_report?: PartyReport;
  room: Room;
}
