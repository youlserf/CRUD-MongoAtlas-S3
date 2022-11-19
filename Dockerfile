FROM node:16.15.0
LABEL maintainer youlserf.cardenas@tecsup.edu.pe
COPY package*.json ./
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY . .
EXPOSE 9000
CMD ["npm","start"]


