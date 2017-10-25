import { MongoClient, Db } from 'mongodb';

let mongoInstance: Db;

export const initDb = async (connectionString): Promise<Db> => {
  if (!mongoInstance) {
    mongoInstance = await MongoClient.connect(connectionString);

    console.log(`MongoDB connection initialized to: ${connectionString}`);
  }

  return mongoInstance;
};

export const getDb = async (): Promise<Db> => mongoInstance;