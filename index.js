import express from "express";
import cors from "cors";
import { PROJECTS_DATA } from "./items.js";

import {
  addProjects,
  changeProjects,
  getProject,
} from "./Controllers/serverController.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/items", (req, res) => {
  res.json(PROJECTS_DATA);
});

app.post("/items", addProjects);

app.patch("/items/:id", changeProjects);

app.get("/items/:id", getProject);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
