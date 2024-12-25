
+ getUsersでfindManyを使って一覧取得するときにincludeを使うと、posts, commentsも一括で取得できる
+ getUserでfindUniqueを使って詳細データを取得するときに、リレーションデータをN+1を考慮して取得してくれるわけではない
+ フィールドリゾルバ (型リゾルバ) を利用すると、クライアントから指定があったデータを動的にリゾルバで取得できるようになるが、N+1問題は考慮できていない
  + やっぱりDataLoaderを

# ユーザー一覧は findMany+型リゾルバ、詳細データは findUnique でバッチ処理的に取得のリゾルバ

```ts
const resolvers = {
  // トップレベルのリゾルバ
  Query: {
    getUsers: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return users;
    },

    getUser: async (_, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      return user;
    },
  },

  // User型のフィールドリゾルバ
  User: {
    // postsが要求された時のみ実行される
    posts: async (parent, _, { prisma }) => {
      const posts = await prisma.post.findMany({
        where: { authorId: Number(parent.id) },
        select: {
          id: true,
          title: true,
        },
      });
      return posts;
    },
  },

  // Post型のフィールドリゾルバ
  Post: {
    // commentsが要求された時のみ実行される
    comments: async (parent, _, { prisma }) => {
      const comments = await prisma.comment.findMany({
        where: { postId: Number(parent.id) },
        select: {
          id: true,
          content: true,
        },
      });
      return comments;
    },
  },
};
```
  

