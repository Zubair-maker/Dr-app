import { Router } from "express";
import { registerUser } from "../controllers/userController.js";

const router = Router();

console.log("routes run");

router.route("/register").post(registerUser);

export default router;
