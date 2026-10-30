import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";
import { requireAuth, isAdmin } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { idParamSchema } from "../validators/tasks.validator.js";
const router = Router();

//router.use(requireAuth); // Apply authentication middleware to all routes
router.get("/", requireAuth, isAdmin, getAllTasks);

// avant : router.get("/:id", getTaskById);
router.get("/:id", validate(idParamSchema), getTaskById); // validation Zod AVANT le contrôleur

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
