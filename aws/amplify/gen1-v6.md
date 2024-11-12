

+ `schema.graphql`でモデル定義することで、amplifyがquery, mutationなどを自動生成して下さる
+ `src/lib/graphql/queries.ts or mutation.ts`に作成される
  + こいつをインポートしてapi呼び出しを行う

# モデル定義
```graphql
type Note 
  @model
  @auth(
    rules: [
      # 未承認ユーザーに読み取り権限を付与
      {
        allow: public, operations: [read], provider: identityPool
      },
      # 認証済みユーザーに全ての操作を許可
      {
        allow: private, operations: [read, create, update, delete], provider: userPools
      }
    ]
  ) {
    id: ID!
    title: String!
    content: String!
    category: [String]! @index(name: "notesByCategory") # カテゴリ検索用インデックス
    author: Author @belongsTo # noteは一人の著者に属する
}

type Author @model {
  id: ID!
  name: String!
  notes: [Note] @hasMany # 一人の著者が複数のノートを持つ
}
```

# モデル定義->API作成->DB作成のフロー

## 初回のAPI作成時

```zsh
amplify add api
```
+ AppSync APIの初期設定
+ スキーマファイルの作成 (`schema.graphql`)
+ 基本的なIAMロールの設定

## APIの作成
1. `schema.graphql`を編集
2. `amplify push`のみで以下が自動で設定される
   1. App Sync APIの更新
   2. DynamoDBテーブルの作成・更新
   3. 必要なIAMロールの設定
   4. API Client Codeの生成 (`src/lib/graphql/`以下)

## 別途新しい環境を作成するときのフロー

```zsh
# 新しい環境で必要な手順
amplify env add        # 環境の作成
amplify add api       # APIリソースの追加
amplify push          # リソースのデプロイ

# スキーマ更新時の手順
# schema.graphqlを編集
amplify push          # 変更をデプロイ
```