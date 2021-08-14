import { ActivityRegistration } from "./activity_registration";
import { Room } from "./room";

export interface Event {
  id?: String;
  start: String;
  end: String;
  description?: String;
  title: String;
  created_at: String;
  updated_at: String;
  activity_registration?: ActivityRegistration;
  room: Room[];
}
