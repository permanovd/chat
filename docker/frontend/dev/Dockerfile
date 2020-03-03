# See https://medium.com/swlh/dockerizing-a-react-application-with-docker-and-nginx-19e88ef8e99a
FROM node:alpine
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
CMD ["yarn", "start"]