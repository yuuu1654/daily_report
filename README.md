# daily_report

+ 文字列の破壊的変更とは？
+ Rails APIモード 実装手順
  + ルーティング定義
  + コントローラ作成
  + シリアライズ用のクラス作成
  + 疑問
    + apiモードだと、ルーティングを定義してコントローラを作成してcrud処理を定義したらapiとして機能するのか？
    + pagy gem





+ Railsのバリデーションで `%w(文字列配列)` ではなく、`%i(シンボル配列)`を利用する理由
  + バリデーションだけではなく、Railsの設定などでも使用
  + パフォーマンスの観点
    + シンボルは同じ値であれば同じオブジェクトidを持つ (イミュータブル)
      + 文字列たと、同じ値でも新しいオブジェクトとして作成される
      ```rb
      # シンボルの場合
      :user_id.object_id == :user_id.object_id  #=> true
      # 文字列の場合
      "user_id".object_id == "user_id".object_id  #=> false
      ```
    + メモリの使用量も軽量なので推奨される
      + 文字列を渡しても内部的にシンボルに変換されることが多い？

+ pagy gem
  + `page.rb`にて一ページあたりのページ数を指定できる
  + コントローラで`include Pagy::Backend`とする
  + メタデータに以下の情報を持つ
    ```json
    {
      "articles": [...],
      "meta": {
        "count": 100,    // 総レコード数
        "page": 2,       // 現在のページ
        "items": 25,     // 1ページの表示件数
        "pages": 4       // 総ページ数
      }
    }
    ```

+ Alba (JSONシリアライザーの特徴)
  + メモリ効率がいい
    + オブジェクトの生成を最小限に抑えてくれる
  + 高速なシリアライズ処理
  + シンプルなDSL
  
## 関連付けのeager loading
+ `includes`
  + 一回のクエリで関連データを取得
  + メモリ上でjoinを行う
  + 関連付けが多い場合に効率的

```rb
# 基本的な使い方
posts = Post.includes(:user, :comments)

# ネストした関連
posts = Post.includes(comments: :user)

# whereなどとの条件絞り込みと併用する場合 (イベントに複数のプログラムA, B, C...が紐づいていると仮定)
def set_programs
    @q = propram
      .where(deleted_at: nil) #条件の絞り込み (公開されているプログラム)
      .includes(:event) # 条件を絞り込んで、includesで関連データを読み込む
      .ransack(params[:q])
    @q.sorts = params[:sorts] if params[:sorts].present?
    
    @programs = @q.result(distinct: true)
  end
```


+ `preload`
  + 別々のクエリを発行
  + where句と併用できない？
```rb
posts = Post.preload(:comments)
```


+ `eager_load`
  + left outer joinで関連データを取得
```rb
posts = Post.eager_load(:comments)
```
























