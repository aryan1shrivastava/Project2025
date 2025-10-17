import express from "express";
import type { Express, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app: Express = express();
app.use(express.json()); //Middleware to parse json bodies
const port: number = 3000;

//base url
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "running!!",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
