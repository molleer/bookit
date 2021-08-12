import { Event } from "./event";

export enum RegistrationStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}

export interface ActivityRegistration {
  id: String;
  responsible_name: String;
  responsible_number: String;
  responsible_email: String;
  co_responsible_name: String;
  co_responsible_number: String;
  co_responsible_email: String;
  serving_permit: Boolean;
  status: RegistrationStatus;
  event?: Event;
}
