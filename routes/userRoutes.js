import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/userControllers.js"
import authMidleware from "../middlewares/auth.js";
const userRouter = express.Router();


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/getuser",authMidleware,getUser)

export default userRouter;