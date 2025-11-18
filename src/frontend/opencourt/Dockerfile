# Front-end Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_SERVER_HOST
ARG VITE_SERVER_PORT
ENV VITE_SERVER_HOST=$VITE_SERVER_HOST
ENV VITE_SERVER_PORT=$VITE_SERVER_PORT

EXPOSE 5173

ENV NODE_ENV=development

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]