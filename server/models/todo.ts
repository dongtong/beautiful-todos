import dayjs from "dayjs";
import prisma from "lib/prisma";
import { IApiRes } from "interfaces/common";
import { catchORMError } from "lib/common";
import { TodoStatus } from "interfaces/todo";

class Todo {
  id?: string;
  status: "Open" | "Completed";
  createdAt: string;
  lastUpdatedAt: string;
  completedAt: string | null;
  readonly creator?: string | null;

  // likes DI(Dependency Injection)
  constructor(public title: string) {
    // uuid
    // this.id = uuid();
    this.status = "Open";
    // format current datetime to string
    const currDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    // "YYYY-mm-dd HH:MM:SS"
    this.createdAt = currDateTime;
    this.lastUpdatedAt = currDateTime;
    this.completedAt = null;
    // if caller could pass user information, assign it here
    this.creator = null;
  }

  // Persist it in database
  async save(): Promise<IApiRes> {
    try {
      const { title, status, createdAt, lastUpdatedAt, completedAt, creator } =
        this;
      const newTodo: unknown = await prisma.todo.create({
        data: {
          title,
          status,
          createdAt,
          lastUpdatedAt,
          completedAt: completedAt!,
          creator,
        },
      });

      if (newTodo) {
        return {
          statusCode: "OK",
          data: newTodo as Todo,
        };
      } else {
        return catchORMError("Failed to create todo");
      }
    } catch (err) {
      return catchORMError("Failed to create todo", err);
    }
  }

  public static async update(
    id: string,
    newStatus: TodoStatus
  ): Promise<IApiRes> {
    try {
      const currTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const completedAt = newStatus === "Completed" ? currTime : null;
      const updatedTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          status: newStatus,
          lastUpdatedAt: currTime,
          completedAt,
        },
      });

      if (updatedTodo) {
        return {
          statusCode: "OK",
          data: updatedTodo as Todo,
        };
      } else {
        return catchORMError("Failed to update todo");
      }
    } catch (err) {
      return catchORMError("Failed to update todo", err);
    }
  }

  public static async find(id: string): Promise<IApiRes> {
    try {
      const todo = await prisma.todo.findUnique({ where: { id } });
      if (todo) {
        return {
          statusCode: "OK",
        };
      } else {
        return catchORMError(`Failed to find todo with id({${id}})`);
      }
    } catch (err) {
      return catchORMError(`Failed to find todo with id({${id}})`, err);
    }
  }

  // TODO(depend on requirement): Add pagination, search or order
  public static async findAll(): Promise<IApiRes> {
    try {
      const todos = await prisma.todo.findMany();
      if (todos && todos.length) {
        return {
          statusCode: "OK",
          data: todos,
        };
      } else {
        return catchORMError("Failed to fetch todos");
      }
    } catch (err) {
      return catchORMError(`Failed to fetch todos: `, err);
    }
  }

  public static clearCompleted() {}
}

export default Todo;
