export DB_USER=postgres
export DB_PASS=password
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=bookit

export DATABASE_URL=postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME
npm run migrate

export GRAPHIQL=true
