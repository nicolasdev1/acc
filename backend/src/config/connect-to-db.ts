import mongoose from "mongoose";

const mongoUri: string = String(
  process.env.MONGO_URI || "mongodb://localhost:27017"
);

mongoose.connect(mongoUri, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log("Connected to MongoDB... 🍃");
});
