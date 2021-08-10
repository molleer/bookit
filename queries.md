## SQL queries

### Insert element

```SQL
INSERT INTO event (title, description, begin_date, end_date, room) VALUES (
    'Fun Event',
    'A verry good event',
    '2021-08-10T21:00' ,
    '2021-08-10T22:00',
    '{ BIG_HUB }');
```

## GraphQL Queries

### Query all

```GraphQL
{
  events {
    id
    title
  }
}
```

### Query specific

```GraphQL
query GetEvent($id: String!) {
  event(id: $id) {
    id
  }
}
```

Variables

```json
{
  "id": "1068380c-f9f7-11eb-9702-0242ac1a0002"
}
```
