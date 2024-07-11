import express from "express";
import router from "./Routes/index_route.js";
import cors from "cors";
import dbConnection from "./config/database.js";
import errorHandler from "./Middleware/errorHandler.js";
import morgan from "morgan";
import * as fs from 'fs';


const app = express();

const port = 3000;

dbConnection();

app.use(errorHandler);

app.use(morgan('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
