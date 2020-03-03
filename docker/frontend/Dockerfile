FROM node:alpine as build
WORKDIR /app
ADD . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]