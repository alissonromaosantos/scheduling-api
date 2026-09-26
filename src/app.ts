import express from "express";

import { corsConfig } from "./config/cors";
import { MainRoutes } from "./routes/main.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const mainRoutes = new MainRoutes();

app.use(corsConfig);
app.use(express.json());

app.use(mainRoutes.init());
app.use(errorMiddleware);

export { app };
