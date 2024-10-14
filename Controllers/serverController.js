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

  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (err) {
    console.error("Error writing to file", err);
    throw new Error("Failed to save data");
  }
};

export const addProjects = (req, res) => {
  try {
    const { microtasks = [], ...otherFields } = req.body;

    if (!otherFields || Object.keys(otherFields).length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newItem = {
      id: idCounter++,
      ...otherFields,
      microtasks,
    };

    PROJECTS_DATA.push(newItem);
    saveDataToFile(PROJECTS_DATA);

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changeProjects = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
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
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const item = PROJECTS_DATA.find((item) => item.id === id);

    if (!item) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("Error retrieving project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
