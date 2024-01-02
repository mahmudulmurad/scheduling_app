FROM node:18.17.0-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3020

CMD ["sh", "-c", "cd /app && node dist/index.js"]

