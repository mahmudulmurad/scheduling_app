import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  const uri = process.env.DB_URL;

  if (!uri) {
    console.error("Database uri is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to Database:", error.message);
    } else {
      console.error("Unknown error connecting to Database");
    }
    process.exit(1);
  }
};
module.exports = { connectDB };
