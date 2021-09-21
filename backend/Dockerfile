FROM node:lts as build

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts

COPY --from=build ./build ./build/
COPY --from=build ./src/schemas ./build/schemas
COPY --from=build ./migrations ./migrations/
COPY --from=build ./startup.sh ./package.json ./package-lock.json ./

RUN npm install --production

CMD sh ./startup.sh
