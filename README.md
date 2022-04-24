# free-nuxt-app
nuxtであれこれ試したい時のリポジトリ。
vue 2系とTypeScript。

# 初回起動
docker-compose run app yarn install
docker-compose build
docker-compose up

# 初回以降の起動
docker-compose up
もしくは
docker-compose up -d

# 終了
docker-compose down
