import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

console.log("routes run");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
