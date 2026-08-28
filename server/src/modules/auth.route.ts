import { Router } from "express";
import { authController } from "./auth.module";

const authRoute: Router = Router();

authRoute.route("/register").post(authController.register);

authRoute.route("/login").post(authController.login);

authRoute.route("/refresh").get(authController.refreshToken);

export default authRoute;
