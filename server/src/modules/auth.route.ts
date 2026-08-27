import { Router } from "express";
import { authController } from "./auth.module";

const authRoute: Router = Router();

authRoute.route("/register").post(authController.register);

export default authRoute;
