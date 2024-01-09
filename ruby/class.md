# 7.クラス
+ クラスは`データ`と`処理`をまとめたものである
+ データの事を`インスタンス変数`、処理の事を`メソッド`という
+ `インスタンス変数`はクラス内で定義された変数で、代入したり参照することができる
+ インスタンス変数と変数の違いは、クラスの中にあるかクラスの外にあるか
+ インスタンス変数はクラスの中でしか使えない

+ クラスの中で呼び出されるメソッドを`インスタンスメソッド`という
    + `インスタンスメソッド`は、そのインスタンスに固有の状態や動作を保つ

+ インスタンスに依存しないメソッドを`クラスメソッド`という
    + クラスメソッドは、クラスそのものに関連する動作を持つため、インスタンスを作成せずともクラス名を使って直接呼び出すことができる

+ クラスの外で呼び出される関数を`関数的メソッド`という
+ インスタンス変数はオブジェクトのメソッドからのみ参照できる
+ アクセサを定義することで、オブジェクトの外からインスタンス変数を参照できる
```rb
class Student
    def initialize
        @name = "ブガール・ケラモフ" # インスタンス変数
    end

    def avg(science, japanese)
        p @name, (science + japanese) / 2
    end
end
```

```rb
class User
    # @name, @ageを読み書きするメソッドが自動的に定義される
    attr_accessor :name, :age
    # コンストラクタ User.new(〜)した時、すなわちインスタンス作成時に呼び出される
    def initialize(name, age)
        # インスタンス変数はクラスの外部から参照できない
        @name = name
        @age = age
    end
    # インスタンスメソッド
    def hello
        "Hello, #{@name}"
    end
    # クラスメソッド
    def self.create_users(names)
        name.map do |name|
            User.new(name)
        end
    end
    # アクセサ (attr_accessorで以下のアクセサを省略できる)
    # getterメソッド => インスタンス変数を外部から参照する為のメソッド
    def name
        @name
    end
    # setterメソッド => インスタンス変数を外部から変更する為のメソッド
    def name=(value)
        @name = value
    end
end
names = ["Alice", "Bob", "Michel"]
users = Users.create_users(names) # クラスメソッドの呼び出し

user = User.new("Alice", 23)
# @nameを変更する
user.name = "Marie"
# @nameを参照する
user.name #=> "Marie"
```

+ `privateメソッド`
    + `privateメソッド`になるのはインスタンスメソッドのみ
    + 他の言語は、privateメソッドはそのクラスの内部のみでしか呼び出せない
    + rubyは、そのクラス内部だけでなく、サブクラスでも呼び出すことができる
+ `protectedメソッド`は、そのメソッドを定義したクラス自身と、そのサブクラスのインスタンスメソッドからレシーバー付きで呼び出すことができる
    + 同じクラスのインスタンスメソッド内であればプロパティ
```rb
class User
    # weightは外部に公開しない
    attr_reader: name

    def initialize(name, weight)
        @name = name
        @weight = weight
    end

    def heavier_than?(other_user)
        other_user.weight < @weight
    end

    protected

    def weight
        @weight 
    end
end
# クラスの外部でインスタンス作成して体重を比較するメソッドの呼び出し
takasi = User.new("Takasi", 67)
marie = User.new("Marie", 45)

# 同じクラスのインスタンスメソッド内であればweightが呼び出せる！
takasi.heavier_than?(marie) #=> true
marie.heavier_than?(takasi) #=> false
# クラスの外ではweightは呼び出せない
marie.weight #=> protected method "weight" called for ....
```