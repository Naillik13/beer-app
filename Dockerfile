FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
CMD ["npm", "start"]

