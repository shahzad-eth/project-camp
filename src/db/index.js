import mongoose from "mongoose";
import dns from "dns";

// Force Node.js to use Google Public DNS for SRV record resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
