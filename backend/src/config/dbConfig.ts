import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB =
  process.env.MONGODB_URI ||
  `mongodb+srv://madhumathilabglo:DSJipD9f5HsCTjUl@cluster0.0ibdwov.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDB = async () => {
  try {
    if (DB) {
      await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any);
      console.log("DB connected Successfully");
    } else {
      console.log("MONGODB_URI is not defined in the environment variables.");
    }
  } catch (error) {
    console.log("DB not connected", error);
  }
};

export default connectToDB;
