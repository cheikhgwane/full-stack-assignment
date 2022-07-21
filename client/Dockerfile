FROM node:14

WORKDIR /app/client

COPY package*.json  ./

RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

EXPOSE 5000