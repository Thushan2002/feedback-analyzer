import express, { Request, Response } from "express";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Hello from Feedback Analyser",
  });
});

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
