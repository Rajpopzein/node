import mongoose from "mongoose";
import {log} from "../Utils/common.js";
const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/appdata", {
      connectTimeoutMS: 30000,
    });
    console.log("db connected successfully");
  } catch (e) {
    log.error({ message: e.message });
    console.log("error in db connection");
  }
};

export default dbConnection;
