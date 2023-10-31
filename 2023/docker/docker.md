




# docker compose

+ `docker compose stop`コマンドは、稼働中のコンテナを削除するが、削除はしない
    + `docker compose start`コマンドで再起動
+ `docker compose down`は、デフォルトだとコンテナとネットワークのみ削除する
+ `docker compose down --rmi all --volumes --remove-orphans`

