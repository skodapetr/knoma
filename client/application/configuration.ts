export enum DatabaseType {
  HTTP,
  LOCAL_STORAGE,
}

export type Configuration = {

  domain: string;

  database: DatabaseType;

};

declare let __DATABASE__: DatabaseType;

const configuration = {
  "domain": "http://localhost/",
  "database": __DATABASE__,
};

export function getConfiguration(): Configuration {
  return configuration;
}
