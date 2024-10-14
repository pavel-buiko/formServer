import { PROJECTS_DATA } from "../items.js";
import path from "node:path";
import fs from "node:fs";
const filePath = path.resolve("../items.js");

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

export const addProjects = (req, res) => {
  const newItem = {
    id: idCounter++,
    ...req.body,
    microtasks: req.body.microtasks ? req.body.microtasks : [],
  };
  PROJECTS_DATA.push(newItem);

  saveDataToFile(PROJECTS_DATA);

  res.status(201).json(newItem);
};

export const changeProjects = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const updatedFields = req.body;
  let itemFound = false;
  PROJECTS_DATA.forEach((item, index) => {
    if (item.id === id) {
      itemFound = true;
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
    }
  });
  if (!itemFound) {
    return res.status(404).json({ message: "Item not found" });
  }

  saveDataToFile(PROJECTS_DATA);
  res.json({ message: "Item updated", updatedFields });
};

export const getProject = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json("There is no such project");
  }
  const item = PROJECTS_DATA.find((item) => item.id === id);
  res.json(item);
};
