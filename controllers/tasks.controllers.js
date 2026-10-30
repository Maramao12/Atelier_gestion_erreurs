import Task from "../models/Task.js";
import { createError } from "../errors/errorMessages.js";
export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json({ data: tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Fonction migrée : plus de try/catch, on LANCE l'erreur.
// Express 5 envoie tout seul les erreurs des fonctions async vers errorHandler.
export async function getTaskById(req, res) {
  const task = await Task.findById(req.params.id); // si MongoDB échoue, l'erreur remonte seule
  if (!task) throw createError("TASK_NOT_FOUND");
  res.status(200).json({ data: task });
}

export async function createTask(req, res) {
  try {
    console.log("body", req.body);
    const newTask = await Task.create(req.body);
    res.status(201).json({ data: newTask });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      returnDocument: "after",
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ data: Task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteTask(req, res) {
  await Task.findByIdAndDelete(req.params.id);

  res.status(204).send();
}
