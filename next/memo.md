
+ `rm -rf .next/cache`
  + nextのキャッシュ削除
  + imageサーバーで持っている画像のリフレッシュをする場合とかに使う

- `クライアント`
  - ユーザーのデバイス上のブラウザのこと
  - アプリケーションコードの要求をサーバーに送信する
  - 次に、サーバーから受信した応答をユーザーが操作できるインターフェースに変換する
  - 注意
    - クライアントでデータを取得する際に、データベースを直接クエリしないようにする (データベースの紐つ情報が漏洩してしまう恐れがある為)
- `サーバー`
  - アプリケーションコードを保存し、クライアントからの要求を受信し、計算を実行し、適切な応答を返すデータセンター内のコンピュータを指す
+ `Server Action`？
  + form要素のactionに`"use server"`をつけた関数を渡すことで、JavaScriptではなくHTMLの機能だけを用いてサーバーにデータを送信することを可能にする技術
  + Next13.4から導入された
  + [【Next.js】Server Actionsを現場で使うテクニック](https://zenn.dev/rio_dev/articles/eb69fae0557f20)
  + データ取得などの重い処理を非同期で実行できる
  + そもそもformに文字を入力して送信ボタンを押したら、onClick->api client呼び出し->api-call関数の流れだったが、サーバーアクションになると直接apiをコールできる
  + 使い所
    + 以下のようなサーバーサイドで実行する必要がある処理を直接コンポーネントから呼び出せる
      + フォーム送信
      + DB操作
      + ファイル操作
    + アロー関数で定義するとエラーになることがあるので、従来のfunction定義をなるべく使用する
    ```tsx
    async function addPostAction () {
      "use server"; //これを定義しないとエラーになる
    }
    return (
      <form action={addPostAction}>
      </form>
    )
    ```
+ `Server Compornent`？
  + コンポーネントのレンダリングをサーバーで行う (SSR)
  + 機密情報などがクライアント側にもれないので、セキュリティ的に安全
  + 従来のSSRだと、hydration(サーバーがhtmlを生成->clientにhtmlを送信->jsの読み込み->`イベントリスナの追加やステート管理の初期化を行う` <-これ)
  + メリット
    1. データフェッチが高速になる
       1. サーバーがAPIやデータセンターと物理的に近い位置にある
    2. サーバー側でレンダリング(SSR)されるのでJSバンドルサイズが削減される
       1. client側で処理するJSの総量
       2. ClientCompornentはJSバンドルに含まれるので注意
       3. 逆にRSC Palyload (React Server Components Payload) 転送量が増えてしまう (トレードオフの関係)
    3. クライアントのスペックにほぼ依存しなくなる
    4. SEOの向上
    5. セキュリティの強化
       1. APIキーやDBのクエリ
  + ベストプラクティス
    + なるべくServerCompornentを使う
    + 末端のコンポーネントをClientCompornentにする
      + 上位層のコンポーネントをClientCompornentにすると、その下のコンポーネントすべてClientCompornentになってしまう(Compornent boundary)
  + 使い所
    + データfetchが必要なコンポーネント
    + SEO重視のコンテンツ
    + 静的なUI部分
+ `SSR (Server-Side-Rendering)`
