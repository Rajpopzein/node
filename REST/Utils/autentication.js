import jsonwebtoken from "jsonwebtoken";
import {log} from "./common.js";
import { commonResponse } from "./Response/common_response.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const privateKey = "LAUNDARY&%^756";
const jwtToken = (data) => {
  return jsonwebtoken.sign({ data: data, expiresIn: "1d" }, privateKey);
};

const authendicate = (req, res, next) => {
  if(!req.headers.authorization){
    return res.send(
      commonResponse({
        message: "Token is required",
        status: false,
        statuscode: httpStatus.UNAUTHORIZED,
      }))
  }
  const bToken = req.headers.authorization.split(" ");
  jsonwebtoken.verify(bToken[1], privateKey, function (err, decoded) {
    if (err) {
      log.error(err);
      return res.send(
        commonResponse({
          message: err.message,
          status: false,
          statuscode: httpStatus.UNAUTHORIZED,
        })
      );
    }
    log.trace(decoded);
    req.decoded = decoded;
    next();
  });
};

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};

export { jwtToken, authendicate,hashPassword,comparePassword};
