import "dotenv/config";
import express, { type Application } from "express";
import cors from "cors";
import { appConfig } from "./config/app.config";

console.log(appConfig);

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
