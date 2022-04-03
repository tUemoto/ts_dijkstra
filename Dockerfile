FROM node:lts-buster-slim AS build
WORKDIR /app
ENV NODE_ENV=development
COPY . /app
RUN npm ci
RUN npm run build

FROM node:lts-buster-slim
RUN mkdir /app && chown node:node /app
WORKDIR /app
ENV PORT=80
ENV NODE_ENV=production
USER node
COPY --chown=node:node --from=build /app/out /app/out
COPY --chown=node:node --from=build /app/package*.json /app/
RUN npm ci
CMD [ "npm", "run", "serve" ]