import {Database} from "./database-api";
import {createInMemoryDatabase} from "./database-memory";

export * from "./database-api";
export * from "./model";
export * from "./model-factory";

const database = createInMemoryDatabase();

export function getDatabase(): Database {
  return database;
}
