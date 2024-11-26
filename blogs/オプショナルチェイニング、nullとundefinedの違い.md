

- `null`と`空配列`は別物
  - null
    - 値が存在しない、未定義
    - どんなメソッドも使用できない
  - []
    - 要素が 0 個の配列が存在する
    - 配列のメソッドが使用可能

```ts
const tags = data?.notes?.items[0]?.tags || [];

// 以下でtagsに対して配列用のメソッドを使用するときに、上記の　|| [] が存在しないと、型がobjectのデータに対して (undefined)メソッドを実行することになるため
{
  tags.map((tag) => <div>{tag}</div>);
}
```

- `オプショナルチェイニング`とは？
  - null や undefined のプロパティを誤って参照しないようにしつつ、記述量を抑えられる書き方
  - もしも、`?.`に先行する変数やプロパティの値が`nullまたはundefined`の時は、その先のプロパティは評価されず、`undefined`が返却される
- オプショナルチェイニングの挙動
  - 複数の階層になっていて、大元のオブジェクトが null だったら、例えばその二つ下の変数にアクセスした際に、オプショナルチェイニングを使用していないとエラーになる

```ts
// 例1: 正常なデータがある場合
data = {
  listPatientNotes: {
    items: [{ tags: ["tag1", "tag2", null] }],
  },
};
data?.listPatientNotes?.items[0]?.tags; // ['tag1', 'tag2', null]

// 例2: dataがnullの場合
data = null;
data?.listPatientNotes?.items[0]?.tags; // undefined

// 例3: itemsが空配列の場合
data = {
  listPatientNotes: {
    items: [],
  },
};
data?.listPatientNotes?.items[0]?.tags; // undefined
```

- `null`と`undefined`の違い
  - `undefined`
    - 値が代入されていないため、値がない
    - 自然発生する
    - 変数
    - typeof 演算子の結果は、`undefined` となる
  - `null`
    - 代入すべき値が存在しないため、値がない
    - 自然発生しない
    - リテラル
    - typeof 演算子の結果は、`object` になる
  - 基本的には、undefined を使用する
  - null は自然発生しない
    - 何も代入していない変数をログに出す => undefined になる
  - 
