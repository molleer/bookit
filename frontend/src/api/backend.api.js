import Axios from "axios";
import { getEvents_query, createEvent_query } from "./backend.queries";

const graphql_endpoint = "/api/graphql/v1";

export const getEvents = (from, to) =>
  new Promise(resolve =>
    Axios.post(graphql_endpoint, {
      query: getEvents_query,
      variables: { from: from, to: to },
      operationName: "GetEvents",
    })
      .then(res => resolve(res.data.data.eventsFT))
      .catch(err => {
        console.log("Failed to fetch events");
        console.log(err);
        resolve([]);
      }),
  );

export const createEvent = event =>
  new Promise((resolve, reject) =>
    Axios.post(graphql_endpoint, {
      query: createEvent_query,
      variables: { event: event },
      operationName: "CreateEvent",
    })
      .then(res =>
        res.data.data.createEvent
          ? resolve()
          : reject("Failed to create event"),
      )
      .catch(err => {
        console.log("Failed to create event");
        console.log(err);
        reject(err.message);
      }),
  );
