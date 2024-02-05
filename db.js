import mongoose from 'mongoose';

const url = 'mongodb+srv://vaishnavisalunkhe:9mASST5VI6ys563a@cluster0.jhuisiz.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Users';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export { connectToMongoDB };
