import mongoose from 'mongoose';

async function dbSetup() {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@172.27.96.1:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`
  );
}

dbSetup();
