import moment from "moment";

export const formatDT = date =>
  moment(new Date(date)).format("yyyy-MM-DD HH:mm");

export const formatDate = date => moment(new Date(date)).format("yyyy-MM-DD");

export const formatTime = date => moment(new Date(date)).format("HH:mm");
