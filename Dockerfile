FROM node:16.13.2-alpine

EXPOSE 3000
ENV HOST 0.0.0.0

WORKDIR /app

# コマンド実行
RUN apk update && \
    apk add git && \
    yarn add @vue/cli nuxt create-nuxt-app