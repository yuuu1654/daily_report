
4
+ コールバックとは、「然るべきタイミングが来たらこの処理を呼んでください」などのように、後で呼んで欲しい処理を予め指定しておく仕組みを指すプログラミング用語
+ Railsのセッションの仕組みの一部が、Cookieによって実現されている


5
+ Railsアプリを数年に渡り継続的に開発・運用していくのなら、利用しているRubyやRails、各種gemのバージョンを最新版にあげておくという事が非常に重要
+ バージョンアップを行うにあたって、既存機能が想定通りに動作しているかを自動的に確認できるテストが備わっているかどうかは、死活問題と言っても良いほどに重要


6
+ 開発環境で本番用のエラー画面を出して動作確認したい時は、`config/environments/development.rb`の`consider_all_requests_local`をfalseに変更すれば実現する
+ CSRFを防ぐには、そのリクエストがユーザーの意図によるものかを確認する必要がある
+ Railsには標準で、`同じWebアプリから生じたリクエストであることを証明するためのセキュリティトークンを発行し、照合する仕組み`を備えている(form_with)


10
+ コントローラの共通化のためのモジュールは、`app/controllers/concerns`に配置する


 # GemfileとGemfile.lockについて

+ Rails Serverを起動するにはGemfile.lockに記載されているgemが事前にインストールされている必要がある
+ Gemfile.lockに記載されているgemがインストールされていなかったり、バージョンが異なる場合にはエラーが出て起動に失敗する
    + こういった場合には、コンテナで`bundle install`コマンドを実行して、Gemfile.lockに沿ったgemをインストールする事で対処できる

+ `RUN bundle config --local path vendor/bundle`で、gemの保存先をvendor/bundleに変更して、gemのバージョンをgitで管理するようにできる
+ gemでインストールされたコマンドを実行する場合、`bundle exec <コマンド>`という形式でコマンドを実行する必要がある
+ `vendor/bundle`は、Bundlerを使用してRubyのプロジェクトでgemの依存関係を管理する際の、カスタムの
gemインストールパスであり、デフォルトでは、Bundlerはシステムのgemディレクトリにgemをインストールする
+ Controllerとしての機能を持たせるためには、ApplicationControllerを継承しないといけない
+ gem "sassc-rails", "2.1.2" # Sassをプリコンパイルするためのgem
+ gem "mini_racer", "0.8.0" # Rails環境でJavaScriptを実行するためのgem
+ インストールしたいgemをGemfileに記載したら、再度 `docker compose build` を実行することで、gemがインストールされる
+ プリコンパイルとは、プログラミング言語のコンパイルとは少し違っていて、アセットパイプラインによるファイルの連結や圧縮などの最適化処理のことを指す
+ ローカル環境のJSファイルを更新したら、`ctrl + c`でコンテナを停止して、再度`docker compose up`だけで問題なく反映される
+ `PATCH`はリソースの部分更新で、`PUT`はリソースの置き換え
    + どちらもリソースの更新に使用するもので、Railsにおいては基本的には動作は同じ
    + 役割的には、「置き換え」というよりも「更新」の場合がほとんどなので、`PATCH`を使った方が適切
+ Controller内で定義したインスタンス変数は、Viewテンプレートの中でも参照することができる
+ `form_withヘルパー`は、渡されたモデルオブジェクトに応じて、パスとメソッドをRESTfulの形に沿って設定してくれる
+ form_withを使用した際は、セキュリティ対策の一環として、自動でCSRF対策をしてくれる
    + POSTする際に`authenticity_token`が一緒に送信されて、トークンの有効性チェックを行なってくれる
    + トークンの内容はRailsが自動で管理してくれている
+ `rails generate`コマンドで新たに追加されたファイルや既存のファイルに追記されたコードは、`rails destroy`コマンドで元に戻せる

# 　モデル・DB
+ マイグレーションファイルは、データベースに新しくテーブルを作成したり、テーブルの定義に変更を加える際に使用されるファイル
+ `rails db:seed`コマンドは、データベースのシードデータをロードするために使う
    + `db/seeds.rb`ファイル内に記載されたコードが実行され、コードに従ってDBに初期データが挿入される
    + 開発初期やテスト用のデータセットアップ、本番環境でのマスターデータのロードなどに利用される
    + `rails db:seed`は、基本的に冪等性はない状態にして使う
    + `seeds.rb`で、`Product.create!`としてやると、例外を意図的に発生させることができる
+ DockerとDocker Compose を使用している開発環境のデータベース内のデータを確認するには、`docker compose run web rails console`を使用
+ Railsのモデルには、登録、更新、削除...といったライフサイクルが存在していて、これらの重要なイベントの前後に任意の処理を挟むことができる
    + この仕組みを`コールバック`と呼ぶ
+ コールバックという言葉は、`「然るべきタイミングが来たら、この処理を呼んでください」`みたいに、あとで呼んでほしい処理を予め指定しておく仕組みを意味するプログラミング言語
+ Userモデルに`has_secure_password`メソッドを追加すると以下の機能が使えるようになる
  + セキュアにハッシュ化したパスワードを、DB内の`password_digest`という属性に保存できるようになる
  + 2つの仮想的な属性 (`password`、`password_confirmation`)が使えるようになり、存在性と値が一致するかどうかのバリデーションも追加される
  + `authenticateメソッド`が使えるようになる(引数の文字列がパスワードと一致するとUserオブジェクトを返し、間違っているとfalseを返すメソッド)
+ モデルの作成 (p.94)
  + `rails g model User name:string email:string password_digest:string is_admin:boolean`
  + 4種類のファイルが生成される
    + 1. モデルクラスのソースコード `app/models/user.rb`
    + 2. マイグレーションファイル `db/migrate/20231125.._create_users.rb`
    + 3. モデルの自動テスト `test/models/users_test.rb`
    + 4. モデルの自動テストで使うfixtureファイル `test/fixtures/users.yml`
+ モデルの削除
  + `rails destroy model User`
+ 現状のマイグレーションの履歴を確認
  + `docker compose run web rails db:migrate:status`
+ 指定したマイグレーションバージョンまで戻す
  + `docker compose run web rails db:rollback STEP=2`
+ データをリセット
  + 一度`docker compose down`でコンテナを停止・削除してから以下を実行
  + `docker compose run web rails db:migrate:reset`
+ seedデータ再投入
  + `docker compose run web rails db:seed`

+ `Session`について
  + Session情報は、ブラウザのCookieに保存される
  + ユーザーがアプリケーションに新しくアクセスする時に自動的にSessionを作成
  + ユーザーがすでにアプリを利用していたら、既存のSessionを利用
  + Cookieは4KB弱の容量しかないので、巨大なオブジェクトはなるべく格納しないようにする
+ `params`について
  + `params`は、リクエストから送信されるパラメータを処理するための方法
  + クライアントから送信されるデータはparamsハッシュを通してコントローラーに渡ってくる
  + 以下のようにルーティングに`:id`が含まれている場合はparamsハッシュを通じてアクセスできる
    + `@product = Product.find(params[:id])`
  + form_withなどを用いたフォーム送信で送られてくる値もparamsハッシュを用いて取得できる
    + `@user = User.new(params[:user])`


+ `item[:product_id]`と`item["product_id"]`の違いは、ハッシュにデータを格納する際に文字列をキーにして格納したか、シンボルをキーに格納したかで使い分ける
+ `logger.debug "Cart items: #{@cart_items.inspect}"`でオブジェクトのデータ構造などをより詳細にログとして出力することができる
+ link_toでpost送信したい時は以下のようにして記述する
  + `<%= link_to 'Add to cart', add_to_cart_path(product_id: product.id), data: { turbo_method: :post }, class: 'btn btn-outline-dark mt-auto' %>`
+ 全てのセッション情報を破棄したい場合は、`reset_session`としてやる

+ DBの一部のカラムの型を修正したい場合はchangeメソッドではなく、upメソッドとdownメソッドを使用する
  + changeメソッドは、Railsが自動的にロールバック操作を推論できる時に使う
+ Railsのマイグレーションは、DBの変更履歴を追跡するためのものなので、`一度適用されたマイグレーションファイルは不変である`というのが一般的な考え方
  + なので、すでに適用されたマイグレーションファイルの内容を変更するのではなく、新しいマイグレーションファイルを作成するのがベストプラクティス

+ `buildメソッド`は、関連づけられた新しいオブジェクトをメモリ上に作成(newに相当)するが、すぐにはDBに保存しない(データを永続化しない)
  + 別途`saveメソッド`を呼び出すことで、データが永続化される
+ `createメソッド`は、関連づけられた新しいオブジェクトをメモリ上に作成し、すぐにDBに保存する
  + 内部的に`buildメソッド`を呼び出してオブジェクトをインスタンス化し、続いて`saveメソッド`を呼び出してオブジェクトをDBに保存

# メール送信
+ `docker compose run web rails g mailer OrderMailer order_detail`
  + 生成されるファイル▼
    + `mailers/order_mailer.rb`
      + メーラークラスを定義
      + ActionMailerの機能を利用して、具体的なメール送信のためのロジックを定義
    + `app/views/order_mailer/order_detail.html.erb`と`app/views/order_mailer/order_detail.text.erb`
      + メール本文を定義するためのテンプレート
    + `test/mailers/order_mailer_test/rb`
      + 単体テスト用のファイル
    + `test/mailers/previews/order_mailer_preview.rb`
      + メーラーのプレビューを生成するためのファイル
      + 実際にメールを送信することなくメールのレイアウトやコンテンツを確認できる
  
+ dev環境で、メール送信されることを確認
  + https://zenn.dev/y_taiki/articles/action_mailer
  + 1. `letter_opener_web`をGemfileに追記して、bundle install
  + 2. `routes.rb`に以下を追記
    ```rb
    # routes.rb
    Rails.application.routes.draw do
      mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
    end
    ```
  + 3. `config/environments/development.rb`に以下を追記
    ```rb
    Rails.application.configure do
      config.action_mailer.delivery_method = :letter_opener_web
    end
    ```
  + 4. `http:localhost:3000/letter_opener`にアクセス


# Rake
+ `Rake`とは、Rubyで書かれたコードをタスクとして作成し、必要に応じて呼び出して実行できる機能
+ Rakeタスクを利用する場面としては以下の場合がある
  + 何かしらのデータ連携
  + データベースのバックアップ
  + 定期的にデータを更新・削除する


# モデルの関連性
+ `optional: true`の使い方
  + 以下のコードの場合、
    + プロジェクトには複数のユーザーが所属する場合がある (ただし、誰もユーザーが配置されていない場合もある)
    + ユーザーはプロジェクトに所属する (ただし、どこのプロジェクトに所属していないユーザーも存在できる)
```rb
class Project < ApplicationRecord
  has_many :user
end


class User < ApplicationRecord
  belongs_to :project, optional: true
end
```

# `bundle exec rake`と`rails`コマンドの違い
+ コマンドの範囲
  + `rake`は、Rubyのための汎用的なタスクランナーで、Rails以外のプロジェクトでも使われる
  + `rails`コマンドは、Rails固有のタスクに特化している
+ 使用するRailsのバージョン
  + Rails5.0以降では`rails`コマンドを使用することを推奨
  + Rails4.2以前では、これらのタスクには`rake`コマンドを使う
+ `bundle exec`の使用
  + Bundlerを使用して、正しいバージョンのgemを使ってコマンドを実行 (依存関係の衝突を防ぐために重要)
  + `rails`コマンドを使う場合、Bundlerが自動的に正しいバージョンのRailsを使ってくれる

### `Hotwire (Turbo)` 
+ `Turbo`は、Turbo Streamsを介して動作し、小さなHTMLスニペット(断片)をWebSocketで直接ページに送信する
+ `respond_to`メソッド
  + `format.html`と`format.turbo_stream`の行のうち1つしか実行されない (if-elsif的に実行される)
  + `format.turbo_stream`を追加すると、Railsが`<アクション名>.turbo_stream.erb`のファイルを探索する
+ `Hotwire`とは、Rails7からRailsのデフォルトになった、モダンなWebアプリケーションを作るための新しいアプローチのこと
  + `Turbo`・`Stimulus`・`Strada`という3つの技術から構成される
  + Turboは、`Turbo Drive`・`Turbo Frames`・`Turbo Streams`・`Turbo Native`の4つの技術から構成される
  + Turboは、Hotwireの中核となるJavaScriptライブラリで、Turboを使うとJavaScriptを書かずにSPAを実現できる
  + フロントエンドの技術選定では、ReactかVueを選択するのが主流だが、Hotwireが最適なケースも結構存在する
```rb
respond_to do |format|
  format.html { redirect_to user, status: :see_other }
  format.turbo_stream
end
```

### `gem install [gem名]`とGemfileに記述して`bundle install`する時の違い
+ `gem install [gem名]`
  + 指定されたgemをRuby環境に直接インストールする
  + インストールされたgemは、システムの全てのRubyプロジェクトで利用可能
  + プロジェクトごとの依存関係の管理は行われない
  + 特定のプロジェクトのGemfileには影響を与えない
+ Gemfileに記述して、bundle install
  + 特定のRubyプロジェクトの依存関係を管理するために使用される
  + 記述されたgemは、bundle installすることで、そのプロジェクト用にインストールされる
  + プロジェクト内でのみこれらのgemが利用可能