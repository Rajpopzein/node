import bunyan from 'bunyan'
import Joi from 'joi'
import { commonResponse } from "./Response/common_response.js";
import httpStatus from "http-status";

const log = bunyan.createLogger({name:"laundaryApp"})

const validatePayload = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send(commonResponse({message:error.details[0].message , status:false, statuscode:httpStatus.BAD_REQUEST}));
      }
      next();
    };
  };

export{log,validatePayload}