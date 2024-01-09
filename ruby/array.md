# 4.配列
+ 配列の作り方
    + numbers = [1, 2, 3, 4, 5, 6]
+ `selectメソッド`
    + 各要素に対してブロックを評価し、その戻り値が真になる要素を集めた配列を返すメソッド
```rb
juices = ["Pepsi", "Monster", "irohasu"]
available_drinks = juices.select { |name| can_purchase?(name, suica) }
```
