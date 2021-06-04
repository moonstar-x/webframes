# Webapp Build Stage
FROM node:lts-alpine AS build

WORKDIR /opt/app/webapp

COPY webapp/package*.json ./

RUN npm ci

COPY webapp/ ./

RUN npm run build

RUN rm -rf node_modules/

# Server Image
FROM node:lts-alpine

ARG DATE_CREATED
ARG VERSION

LABEL org.opencontainers.image.created=$DATE_CREATED
LABEL org.opencontainers.image.version=$VERSION
LABEL org.opencontainers.image.authors="moonstar-x"
LABEL org.opencontainers.image.vendor="moonstar-x"
LABEL org.opencontainers.image.title="Webframes"
LABEL org.opencontainers.image.description="A small webapp made in Svelte to frame other pages."
LABEL org.opencontainers.image.source="https://github.com/moonstar-x/webframes"

WORKDIR /opt/app/backend

COPY backend/package*.json ./

RUN npm ci --only=prod

COPY backend/ ./

COPY --from=build /opt/app/webapp ../webapp

VOLUME /opt/app/backend/data
EXPOSE 4000

CMD ["npm", "start"]
