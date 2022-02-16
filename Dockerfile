FROM node:14
WORKDIR /palmerce
COPY package.json .
RUN npm install
COPY . .
CMD npm start