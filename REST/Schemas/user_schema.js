import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from 'joi'

const userValidationSchema = Joi.object({
  phone: Joi.string().min(10).max(12).required(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password:Joi.string().required()
});

const userSchema = new mongoose.Schema({
  phone: String,
  email: String,
  fullname: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userRole",
    default: "668629b0dc14acd249dbf51d",
  },
});

const userAuthSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: "user",
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  Salt: {
    type: String,
    require: true,
  },
});

userAuthSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const saltRounds = 10;
      this.salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, this.salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const userRoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    require: true,
  },
});

export { userSchema, userAuthSchema, userRoleSchema,userValidationSchema };
