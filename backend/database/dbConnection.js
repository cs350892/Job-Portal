import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "Job_Portal",
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log(`MongoDB connection failed: ${error}`);
    });
};

export default dbConnection;

