# dockerコマンド


## コンテナ立ち上がらない時
docker rmi -f $(docker images -aq)
docker-compose up -d
docker container prune
docker image prune
docker system df
docker rmi -f $(docker images -aq)
docker volume prune
docker volume prune -a
docker system prune
docker system prune -a
docker compose build 
docker builder prune





# docker compose

+ `docker compose stop`コマンドは、稼働中のコンテナを削除するが、削除はしない
    + `docker compose start`コマンドで再起動
+ `docker compose down`は、デフォルトだとコンテナとネットワークのみ削除する
+ `docker compose down --rmi all --volumes --remove-orphans`
    + `--rmi all`により、docker-compose.ymlで定義されているイメージだけでなく、未使用のイメージもすべて削除される
    + `--volumes`により、関連するすべてのボリュームが削除され、これにはデータベースのデータを保存しているボリュームも含まれるため、データベースのデータが完全に失われる
    + `--remove-orphans`により、docker-compose.ymlで定義されていないけれど、プロジェクトに関連して作られた「孤立したコンテナ」を削除するためのもの
+ DockerとDocker Compose を使用している開発環境のデータベース内のデータを確認するには、`docker compose run web rails console`を使用
