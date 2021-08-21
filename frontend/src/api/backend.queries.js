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

export const getRule_query = `
query GetRule($id: String!) {
  rule(id: $id) {
    id
    title
    start_date
    end_date
    start_time
    end_time
    day_mask
    priority
    description
    room
    allow
    created_at
    updated_at
  }
}
`;

export const createRule_query = `
mutation CreateRule($rule: InputRule!) {
  createRule(rule: $rule)
}
`;
