FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ssr
EXPOSE 4000
CMD [ "node", "dist/client/server/main.js" ]