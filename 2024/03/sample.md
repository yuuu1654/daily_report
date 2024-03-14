バックエンドの課題
JavaScriptファイルでは、ルートhttps://coderbyte.com/api/challenges/json/age-counting、GETリクエストを実行するプログラムを持っています。このルートはデータキーを含み、値はkey=STRING, age=INTEGERのフォーマットで項目を含む文字列です。

あなたの目標は、インデックス10から15までのキーIDを文字列形式で出力することです（例：q3kG6,MGQpf,tg2VM,...）。提供されたプログラムはすでにデータを解析し、各項目をループしていますが、keyArrayにキーIDだけを正しく入力するように修正する方法を見つける必要があります。


文字列の挑戦
StringChallenge(str)関数に、strの2つの奇数の間にダッシュ('-')を、2つの偶数の間にアスタリスク('*')を挿入させる。例：strが4546793の場合、出力は454*67-9-3となる。ゼロを奇数または偶数としてカウントしないでください。

以下の仕様をもとにコードを完成させてください

関数SearchingChallenge(str)は、渡されたstrパラメータを受け取り、繰り返された文字の数が最も多い最初の単語を返すようにする。例えば: "Today, is the greatest day ever!" なら greatest を返す 「なぜなら、eが2つ（とtが2つ）あり、eが2つあるeverの前に来るからです。繰り返し文字を含む単語がない場合は-1が返されます。単語はスペースで区切られる。


ex 
input: "Hello apple pie"
output: "Hello"

input: "No words"
output: -1

`function SearchingChallenge(str) {
  const words = str.split(' ')

  words.forEach(word => {
    
  });
}`