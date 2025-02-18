import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const ConnectedDB = async () => {
  try {
    const mongodb = await mongoose.connect(process.env.MONGODB_URl);
    console.log("mongodb is working fine", mongodb.connection.host);
  } catch (error) {
    console.log("mongodb is not connected. Please check again. Error:", error.message);
  }
};


export default ConnectedDB;