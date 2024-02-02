import { Router } from "express";

const router = Router();

// Get todos by condition
// GET /todos
router.get("/", (req, res) => {});

// Create todo
// POST /todos
router.post("/", (req, res) => {});

// Update todo
// PUT /todos/:id
router.put("/:id", (req, res) => {});

// Clear all completed todos
// DELETE /todos/completed
router.delete("/completed", (req, res) => {});

export default router;
