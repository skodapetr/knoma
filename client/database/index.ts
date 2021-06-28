import {Database} from "./database-api";
import {createFileDatabase} from "./database-simple";

export * from "./database-api";
export * from "./model";
export * from "./model-factory";

const database = createFileDatabase();

export function getDatabase(): Database {
  return database;
}
