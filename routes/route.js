import express from "express";

import {
  addProjects,
  changeProjects,
  getProject,
} from "../controllers/serverController.js";

const router = express.Router();

router.post("/items", addProjects);
router.patch("/items/:id", changeProjects);
router.get("/items/:id", getProject);

export default router;
