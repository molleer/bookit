export const getEvents_query = `query GetEvents($from: String!, $to: String!){ 
    eventsFT(from: $from, to: $to) {
      start
      end
      id
      title
    }
    }`;
