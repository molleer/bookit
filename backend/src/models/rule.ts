import { Room } from "./room";

export interface Rule {
  id: string;
  day_mask: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  description: string;
  allow: boolean;
  priority: number;
  title: string;
  created_at: string;
  updated_at: string;
  room: Room[];
}
