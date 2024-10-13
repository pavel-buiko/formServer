import express from "express";
import cors from "cors";
import { PROJECTS_DATA } from "./items.js";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.resolve("./items.js");

let idCounter =
  PROJECTS_DATA.length > 0
    ? Math.max(...PROJECTS_DATA.map((item) => item.id)) + 1
    : 1;

const saveDataToFile = (data) => {
  const fileContent = `export const PROJECTS_DATA = ${JSON.stringify(
    data,
    null,
    2
  )};`;
  fs.writeFileSync(filePath, fileContent, "utf-8");
};

app.get("/items", (req, res) => {
  res.json(PROJECTS_DATA);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: idCounter++,
    ...req.body,
    microtasks: req.body.microtasks ? req.body.microtasks : [],
  };
  PROJECTS_DATA.push(newItem);

  saveDataToFile(PROJECTS_DATA);

  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;

  let itemFound = false;

  PROJECTS_DATA.forEach((item, index) => {
    if (item.id === id) {
      PROJECTS_DATA[index] = {
        ...item,
        ...updatedFields,
        microtasks: updatedFields.microtasks
          ? updatedFields.microtasks.map((updatedMicrotask, idx) => {
              const existingMicrotask = item.microtasks[idx] || {};
              return { ...existingMicrotask, ...updatedMicrotask };
            })
          : item.microtasks,
      };
      itemFound = true;
    }
  });

  if (!itemFound) {
    return res.status(404).json({ message: "Item not found" });
  }

  saveDataToFile(PROJECTS_DATA);
  res.json({ message: "Item updated", updatedFields });
});

app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = PROJECTS_DATA.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
