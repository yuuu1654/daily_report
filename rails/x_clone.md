
# 疑問
## confirmable (deviseのモジュール)を導入した際にサインアップ出来ない
+ ユーザー登録時にメール認証が不要なので、登録処理のcreateアクションをオーバーライド
## 正しいemail/passwordを入力してもログインできない (解決済み)
+ 422 Unprocessable Entity
  + サーバーが要求本文のコンテンツ型を理解でき、リクエスト自体は正しいが、中に含まれる指示を処理できなかった事を表す
+ `:confirmable`モジュールを有効にしていたので、メール認証したらログインできた
## github認証でサインインする時に、登録フォームのバリデーションで引っかかる
+ github認証ボタンがPOSTリクエストになっていたので、GETリクエストに修正することで解決
## github認証ボタン押下時に`Not found. Authentication passthru.`と表示される
+ OAuthアプリ側のuserは現状1人
+ github認証ボタンをPOSTリクエストにする事で問題無く動作するようになった
  + omniauthは認証リクエストでGetリクエストを推奨していない
## railsの機能 (gem) でbackground-imageを表示できない
+ `sass-rails`の導入
  + `background-image: asset-url('user-prof-bgimg.jpeg');`
+ `cssbundling-rails`の導入
  + app/assets/imaegs以下
  + app/javascript/imaegs以下
    + `background-image: url('../images/user-prof-bgimg.jpeg'); `
## パスワード変更したら意図せずログアウトされてしまう
+ deviseの仕様上、パスワードを変更したらセッションが切れてしまう為
```rb
def update
  # パスワードも変更しようとしてるかチェック
  changing_password = params[:user][:password].present?
  if @user.update(user_params)
    # deviseを使っている場合、パスワードを更新すると現在のセッションが無効になる為、再ログインさせる
    bypass_sign_in(@user) if changing_password
    redirect_to user_path(@user), notice: "プロフィールを変更しました"
  else
    # ▼ Turboを使ってる場合にバリデーションのエラーメッセージを表示するように設定
    render :edit, status: :unprocessable_entity
  end
end
```
## リツイートしたツイートをツイート一覧の降順にどのように組み込むか
+ リツイートされた時
  + `updated_at`で並び替えて、リツイートされたツイートのupdated_atを更新
+ リツイート取り消された時
  + update_atにcreated_atを代入



# エラー集
## ActionController::InvalidAuthenticityTokenエラー
+ railsがセキュリティ上の理由で発生させるエラー
+ フォームから送信されるCSRFトークンが期待される値と一致しないor存在しない場合に発生
+ Railsは問題ないリクエストである事を確認する為にCSRFトークンというパスワードのようなものを使用する
+ 解決策
  + github認証のアクションで、csrfトークンの検証をスキップする設定が必要
```
ActionController::InvalidAuthenticityToken in Users::SessionsController#create
Can't verify CSRF token authenticity.
Extracted source (around line #253):
        def handle_unverified_request
          raise ActionController::InvalidAuthenticityToken, warning_message
        end
      end
    end
```

# 環境構築
+ `Render`の設定
  + マスターキーを作り直す
    + 既存のファイルを削除
      + `rm config/credentials.yml.enc config/master.key`
    + 新たに作成し直す
      + `EDITOR="code -w" bin/rails credentials:edit` ← うまくいかなかった..
      + `docker-compose run -e EDITOR="code --wait" web bin/rails credentials:edit` (うまくいった)
  + rubyのバージョンを3.2系に戻して、deviseのバージョンを下げる？
    + erb->slimの変換は一旦終わっているので、rubyバージョンを3.2.1に戻して運用
  + webのサービスにDBのインターナルパスのURLを`DATABASE_URL`として設定
    + これを忘れていたので、本番環境でDB接続ができておらずエラーになっていた..
* 以下のテスト用アカウントでログイン
  * email : `test-prd01@gmail.com`
  * password : `testprd01`


# サインアップ・ログイン機能
## Deviseのセットアップ
+ ユーザーモデル
  + `docker compose run web rails g devise user`
+ ビュー
  + `docker compose run web rails g devise:views users`
+ コントローラ
  + `docker compose run web rails g devise:controller users`
+ サインインした後の画面遷移は、デフォルトだとルートパスになっている

## 本番環境のメール送信設定
+ `Gmail`を使ったメール送信設定
  + `address: 'smtp.gmail.com'` は、メール送信に使用するSMTPサーバーのアドレスを指定している
    + ここで `smtp.gmail.com` は、GoogleのGmailサービスが提供するSMTPサーバーのアドレスのこと
  + 

# githubログイン機能
+ `omniauth`
  + OAuthを使用した認証の仕組みを導入するためのGem
  + 他のサービス(サービスプロバイダ)の登録情報を利用して、自分のアプリケーションへの登録・ログインをできるようにする
  + `omniauth-github`
    + githubを使った認証をomniauthでサポートするためのgemで、このgemを使うとgithubのOAuth認証プロバイダを簡単に統合できる
  + ``
  + ``
+ `アクセストークン` : 「この人にデータを渡してもいいのか？」「この人にページを見せてもいいのか？」を判断するために使う (認可)

+ OAuthアプリの登録
  + client_id : `b13464004991db42c733`
  + client_secrets : `146951a9ab5a222bed3eedf13cad58b05b879196`
  + `Enable Device Flow`にチェックを入れる
    + 入れないとリクエスト送れない
+ 本番環境用にもう一つアプリを作成してRenderの環境変数に設定する
  + client_id : `caa9c6306562e4aaacab`
  + client_secrets : `f441513144c6834123f54692cbf13d2dd23e35b2`

## 要約動画
+ omniauth, omniauth関連のgemの説明

# トップページの作成
+ font-awesomeの導入
  1. package.json, application.bootstrap.scss, application.jsにインストール設定を記述
  2. 以下のコマンドでjsコンテナにライブラリをインストールする
     1. `docker-compose run js yarn install`
+ Tweetモデル・テーブルの作成
  + `docker-compose run web rails g model tweet user:references content:string`
+ tweetsコントローラ
  + `docker-compose run web rails g controller tweets create show edit update destroy`

## Active Storage の導入
+ 画像が表示されないときは、以下をGemfileに記載されているか確認して、下記のコマンドを実行
  + `gem "image_processing", "~> 1.2"`
  + `docker compose run web bundle`
  + `docker compose up`
+ `docker compose run web rails active_storage:install`
+ `docker compose run web rails db:migrate`
+ dev環境でファイルをローカルに保存する
  ```rb:development.rb
  # ファイルをローカルに保存する
  config.active_storage.service = :local
  ```
+ Tweetモデルに以下の関連性を記述
  + `has_many_attached :images`
+ prd環境でファイルをS3に保存する
  ```rb:production.rb
  # ファイルをAmazon S3に保存する
  config.active_storage.service = :amazon
  ```
  + s3を使う為のgemを追加
    + `gem 'aws-sdk-s3', require: false`
+ RenderにAWS用の環境変数を設定
  + `AWS_ACCESS_KEY` : `AKIASMOZMSCS7OAZKRHJ`
  + `AWS_SECRET_KEY` : `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`
  + `AWS_REGION` : `ap-northeast-1`
  + `AWS_BUCKET` : `x-clone-img`

<!-- + 画像をリサイズできるようにする
+ ImageMagickをインストール
  + `brew install imagemagick`
+ 入っているか確認(imagemagickの一部で使われている)
  + `convert --version`
+ Gemfileに追記
  + `gem "image_processing", "~> 1.2"` -->

## Stimulusコントローラを使って、画像アップロード用のjsファイル作成
+ `docker-compose run web rails g stimulus image_upload`
  + app/javascript/controllers/以下にファイルが作成される
+ slimテンプレートを以下のように修正
```rb
label.tweet-form__img-up-btn data-controller="image-upload" data-action="click->image-upload#openFileField"
        i.bi.bi-image
```

## kaminariを用いたページネーションの導入
+ gemの導入
  + `gem 'kaminari'`
+ 取得データ件数を調整
  + `@posts = Post.all.page(params[:page]).per(10)`
+ テンプレートの末尾
  + `= paginate @posts`
+ デザインを適用
  + `docker-compose run web rails g kaminari:views bootstrap4`




# ユーザープロフィールページの作成
+ ユーザー用コントローラ作成
  + `docker-compose run web rails g controller users show edit`
+ `likes`テーブル作成
  + `docker-compose run web rails g model like user:references tweet:references`
+ `retweets`テーブル作成
  + `docker-compose run web rails g model retweet user:references tweet:references`
## ユーザーの`avatar_image`と`profile_image`に画像データをインサートして紐付けるrakeタスクを作成
+ `docker-compose run web rails user:attach_images`

# プロフィール編集画面
+ `set_userメソッド`のbefore_actionにupdateも指定しないと、更新時にユーザーがnilのエラーが出た
+ deviseで登録したパスワードの更新時にパスワード・確認が空なら更新対象から除外する
```rb
if user_params[:password].blank? && user_params[:password_confirmation].blank?
  user_params.delete(:password)
  user_params.delete(:password_confirmation)
end
```

# ツイート作成
+ tweetsコントローラ作成
  + `docker-compose run web rails g controller tweets`
+ 画像バリデーション用のgemを導入
  + `gem 'active_storage_validations'`


# ツイート詳細ページ作成
+ Commentモデル・commentsテーブル作成
  + `docker-compose run web rails g model comment user:references tweet:references content:text`
+ commentsコントローラ作成
  + `docker-compose run web rails g controller comments`

## レビュー時に伝える事
+ N:1:Nのデータ構造

# いいね機能
+ `likes`テーブル作成
  + `docker-compose run web rails g model like user:references tweet:references`
+ likesコントローラ作成
  + `docker-compose run web rails g controller likes`
+ ユニーク制約のマイグレーション
  + `docker-compose run web rails g migration add_unique_constraint_to_likes`

# リツイート機能
+ `retweets`テーブル作成
  + `docker-compose run web rails g model retweet user:references tweet:references`
+ retweetsコントローラ作成
  + `docker-compose run web rails g controller retweets`
+ ユニーク制約のマイグレーション
  + `docker-compose run web rails g migration add_unique_constraint_to_retweets`
## リツイート

# ユーザーフォロー機能
```rb
# フォローしている人
# follower_id : フォローする側のid, このidを持つユーザーが他のユーザーをフォローしているという関係を示す
has_many :active_relationships, class_name: "Follow", 
                                foreign_key: "follower_id", 
                                dependent: :destroy
has_many :following, throught: :active_relationships, source: :followed
# フォローしてくれている人
# followed_id : フォローされる側のid, このidを持つユーザーを他のユーザーがフォローしているという関係を示す
has_many :passive_relationships, class_name: "Follow", 
                                foreign_key: "followed_id", 
                                dependent: :destroy
has_many :followers, throught: :active_relationships, source: :follower
```
+ Followsテーブル
  + `docker-compose run web rails g model follow follower:references followed:references`
  + follower_idとfollowed_idの組み合わせはただ一つ
  + follower_idとfollowed_idは同じになってはいけない (自己フォロー防止)
+ relationshipsコントローラ作成
  + `docker-compose run web rails g controller relationships`



# ブックマーク機能
+ `bookmark`テーブル作成
  + `docker-compose run web rails g model bookmark user:references tweet:references`
+ bookmarksコントローラ作成
  + `docker-compose run web rails g controller bookmarks`
+ ユニーク制約のマイグレーション
  + `docker-compose run web rails g migration add_unique_constraint_to_bookmarks`



# メッセージ機能
メッセージ一覧を管理するためのRoomモデルを作成


+ ユーザー名用のカラム追加
  + `docker compose run web rails g migration add_username_to_users`
+ Roomモデル
  + メッセージ一覧を管理するために作成
    + `docker compose run web rails g model Room`
  + messagesテーブルにroom_idを持たせるマイグレーションの作成
    + `docker compose run web rails g migration add_room_id_to_messages room:references`
  + roomsテーブルにuser_idを持たせる
    + `docker compose run web rails g migration AddUserIdToRooms user:references`
+ roomsコントローラ
  + `docker compose run web rails g controller rooms`
+ Messageモデル
  + `docker compose run web rails g model message sender_id:references recipient_id:references body:text`
  + `references型`として指定した場合、以下の二点のメリットがある
    + 外部キー制約
      + データベースレベルで外部キー制約が設定され、参照整合性が保たれる。つまり、存在しないuser_idなどが設定されるのを防ぐ
    + インデックスの自動生成
      + 関連するカラムに自動的にインデックスが生成され、ジョイン操作などのパフォーマンスが向上
    + マイグレーションファイルの外部キー関連の記述
      + マイグレーションファイルに`add_foreign_key`のような外部キー制約に関する記述が自動で追加される
+ messagesコントローラ
  + `docker compose run web rails g controller messages`


+ roomsテーブルからuser_idを削除するマイグレーション作成
  + `docker compose run web rails g migration RemoveUserIdFromRooms`
+ Entryモデル/entriesテーブルの作成
  + `docker compose run web rails g model entry user:references room:references`
+ messagesテーブルからuser_idを削除するマイグレーション作成
  + `docker compose run web rails g migration RemoveUserIdFromMessages`

# 通知機能
+ Notificationモデル作成
  + `docker compose run web rails g model Notification`
+ notificationsコントローラ
  + `docker compose run web rails g controller notifications`
+ 通知のメール送信用メーラー
  + `docker compose run web rails g mailer NotificationMailer notification_email`
+ `checkedカラム`のデフォルトを設定
  + `docker compose run web rails g migration AddDefaultToNotificationsChecked`



# メモ (手順外)
+ N+1クエリ問題
  + ビュー内でクエリを実行すると、表示するツイートの数だけクエリが発行されてしまうのでパフォーマンスが悪化する
  + 以下のようにツイートを事前に取得する際に、ActiveRecordの`includesメソッド`を使って関連するユーザーデータを事前に読み込む(プリロード)ことが有効
    + `@tweets = Tweet.includes(:user).all`
+ リモートにpushしたコミットを打ち消したい時
  + 1. `git revert commitハッシュ値`で、指定したコミットまで戻した打ち消しコミットを作成
  + 2. `git reset --hard HEAD^`をやってファイルの変更もコミットも完全に破棄して、`git push origin main -f`
## find, find_by, whereメソッドの違い (2024-02-07)
+ `find`メソッドは、検索する時のキーがidのみ
+ `find_by`メソッドは、検索する時のキーがid以外の場合 (idも可)
  + 返ってくるデータは、最初にヒットした一件のみ
+ `where`メソッドは、検索する時のキーがid以外の場合で、すべてのデータが返ってくる
## 検索条件はモデルにscopeとして移植する
```rb
scope :following_tweets, ->(user_id, page) {
  where(user_id: user_id)
  .includes(:user)
  .order(created_at: :desc)
  .page(page)
  .per(10)
}
```
## マイグレーション (複数カラムの組み合わせを一意にする)
```rb
class AddUniqueConstraintToLikes < ActiveRecord::Migration[7.0]
  def change
    add_index :likes, [:user_id, :tweet_id], unique: true
  end
end

```

## belongs_to関連づけ (モデルのインスタンス名とクラス名が違う場合)
+ 以下のように`belongs_to`関連付けは、指定したモデルのインスタンスとの関連付けを意味しており、:senderIdとしてしまうと、Railsが`SenderId`という名前のモデルを関連付けるものと解釈してしまう
  + そのモデル名から関連しているクラス名を推測できない場合は、`class_name:オプション`でクラス名を明示する
  + そのモデルが、「どの外部キーを使っているのか」を`foreign_keyオプション`で指定する
```rb
belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
```
+ 双方向関連付けの手動設定
  + `has_many, has_one, belongs_to..`などで関連付けを行うときに規約と違う名前を使うときは、`:inverse_of`で関連先から関連名を書くことで、ActiveRecordに双方向の関連付けを教えることができる

## その他
+ whereメソッドは、常に`ActiveRecord::Relation`を返すので、単一のレコードを取得して、.idなどのメソッドを使いたい場合は、`find_byメソッド`を使う
+ ActiveStorageを使用していれば、画像用のカラムを新たにモデルに追加する必要はなく、専用の`active_storage_attachments`と`active_storage_blobs`の2つのテーブルを内部で使用してアップロードされた画像ファイルとアプリケーション内のモデルとの間の関連付けを管理してくれる
+ 改行を考慮した投稿を実現するには、`simple_format`を使う
+ スタッシュを適用して破棄するコマンド : `git stash pop stash@{0}`
+ `git reset --soft HEAD^`で、直前のコミットを無かったことにして、作業内容はワーキングディレクトリにそのまま残った状態で戻る
+ `rails db:migrate`を実行して問題ないことを確認したら、`rails db:migrate:redo`を実行してバージョンを下げた時にエラーを起こさないことを確認する習慣をつける
+ `room.messages.last.body.truncate(10)`で、文字列を切り捨てて省略表示できる
+ 以下のコードだと、`@messages`の要素の数だけ画面をレンダリングするので、テンプレート内ではeach文は使わないようにする
  + each文を使う際は、`render template: 'messages/feed'`としてやる
```rb
= render template: 'messages/feed', collection: @messages
```
