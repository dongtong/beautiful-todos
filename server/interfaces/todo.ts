/**
 * Define TODO interface
 * @param id: {string} primary key
 * @param title: {string} todo's title
 * @param status: {string} todo's status, enum value: New and Completed
 * @param createdAt: {string} todo's created timestamp
 * @param lastUpdatedAt: {string} todo's lastest updated timestamp
 * @param completedAt: {string} todo's completed timestamp
 * @param creator: {string}{optional} system could persist todo's creator name if necessary
 */
export interface ITodo {
  id: string;
  title: string;
  status: "Open" | "Completed";
  createdAt: string;
  lastUpdatedAt: string;
  completedAt: string;
  creator?: string | null;
}

export type TodoStatus = "Open" | "Completed";
