export const getEvents_query = `
query GetEvents($from: String!, $to: String!){ 
  eventsFT(from: $from, to: $to) {
    start
    end
    id
    title
  }
}`;

export const createEvent_query = `
mutation CreateEvent($event: InputEvent!) {
  createEvent(event: $event)
}`;

export const getRules_query = `
{
  rules {
    id
    title
    start_date
    end_date
    start_time
    end_time
    day_mask
    priority
    room
    allow
  }
}
`;
