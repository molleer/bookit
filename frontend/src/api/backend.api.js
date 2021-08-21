import Axios from "axios";
import {
  getEvents_query,
  createEvent_query,
  getRules_query,
  getRule_query,
  createRule_query,
} from "./backend.queries";

const graphql_endpoint = "/api/graphql/v1";
export const roomNames = {
  BIG_HUB: "Storhubben",
  GROUP_ROOM: "Grupprummet",
  HASEN: "HASen",
};

const request = (body, dataLabel, errorMessage, onReject = () => null) =>
  new Promise(resolve =>
    Axios.post(graphql_endpoint, body)
      .then(res => resolve(res.data.data[dataLabel]))
      .catch(err => {
        console.log(errorMessage);
        console.log(err);
        resolve(onReject(err));
      }),
  );

export const getEvents = (from, to) =>
  request(
    {
      query: getEvents_query,
      variables: { from: from, to: to },
      operationName: "GetEvents",
    },
    "eventsFT",
    "Failed to fetch events",
    () => [],
  );

export const createEvent = event =>
  request(
    {
      query: createEvent_query,
      variables: { event: event },
      operationName: "CreateEvent",
    },
    "createEvent",
    "Failed to create event",
    err => err.message,
  );

export const getRules = () =>
  request(
    {
      query: getRules_query,
    },
    "rules",
    "Failed to fetch rules",
    () => [],
  );

export const getRule = id =>
  request(
    {
      query: getRule_query,
      variables: { id: id },
      operationName: "GetRule",
    },
    "rule",
    "Failed to fetch rule",
    () => ({}),
  );

export const createRule = rule =>
  request(
    {
      query: createRule_query,
      operationName: "CreateRule",
      variables: { rule: rule },
    },
    "createRule",
    "Failed to create rule",
    err => err.message,
  );
