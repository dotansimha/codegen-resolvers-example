import { Db, Collection } from 'mongodb';

export const initMockData = async (db: Db) => {
  const users: Collection = await db.collection('users');
  const posts: Collection = await db.collection('posts');

  await users.deleteMany({});
  await posts.deleteMany({});

  const user1Id = (await users.insertOne({ name: 'Dotan Simha' })).insertedId;
  const user2Id = (await users.insertOne({ name: 'Uri Goldshtein' })).insertedId;

  await posts.insertOne({
    title: 'Hello GraphQL',
    authorId: user1Id,
    createdAt: new Date(),
  });

  await posts.insertOne({
    title: 'Codegen is awesome!',
    authorId: user2Id,
    createdAt: new Date(),
  });
};
