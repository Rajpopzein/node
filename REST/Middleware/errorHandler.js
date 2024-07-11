import * as fs from 'fs';
import { commonResponse } from "../Utils/Response/common_response.js";

const errorHandler = (err, req, res, next) => {
  fs.appendFile('./errors.log', `${new Date().toISOString()} - ${err.stack}\n`, (error) => {
    if (error) {
      console.error('Failed to write to log file');
    }
  });
  res.status(500).send(commonResponse({message:"Internal server error", status:false, statuscode:500}));
};

export default errorHandler;
