+ Next.js 
  + `Server Action`？
    + Next13.4から導入された
    + [【Next.js】Server Actionsを現場で使うテクニック](https://zenn.dev/rio_dev/articles/eb69fae0557f20)
    + データ取得などの重い処理を非同期で実行できる
    + 使い所
      + 以下のようなサーバーサイドで実行する必要がある処理を直接コンポーネントから呼び出せる
        + フォーム送信
        + DB操作
        + ファイル操作
  + `Server Compornent`？
    + コンポーネントのレンダリングをサーバーで行う
    + 機密情報などがクライアント側にもれないので、セキュリティ的に安全
    + メリット
    + 使い所
      + データfetchが必要なコンポーネント
      + SEO重視のコンテンツ
      + 静的なUI部分
  + `SSR (Server-Side-Rendering)`