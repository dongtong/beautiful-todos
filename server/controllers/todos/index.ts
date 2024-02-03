import { Router } from "express";
import { IApiRes } from "interfaces/common";
import { ITodo, TodoStatus } from "interfaces/todo";
import Todo from "models/todo";

const router = Router();

// Get todos by condition
// GET /todos
router.get("/", async (req, res) => {
  const result = await Todo.findAll();
  if (result.statusCode === "OK") {
    return res.send({
      ...result,
      message: "Fetched all todos",
    });
  }
  // error situation
  return res.send(result);
});

// Create todo
// POST /todos
router.post("/", async (req, res) => {
  const { title }: ITodo = req.body as ITodo;
  if (!title) {
    return res.send({
      statusCode: "Bad request",
      message: "todo title is required field",
    });
  }

  const todo = new Todo(title);
  const result: IApiRes = await todo.save();
  if (result.statusCode === "OK") {
    return res.send({
      ...result,
      message: "Created todo successfully",
    });
  }
  // error situation
  return res.send(result);
});

// Update todo, toggle between open and completed
// PUT /todos/:id?status=open|completed
router.put("/:id", async (req, res) => {
  if (
    !req.query.status ||
    !["Open", "Completed"].includes(req.query.status as string)
  ) {
    return res.send({
      statusCode: "Bad request",
      message:
        "Query parameter status is required and must be Open or Completed",
    });
  }

  const findRes = await Todo.find(req.params.id);
  if (findRes.statusCode === "OK") {
    const result = await Todo.update(
      req.params.id,
      req.query.status as TodoStatus
    );

    if (result.statusCode === "OK") {
      return res.send({
        ...result,
        message: "Update todo successfully",
      });
    }
    // error situation
    return res.send({
      statusCode: "Bad request",
      message: "Failed to update todo",
    });
  }

  return res.send({
    statusCode: "Not found",
    message: "Todo item does not exist in db",
  });
});

// Clear all completed todos
// DELETE /todos/completed
router.delete("/completed", (req, res) => {});

export default router;
