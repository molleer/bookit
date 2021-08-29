export DB_USER=postgres
export DB_PASS=password
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=bookit

export DATABASE_URL=postgres://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME
npm run migrate

export GAMMA_AUTH_URL=http://localhost:8081/api/oauth/authorize
export GAMMA_TOKEN_URL=http://localhost:8081/api/oauth/token
export GAMMA_USER_URL=http://localhost:8081/api/users/me
export GAMMA_CLIENT_ID=id
export GAMMA_CLIENT_SECRET=secret
export GAMMA_CALLBACK_URL=http://localhost:3001/auth/account/callback

export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_PASS=""

export SESSION_SECRET=secret
export GRAPHIQL=true
