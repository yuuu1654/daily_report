

+ microCMSでスキーマを定義して、それらの関連付けについて
  + rdbのようなprimaryキーとforeignキーを持たす
  + 双方向に参照を持たせると、データを取得したときにcontentに紐付けられたtag一覧と、tagと紐づいているcontent一覧のデータ両方を取得できるので、
    ```js
    // contentsスキーマ
    {
      title: string;
      body: string;
      tags: { // 参照フィールド
        id: string;
        name: string;
      }
    }

    // tagsスキーマ
    {
      name: string;
      contents: { //参照フィールド
        id: string;
        title: string;
        body: string;
      }
    }
    ```