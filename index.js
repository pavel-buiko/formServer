import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { PROJECTS_DATA } from "./items.js";
import router from "./routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/items", (req, res) => {
  if (!PROJECTS_DATA) {
    res.status(404).send("No projects found.");
    return;
  }
  res.json(PROJECTS_DATA);
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
