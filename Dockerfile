FROM node:16-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY . /usr/app
RUN yarn install
RUN yarn build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./.docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html