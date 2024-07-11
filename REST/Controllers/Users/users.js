import mongoose from "mongoose";
import { userAuth, userModel } from "../../Models/users_model.js";
import dbConnection from "../../config/database.js";
import { log } from "../../Utils/common.js";
import { commonResponse } from "../../Utils/Response/common_response.js";
import httpStatus from "http-status";
import { jwtToken } from "../../Utils/autentication.js";
import bcrypt from "bcrypt";

const deleteuser = async (req, res) => {
  try {
    let { email } = req.body;
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(422)
        .send(
          commonResponse({
            message: "user not found",
            status: false,
            statuscode: httpStatus.UNPROCESSABLE_ENTITY,
          })
        );
    }
    await userModel.deleteOne(req.body);
    res
      .status(200)
      .send(
        commonResponse({
          message: "user deleted successfully",
          status: false,
          statuscode: httpStatus.OK,
        })
      );
  } catch (error) {
    log.error(error.message);
    res.send(
      commonResponse({
        message: "Internal server error",
        status: false,
        statuscode: httpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
};

const updateUser = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      log.warn("request body is empty");
      return res.send(
        commonResponse({
          message: "body is required for updating a user",
          status: true,
          statuscode: httpStatus.UNPROCESSABLE_ENTITY,
        })
      );
    }
    let {email} = req.decoded.data;
    if (req.body.email || req.body.password) {
      return res.status(400).send(
        commonResponse({
          message: "Email field cannot be updated",
          status: false,
          statuscode: httpStatus.BAD_REQUEST,
        })
      );
    }
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(422)
        .send(
          commonResponse({
            message: "user not found",
            status: false,
            statuscode: httpStatus.UNPROCESSABLE_ENTITY,
          })
        );
    }
    await userModel.findOneAndUpdate({email},req.body,{new:true})
    res
      .status(200)
      .send(
        commonResponse({
          message: "user updated successfully",
          status: false,
          statuscode: httpStatus.OK,
        })
      );
  } catch (error) {
    log.error(error.message);
    res.send(
      commonResponse({
        message: "Internal server error",
        status: false,
        statuscode: httpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
};

const registration = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      log.warn("request body is empty");
      return res.send(
        commonResponse({
          message: "body is required for creating a user",
          status: true,
          statuscode: httpStatus.UNPROCESSABLE_ENTITY,
        })
      );
    }
    const { phone, email, fullname, password } = req.body;
    const userExists = await userModel.findOne({ email, phone });
    if (userExists) {
      log.warn(`User with ${email} and ${phone} already exist`);
      return res.send(
        commonResponse({
          message: `User with ${email} and ${phone} already exist`,
          status: true,
          statuscode: httpStatus.CONFLICT,
        })
      );
    }
    const newUser = new userModel({ phone, email, fullname });
    await newUser.save();

    const newUserAuth = new userAuth({
      user_id: newUser._id,
      password,
    });
    await newUserAuth.save();
    res.send(
      commonResponse({
        message: "User Created successfully",
        status: true,
        statuscode: httpStatus.OK,
      })
    );
  } catch (error) {
    log.error(error.message);
    res.send(
      commonResponse({
        message: "Internal server error",
        status: false,
        statuscode: httpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
};

const login = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      log.warn("request body is empty");
      return res.send(
        commonResponse({
          message: "body is required for Authenticate user",
          status: true,
          statuscode: httpStatus.UNPROCESSABLE_ENTITY,
        })
      );
    }
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email });
    if (!userData) {
      log.warn("user not found or creds in invalid");
      return res.send(
        commonResponse({
          message: "user not found or creds in invalid",
          status: false,
          statuscode: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const userAuths = await userAuth.findOne({ user_id: userData._id });

    const isMatch = await bcrypt.compare(password, userAuths.password);
    if (!isMatch) {
      return res.send(
        commonResponse({
          message: "Invalid password",
          status: false,
          statuscode: httpStatus.UNAUTHORIZED,
        })
      );
    }

    const authToken = jwtToken({
      email: userData.email,
      fullname: userData.fullname,
    });

    res.send(
      commonResponse({
        message: "Login successfully",
        status: true,
        statuscode: httpStatus.OK,
        data: { token: authToken },
      })
    );
  } catch (error) {
    log.error(error.message);
    res.send(
      commonResponse({
        message: "Internal server error",
        status: false,
        statuscode: httpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
};

export { registration, login, deleteuser,updateUser };
