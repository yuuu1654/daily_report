# 5.ハッシュやシンボル

+ ハッシュロケットと省略記法
    + `h1 = { :name => "yuuu", :email => "yuuu@gmail.com" }`
    + `h1 = { name: "yuuu", email: "yuuu@gmail.com" }`

+ ハッシュとは、KeyとValueの組み合わせでデータを管理できるオブジェクト
    + 他の言語とかだと連想配列とも言ったりする
+ シンボルは、整数の性質を持った可読性のあるオブジェクト
    + シンボルのobject_idは固定で決まっている
    + ハッシュのKeyとして高速に検索できるので使われる
    + case文の条件などにも使う
+ シンボルの作成
    + `%s(Ruby on Rails)` => `:"Ruby on Rails"`
+ シンボルの配列の作成
    + `%i(Ruby on Rails)` => `[:Ruby, :on, :Rails]`
    + 空文字列が要素の区切りになる
+ nilガード
    + `limit ||= 10`
    + `limit || limit = 10`と同義で、limitがfalseなら、limitのデフォルト値が10となる
    + 変数にnil以外の値を入れておきたい目的で使われる