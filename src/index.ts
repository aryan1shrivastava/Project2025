import express from "express";
import type { Express, Request, Response } from "express";
import authRoutes from "./routes/auth.routes.js";
// import { message } from "./routes/auth.js";

const app: Express = express();
app.use(express.json()); //Middleware to parse json bodies
const port: number = 3000;

// console.log("IMPORTED MESSAGE:", message);

//base url
app.use("/api/auth", authRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "running!!",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
