import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string + process.env.DB_NAME as string + process.env.MONGO_QUERY_PARAMS as string;

const mongoUri: string = String(
  MONGO_URI || "mongodb://localhost:27017/acc-db"
);

mongoose.connect(mongoUri, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log("Connected to MongoDB... 🍃");
});
