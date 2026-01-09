import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
