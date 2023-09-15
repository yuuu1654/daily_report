

# グルーピング・条件指定
+ `group by` は、指定したカラム毎に集計関数(sumなど)を実行して、カラム名と一緒に出力する
+ `where`は、テーブル内のデータから条件に合うデータを抽出
+ `having`は、グルーピングしたデータからさらに条件に合うデータを抽出
+ ``
```sql
select グルーピングをするカラム, 集計関数(集計対象カラム)
FROM テーブル名
WHERE 条件式
GROUP BY グルーピングをするカラム
HAVING 集計関数(集計対象カラム)で条件式
ORDER BY ソート条件

select 商品名, sum(売上金額)
from test_table
WHERE 商品名 != "ジャケット"
group by 商品名
having sum(売上金額) <= 1000000
```

+ SQLの実行順序
```sql
1. from
2. where
3. group by
4. having
5. select
6. order by
```

# テーブルの結合

+ `INNER JOIN` : キーを元に結合して、共通しているレコードのみ表示する
+ `LEFT JOIN` : 左側のテーブルのデータは全て抽出され、右のテーブルにはないものは`NULL`が入る
+ `RIGHT JOIN` : 右側のテーブルのデータは全て抽出され、左のテーブルにないものは`NULL`が入る
+ `OUTER JOIN` : どちらかのテーブルにあるレコードが全て返される

+ `テーブル名 A`は`テーブル名 as A`の省略記法
+ `内部結合` : ONで指定した条件に一致するレコードのみ表示
    + `INNER JOIN`は、内部結合
+ `外部結合` : ONで指定した条件に一致しないレコードも表示
    + `LEFT JOIN, RIGHT JOIN, OUTER JOIN`は、外部結合


```sql
select カラム
from テーブル名 A
inner join テーブル名 B
on A.キー = B.キー
where 条件式
```

# パターンマッチング

```sql
-- サイズが`X`から始まるレコードを抽出
select * from test_table where サイズ like 'X%'

-- Xの後に任意の1文字(合計２文字)のレコードを抽出
select * from test_table where サイズ like 'X_'

-- 10を含まないレコードを抽出
select * from test_table where 商品id not like '%10%'

-- エスケープ処理(特殊文字) => '_1'という文字列で検索したい
select * from test_table where 商品id like '%?_1%' ESCAPE '?'
```



# 範囲指定

+ `between` : where句で範囲指定するときに使う。`数値・日付・時間・文字列`を指定できる
    + カラムを2回書かなくて済むので、可読性が上がる！

```sql
-- 不等号を使った場合
select * from テーブル名 where カラム名 >= 下限値 and カラム名 <= 上限値

-- betweenを使った場合(=> カラムを2回書かなくて済む)
select * from テーブル名 where カラム名 between 下限値 and 上限値

-- ex
select * from test_table where 売上金額 between 10000 and 20000
select * from test_table where 売上日 between '2023-03-01' and '2023-03-31'

-- 売上金額が10000未満、または20000以上
select * from test_table where 売上金額 not between 10000 and 20000
```


# 関数

+ `length(文字数)` :  引数に指定した文字列の文字数を取得

```sql
-- 5文字以上の商品名の文字数を表示
select 商品名, length(商品名) as 文字数だよん
from test_table 
where length(商品名) >= 5
```

+ `distinct` : 値の重複を排除してカラムを取得できる
    + `group by`と同じような機能
+ `distinct`と`group by`の違い
    + `distinct` : 内部の処理で、重複した値を削除している
    + `group by` : 内部の処理で、重複した値を一つにまとめている
+ `distinct`は、特定のカラムを元に集計するような処理には不向き(`group by`を使う)
```sql
-- 値の重複を排除して商品名のカラムを取得
select distinct 商品名 from test_table

-- 値の組み合わせの重複を排除してデータを取得
select distinct category, item from products;

-- カラムに何種類のデータが存在するかを数える場合
select count(distinct 商品名) from test_table

-- 以下の二つのSQLは同じ結果になる(`distinct`と`group by`の違い)
select 商品名 from test_table group by 商品名
select distinct 商品名 from test_table

-- 商品名ごとに数量の合計を集計
select 商品名, sum(数量) from test_table group by 商品

```

+ `substring` : カラムのデータの一部分を切り出して集計や分類を行う
    + 対象の文字列から`開始位置`と`文字数`を指定して文字を切り出すことができる
    + `substring(カラム, 開始位置, 文字数);`
+ `coalesce` : 引数のうち、最初に現れたNULLでない値を返す
+ `group_concat` : 複数レコードの値をカンマ区切りで連結した文字列として表示することができる
+ `` : 
+ `` : 
+ `` : 
+ `` : 
+ `` : 
+ `` : 



# 正規表現
+ `a|ab` : `a`か`ab`のいずれか
+ `a(b|bc)` : `ab`か`abc`のいずれか
+ `^ab` : 直後の文字が文字列の先頭
+ `bc$` : 直前の文字が文字列の末尾
+ `.` : 任意の1文字
+ `.*` : 0文字以上の任意の文字列
+ `.+` : 1文字以上の任意の文字列
+ `a?` : ?の直前の文字列が0回か1回
+ `a{3}` : 直前の文字を3回繰り返す (ex. aaa)
+ `a{3,}` : 直前の文字を3回以上繰り返す (ex. aaabc, aaaaabc)
+ `a{,3}` : 直前の文字を3回以下繰り返す (ex. aabc, aaabc)
+ `a{3,4}` : 直前の文字を3回以上4回以下繰り返す (ex. aaabc, aaaabc)
+ `` : 
+ `` : 
+ `` : 

```sql
-- 社員IDが、a00,a01のどちらかのレコードを取得
SELECT * FROM test_table
WHERE "社員ID" REGEXP 'a(00|01)';

-- SELECT * FROM test_table
-- WHERE "社員ID" REGEXP 'a(00|01)';

-- 社員IDのaと3の間に「0」を0回か1回繰り返すレコードを抽出
select * from test_table where "社員ID" REGEXP 'a0?3'

-- 社員IDで0を2回以上繰り返すレコードを抽出
select * from test_table where "社員ID" REGEXP '0{2,}'

-- 社員IDがaで始まり、「03」or「52」で終わるレコードを抽出
select * from test_table where "社員ID" REGEXP '^a.*(03|52)$'
```

# 桁を揃える
+ `round` : 桁数を揃えるために四捨五入する
    + `round(数値, 1)` => 12.3
    + `round(数値)`とすると整数表記になる
```sql
select 偏差値, round(偏差値) from test01
```

# 条件分岐
+ 例えば、テストの点数によって合否を記載するカラムを作りたいとするとき
+ `単純case式` : カラムの値が指定した値と等価かどうかを判断して処理を分岐
    + 等価判定の際によく使う
    + コードがシンプルなので、こっちで書ける際は使うようにする
+ `検索case式` : 様々な条件を指定して処理を分岐
    + 複雑な条件も可能
    + 単純case式を書き換えられる
+ `` : 
+ `` : 

```sql
-- 単純case式
case カラム
    when 値1 then 結果1
    when 値1 then 結果2
    .
    .
    else 結果3
end カラム名(<= 結果の列につける新たな名前)
-- ex) 数学の点数が1ならc、4ならa、それ以外ならb
select * , 
    case 数学
        when 1 then "c"
        when 4 then "a"
        else "b"
    end 成績
from test01

-- 検索case式
case
    when 条件式1 then 結果1
    when 条件式1 then 結果2
    .
    .
    else 結果3
end カラム名(<= 結果の列につける新たな名前)
-- ex) 数学の点数が1ならc、4ならa、それ以外ならb
select * ,
    case 
        when 数学 = 1 then "c"
        when 数学 = 4 then "a"
        .
        .
        else "b"
    end 成績
from test01


/*
売上日の期間を指定する
売上金額が100,000円以上 => キャッシュバック10,000円
売上金額が50,000円以上で100,000円未満 => キャッシュバック3,000円
売上金額が50,000円未満 => キャッシュバック1,000円
 */
select *,
    case 
        when 売上日 between '2020-01-01' and '2020-01-31' THEN
            case 
                when 売上金額 >= 100000 then 10000
                when 売上金額 >= 50000 then 3000
                else 1000
            end
        else 0
    end キャッシュバック
from test_table
```



# PostgreSQLの環境構築

```zsh
brew install postgresql
brew install pgadmin4
```
+ バージョン確認
```sh
psql --version
```

+ postgresqlを起動
```sh
postgres -D /usr/local/var/postgres
```

```sh
# 任意の名前のユーザーを作成
createuser -P workuser

# 今あるデータベースの確認
psql -l

# 接続
psql -d <データベース名>
```