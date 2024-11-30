
# `ts-node`について
- `ts-node`は、typescriptファイルを直接実行するためのランタイム
  - ts-nodeで、直接typescriptファイルを実行するのではない
  - ts-nodeによって、typescript形式のファイルを、内部で実行環境として動作している`Node.js`で実行可能な`commonjs形式`に変換して実行されるというフロー
  - なので、以下のようにコマンド実行時にcommonjs形式にコンパイルする必要がある
    - `ts-node --compilerOptions '{\"module\":\"commonjs\"}' src/lib/scripts/seed.ts`
  - ts-node経由で実行されるtypescriptのスクリプトファイルは、環境変数を自動的に読み込めないので、`dotenv`などのパッケージで明示的に環境変数を読み込む必要がある

# hoge