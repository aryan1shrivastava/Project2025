import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "running!!!",
  });
});

app.listen(port, () => {
  console.log(`API listning on port ${port}`);
});
