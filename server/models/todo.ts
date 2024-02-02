import dayjs from "dayjs";
import prisma from "lib/prisma";
import { IApiRes } from "interfaces/common";
import { catchORMError } from "lib/common";

class Todo {
  id?: string;
  status: "New" | "Completed";
  createdAt: string;
  lastUpdatedAt: string;
  completedAt: string | null;
  readonly creator?: string | null;

  // likes DI(Dependency Injection)
  constructor(public title: string) {
    // uuid
    // this.id = uuid();
    this.status = "New";
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

  update(status: string) {}

  public static find(id: string): Todo | null {
    return null;
  }

  public static clearCompleted() {}
}

export default Todo;
