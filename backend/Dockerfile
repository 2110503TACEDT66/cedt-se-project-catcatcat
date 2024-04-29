FROM node:20

WORKDIR /app

COPY package*.json ./

RUN cd /app; npm install

COPY . .

EXPOSE 5000

CMD ["node", "/app/server.js"]