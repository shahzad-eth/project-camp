import mongoose, { connect } from "mongoose";

const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully");
  } catch (error) {
    console.log("MongoDB connection Error", error);
    process.exit(1);
  }
};

export default connnectDB;
