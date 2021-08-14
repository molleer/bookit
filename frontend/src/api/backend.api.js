import Axios from "axios";
import { getEvents_query } from "./backend.queries";

export const getEvents = (from, to) =>
  new Promise(resolve =>
    Axios.post("/api/graphql/v1", {
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
