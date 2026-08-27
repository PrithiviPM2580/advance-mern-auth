import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const authService = new AuthService();
export const authController = new AuthController(authService);
