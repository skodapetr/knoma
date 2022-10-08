export type Configuration = {

  domain: string;

};

const configuration = {
  "domain": "http://localhost/",
};

export function getConfiguration(): Configuration {
  return configuration;
}
