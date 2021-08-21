import Axios from "axios";
import {
  getEvents_query,
  createEvent_query,
  getRules_query,
  getRule_query,
} from "./backend.queries";

const graphql_endpoint = "/api/graphql/v1";

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
