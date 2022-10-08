import {Database} from "./database-api";
import {DatabaseType, getConfiguration} from "../application/configuration";
import {createHttpDatabase} from "./database-http";
import {createLocalStorageDatabase} from "./database-local-storage";

export * from "./database-api";
export * from "./model";
export * from "./model-factory";

const database = createDatabase();

function createDatabase(): Database {
  const configuration = getConfiguration();
  switch (configuration.database) {
    case DatabaseType.HTTP:
      return createHttpDatabase();
    case DatabaseType.LOCAL_STORAGE:
      return createLocalStorageDatabase();
    default:
      return createLocalStorageDatabase();
  }
}

export function getDatabase(): Database {
  return database;
}
