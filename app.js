import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.routes.js ";
import authRouter from "./routes/auth.routes.js";
import { language } from "./middlewares/language.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express(); //sans cette ligne body ne marche pas
app.use(language);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.use("/api/tasks", tasksRouter);
app.use("/api/auth", authRouter);
app.use(notFound);
app.use(errorHandler);
export default app;
