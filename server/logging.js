const winston = require("winston");
const path = require("path");
const moment = require("moment");
const { SPLAT } = require("triple-beam");
const config = require("./config");
const io = require("./utils");

(function initialize() {
  const logDir = config.logs;
  io.mkDir(logDir);

  const fileFormats = winston.format.combine(
    winston.format.timestamp(),
    splatToParams(),
    winston.format.json(),
  );

  const logger = winston.createLogger({
    "level": "info",
    "transports": [
      new winston.transports.File({
        "filename": path.join(logDir, "error.log"),
        "format": fileFormats,
        "level": "error",
      }),
      new winston.transports.File({
        "filename": path.join(logDir, "combined.log"),
        "format": fileFormats,
      }),
    ],
  });

  // Extra file for uncaught exception.
  winston.exceptions.handle(
    new winston.transports.File({
      "filename": path.join(logDir, "exceptions.log"),
    }),
  );

  // Do not exit after the uncaught exception.
  logger.exitOnError = false;

  if (process.env.NODE_ENV !== "production") {
    addConsoleLogger(logger);
  }

  module.exports = logger;
}());

/**
 * Move SPLAT to params so it is saved and update log massage co contains
 * place holders.
 */
function splatToParams() {
  return winston.format((info) => {
    if (info[SPLAT]) {
      return {
        ...info,
        "params": info[SPLAT],
        "message": info.message + " {}".repeat(info[SPLAT].length),
      };
    }
    return info;
  })();
}

function addConsoleLogger(logger) {
  const timeFormat = () => moment().format("YYYY-MM-DD hh:mm:ss").trim();

  const consoleFormat = winston.format.printf((log) => {
    const time = timeFormat(log.timestamp);
    const level = log.level.toUpperCase();
    return `${time} [${level}] ${log.message}`;
  });

  logger.add(new winston.transports.Console({
    "timestamp": timeFormat,
    "format": winston.format.combine(
      parametersToMessage(),
      consoleFormat,
    ),
  }));
}

/**
 * Save SPLAT (arguments) into a message.
 */
function parametersToMessage() {
  return winston.format((info) => {
    if (info[SPLAT]) {
      return {
        ...info,
        "message": info.message + info[SPLAT].join(" "),
      };
    }
    return info;
  })();
}
