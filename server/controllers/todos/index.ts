import { Router } from "express";
import { IApiRes } from "interfaces/common";
import { ITodo } from "interfaces/todo";
import Todo from "models/todo";

const router = Router();

// Get todos by condition
// GET /todos
router.get("/", (req, res) => {});

// Create todo
// POST /todos
router.post("/", async (req, res) => {
  const { title }: ITodo = req.body as ITodo;
  const todo = new Todo(title);
  const result: IApiRes = await todo.save();
  if (result.statusCode === "OK") {
    return res.send({
      ...result,
      message: "Created todo successfully",
    });
  }
  // error situation
  return result;
});

// Update todo
// PUT /todos/:id
router.put("/:id", (req, res) => {});

// Clear all completed todos
// DELETE /todos/completed
router.delete("/completed", (req, res) => {});

export default router;
