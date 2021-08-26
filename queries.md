## SQL queries

### Insert event

```SQL
INSERT INTO event (title, description, start, end_date, room, party_report_id) VALUES (
    'Fun Event',
    'A verry good event',
    '2021-08-10T21:00' ,
    '2021-08-10T22:00',
    'BIG_HUB',
    null);
```

### Insert party report

```SQL
INSERT INTO party_report (responsible_name, responsible_number, responsible_email) VALUES (
  'Alice',
  '1234',
  'alice@alice.com') RETURNING id;
```

### Inner join select

```SQL
SELECT * FROM party_report INNER JOIN event
ON event.id=party_report.event_id;
```

```SQL
SELECT (responsible_name, responsible_email) as event, (title, start as start) as party_report
FROM party_report INNER JOIN event
ON event.id=party_report.event_id;
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
