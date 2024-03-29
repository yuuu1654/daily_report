# 6.正規表現
+ 正規表現とは、パターンを指定して文字列を効率よく検索・置換する為のミニ言語
+ emailの正規表現
    + `([\w+.]+)@[a-z0-9\-.]+\.[a-z]+`
    + `/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i`
        + `/` : 正規表現の開始を示す
        + `\A` : 文字列の先頭
        + `[\w+\-.]+` : 英数字、アンダースコア(_)、プラス、ハイフン、ドットのいずれかを少なくとも1文字以上(+)繰り返す
        + `@` : アットマーク
        + `[a-z\d\-.]+` : 英小文字、数字、ハイフン、ドットのいずれかを少なくとも1文字以上繰り返す
        + `\.` :  ドット
        + `[a-z]+` : 英小文字を少なくとも1文字以上繰り返す
        + `\z` : 文字列の末尾
        + `/` : 正規表現の終わりを示す
        + `i` : 大文字小文字を無視するオプション

+ その他の正規表現
    + `{n}` : 直前の文字がちょうどn文字
    + `{n,m}` : 直前の文字がn個以上、m個以下
    + `` : 
    + `[0-9]`は`\d`と同じ
    + `[ABC]` : A,B,Cのいずれか1文字
    + `[a-z]`だと`-`は範囲を意味する
    + `[-az]`だと`-`はハイフンという記号を意味する
    + `.` : 任意の1文字(空白や空白なしも含む)
    + `a|ab` : `a`か`ab`のいずれか
    + `a(b|bc)` : `ab`か`abc`のいずれか
    + `[a-z0-9]+` : aからz、0から9のどれか1文字以上
    + `.+` : 任意の1文字以上
    + `.*` : 任意の0文字以上
    + `(ABC)?` : 文字列ABCがあり、または無し
    + `(?: selected)` : キャプチャする必要がないときは`?:`をつける
    + `\w` : `[a-zA-Z0-9_]`(半角英数字とアンダースコア1文字)と同じ意味
    + `\w+` : `[a-zA-Z0-9_]+`(半角英数字とアンダースコア1文字以上の文字列もしくは単語)と同じ意味
    + `[^AB]` : AでもなくBでもない任意の1文字(`^`が先頭に来たときは否定条件)
    + `[AB^]` : AまたはBまたは^のいずれかの1文字
    + `>(.*)<` : >で始まり、任意の文字が0以上連続し、最後に見つかった<で終わる
    + `>(.*?)<` : >で始まり、任意の文字が0以上連続し、最初に見つかった<で終わる
    + `^` : 行頭を表す
        + `^ab` : 直後の文字が文字列の先頭
    + `$` : 行末を表す
        + `bc$` : 直前の文字が文字列の末尾
    + `\t` : タブ文字を表す
    + `^[ \t]+` : 行頭からスペースやタブ文字が1文字以上続く (←vscodeの.*で行頭のスペースを削除して揃えるときに使える)
    + `\s` : 半角スペースやタブ文字、改行文字など、目に見えない空白文字全般を表す
    + `^.+` : 行頭から何らかの文字が1文字以上続く
    + `` : 
    + `` : 
    + `` : 
    + `` : 
    + `` : 

名前：伊藤淳一
電話：03(1234)5678
電話：090-1234-5678
電話：0795(12)3456
電話：04992-1-2345
住所：兵庫県西脇市板波町1-2-3
+ `\d{2,5}[(-]\d{1,4}[-)]\d{4}`

名前：伊藤淳一
電話：06-9999-9999
住所：兵庫県西脇市板波町1-2-3
`\d\d-\d\d\d\d-\d\d\d\d`

hoge@example.com
hoge.foo@example.net
hoge_bar@foo.jp
+ emailチェック
    + `([\w+.]+)@[a-z0-9\-.]+\.[a-z]+`

Feb 14 07:33:02 app/web.1:  Completed 302 Found ...
Feb 14 07:36:46 heroku/api:  Starting process ...
Feb 14 07:36:50 heroku/scheduler.7625:  Starting ...
Feb 14 07:36:50 heroku/scheduler.7625:  State ...
Feb 14 07:36:54 heroku/router:  at=info method=...
Feb 14 07:36:54 app/web.1:  Started HEAD "/" ...
Feb 14 07:36:54 app/web.1:  Completed 200 ...
+ 上記のログから`heroku/api`と`heroku/scheduler`の行をまとめて抽出
    + `^.+heroku\/(api|scheduler).+$`