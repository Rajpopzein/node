import express,{ Router } from "express";
import userRoute from "./userRoute.js";

const router = express.Router()

router.use("/users",userRoute)

export default router