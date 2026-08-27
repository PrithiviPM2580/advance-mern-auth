import "dotenv/config";
import express, { type Application } from "express";
import { connectToDatabase } from "./database/db";
import { appConfig } from "./config/app.config";
import authRoute from "./modules/auth.route";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";

const app: Application = express();
const PORT = appConfig.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: appConfig.APP_ORIGIN,
    credentials: true,
  }),
);

app.use(`${appConfig.BASE_PATH}/auth`, authRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running in env ${appConfig.NODE_ENV} on port ${PORT}`);
});

export default app;
