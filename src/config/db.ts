import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = 'mongodb://localhost:27017/courses-db'; // 👈 Hardcoded URI

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('MongoDB connected');
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
