import moment from "moment";

export const formatDT = date =>
  moment(new Date(date)).format("yyyy-MM-DD hh:mm");
