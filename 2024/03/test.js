// const https = require('https');

// https.get('https://....', (resp) => {
//   let content = '';

//   resp.on('data', (c) => content += c);
// });



function StringChallenge(str) {
  // 結果を格納するための変数
  let result = str[0];
  
  // 文字列を一文字ずつ調べる
  for (let i = 1; i < str.length; i++) {
    // 現在の数字と前の数字を取得
    const current = parseInt(str[i]);
    const prev = parseInt(str[i - 1]);
    
    // ゼロを奇数または偶数としてカウントしない
    if (current !== 0 && prev !== 0) {
      // 両方とも奇数の場合は'-'を挿入
      if (current % 2 !== 0 && prev % 2 !== 0) {
        result += '-';
      }
      // 両方とも偶数の場合は'*'を挿入
      else if (current % 2 === 0 && prev % 2 === 0) {
        result += '*';
      }
    }
    
    // 現在の数字を結果に追加
    result += str[i];
  }
  
  // 最終結果を返す
  return result;
}

// テスト
console.log(StringChallenge("4546793")); // 出力: 454*67-9-3




function SearchingChallenge(str) {
  const words = str.split(' ')
  // 繰り返しカウント変数の初期化
  let repeatCount = 0;
  let result = -1;

  words.forEach((word) => {
    const charCount = {};
    let maxCount = 0;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      charCount[char] = (charCount[char] || 0) + 1;
      maxCount = Math.max(maxCount, charCount[char]);
    }

    if (maxCount > repeatCount) {
      repeatCount = maxCount; // constで定義したら再代入できない
      result = word;
    }
  });

  return result;
}

console.log(SearchingChallenge("Hello apple pie"));
console.log(SearchingChallenge("no words"));