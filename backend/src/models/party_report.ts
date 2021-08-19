import { Event } from "./event";

export enum RegistrationStatus {
  PENDING,
  ACCEPTED,
  DENIED,
}

export interface PartyReport {
  id: string;
  responsible_name: string;
  responsible_number: string;
  responsible_email: string;
  co_responsible_name: string;
  co_responsible_number: string;
  co_responsible_email: string;
  serving_permit: boolean;
  status: RegistrationStatus;
  event?: Event;
}
