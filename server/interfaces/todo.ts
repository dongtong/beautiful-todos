/**
 * Define TODO interface
 * @columns
 * id: [string] primary key
 * title: [string] todo's title
 * status: [string] todo's status, enum value: New and Completed
 * createdAt: [string] todo's created timestamp
 * lastUpdatedAt: [string] todo's lastest updated timestamp
 * completedAt: [string] todo's completed timestamp
 * creator: [string][optional] system could persist todo's creator name if necessary
 */
export interface ITodo {
  id?: string;
  title: string;
  status?: "New" | "Completed";
  createdAt?: string;
  lastUpdatedAt?: string;
  completedAt: string;
  creator?: string;
}
