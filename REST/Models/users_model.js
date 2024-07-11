import mongoose from "mongoose";
import {
  userSchema,
  userAuthSchema,
} from "../Schemas/user_schema.js";

const userModel = mongoose.model("user", userSchema);
const userAuth = mongoose.model("userAuth", userAuthSchema);

export { userModel, userAuth };
