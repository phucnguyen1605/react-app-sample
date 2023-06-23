FROM node:16-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY . /usr/app

# Create a .env for react app
# Define a required build arg
ARG API_GOLANG_HOST
# Create a .env file
RUN touch /usr/app/.env
# Write the api url into the env file
RUN echo REACT_APP_API_GOLANG_HOST=${API_GOLANG_HOST} > /usr/app/.env

RUN cat /usr/app/.env

RUN yarn install
RUN yarn build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html