
# 画像のキャッシュ削除
- next のキャッシュ削除
- image サーバーで持っている画像のリフレッシュをする場合とかに使う

```zsh
rm -rf .next/cache
```

# クライアント・サーバー
## クライアント
  - ユーザーのデバイス上のブラウザのこと
  - アプリケーションコードの要求をサーバーに送信する
  - 次に、サーバーから受信した応答をユーザーが操作できるインターフェースに変換する
  - 注意
    - クライアントでデータを取得する際に、データベースを直接クエリしないようにする (データベースの紐つ情報が漏洩してしまう恐れがある為)
## サーバー
  - アプリケーションコードを保存し、クライアントからの要求を受信し、計算を実行し、適切な応答を返すデータセンター内のコンピュータを指す

# Server Action
- form 要素の action に`"use server"`をつけた関数を渡すことで、JavaScript ではなく HTML の機能だけを用いてサーバーにデータを送信することを可能にする技術
- Next13.4 から導入された
- [【Next.js】Server Actions を現場で使うテクニック](https://zenn.dev/rio_dev/articles/eb69fae0557f20)
- データ取得などの重い処理を非同期で実行できる
- そもそも form に文字を入力して送信ボタンを押したら、onClick->api client 呼び出し->api-call 関数の流れだったが、サーバーアクションになると直接 api をコールできる
- 使い所
  - 以下のようなサーバーサイドで実行する必要がある処理を直接コンポーネントから呼び出せる
    - フォーム送信
    - DB 操作
    - ファイル操作
  - アロー関数で定義するとエラーになることがあるので、従来の function 定義をなるべく使用する
  ```tsx
  async function addPostAction() {
    "use server"; //これを定義しないとエラーになる
  }
  return <form action={addPostAction}></form>;
  ```

# Server Compornent
- コンポーネントのレンダリングをサーバーで行う (SSR)
- 機密情報などがクライアント側にもれないので、セキュリティ的に安全
- 従来の SSR だと、hydration(サーバーが html を生成->client に html を送信->js の読み込み->`イベントリスナの追加やステート管理の初期化を行う` <-これ)
- メリット
  1. データフェッチが高速になる
     1. サーバーが API やデータセンターと物理的に近い位置にある
  2. サーバー側でレンダリング(SSR)されるので JS バンドルサイズが削減される
     1. client 側で処理する JS の総量
     2. ClientCompornent は JS バンドルに含まれるので注意
     3. 逆に RSC Palyload (React Server Components Payload) 転送量が増えてしまう (トレードオフの関係)
  3. クライアントのスペックにほぼ依存しなくなる
  4. SEO の向上
  5. セキュリティの強化
     1. API キーや DB のクエリ
- ベストプラクティス
  - なるべく ServerCompornent を使う
  - 末端のコンポーネントを ClientCompornent にする
    - 上位層のコンポーネントを ClientCompornent にすると、その下のコンポーネントすべて ClientCompornent になってしまう(Compornent boundary)
- 使い所
  - データ fetch が必要なコンポーネント
  - SEO 重視のコンテンツ
  - 静的な UI 部分

# SSR (Server-Side-Rendering)

# キャッシュ制御
- `no-store`を指定するとキャッシュされない (再リロードするとデータが変わる)
- `force-cache`を指定すると、キャッシュされて、リロードしても表示データが変わらない
  - 何も指定しないとデフォルトで`force-cache`となる
- `revalidatePath`
  - データ更新後に特定のページやルートのキャッシュを無効化
  - 動的なコンテンツ更新が必要な時に使う (最新のデータを表示)




# next.jsで`/[id]/page.tsx`の時にidを動的に取得する方法
+ searchParams
+ propsとして `( {params}: {params: {id: string} } )`paramsを受け取る
+ paramsからidとして展開して格納 `const { id } = params;`
+ nextの動的ルーティング
  + 以下のroute
    + route :` app/posts/[id]/page.tsx`
    + url : `posts/930fsfie029r`
    + `params : { id: 930fsfie029r }`

# next-authでは、jwtベースの認証を採用しており、以下のようなコードで、認証済みであればAPIのリクエストヘッダーにAuthorizationを指定する
  + APIリクエストのヘッダーに`Authorizationトークン (アクセストークン) `を付与することで、ユーザーが認証された状態でAPIを使用できるようになる
  ```ts
  const createPost = useCallback(async (input: CreatePostInput) => {
    const { data, errors } = await client.graphql({
      query: createPost,
      authMode: "none",
      variables: {
        input: input
      }
    }, session.data?.access_token ? { Authorization: session.data.access_token } : undefined)
    return { data, errors }
  }, [session.data?.access_token])
  ```

# Next 標準コンポーネント
+ `Link`コンポーネントは、next.jsの組み込みのプリフェッチ機能を使用するので、読み込み速度が`router.push()`よりも高速になるので、こちらを使うようにする