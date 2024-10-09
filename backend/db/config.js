import mongoose from "mongoose";

const config = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("MongoDB is Connected!");
  } catch (error) {
    console.log("Error in Connecting to MONGODB");
  }
};

export default config;