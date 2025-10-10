import express from "express";

const app = express();
const port = 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
  });
});

app.listen(port, () => {
  console.log(`API listning on port ${port}`);
});
