import mongoose from 'mongoose';

async function dbSetup() {
  await mongoose.connect('mongodb://eyegoadmin:pass@172.27.96.1:27017/userlogs?authSource=admin');
}

dbSetup();
