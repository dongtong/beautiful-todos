import { uuid } from "uuidv4";
import dayjs from "dayjs";

class Todo {
  readonly id: string;
  status: "New" | "Completed";
  createdAt: string;
  lastUpdatedAt: string;
  completedAt: string | null;
  readonly creator?: string | null;

  // likes DI(Dependency Injection)
  constructor(public title: string) {
    // uuid
    this.id = uuid();
    this.status = "New";
    // format current datetime to string
    const currDateTime = dayjs().format("YYYY-mm-dd HH:MM:SS");
    // "YYYY-mm-dd HH:MM:SS"
    this.createdAt = currDateTime;
    this.lastUpdatedAt = currDateTime;
    this.completedAt = null;
    // if caller could pass user information, assign it here
    this.creator = null;
  }

  // Persist in database
  save(): Todo {}

  update(status: string) {}

  public static find(id: string): Todo {}

  public static clearCompleted() {}
}

export default Todo;
