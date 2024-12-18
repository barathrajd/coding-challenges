import { createLogger } from "rslog";

const logger = createLogger({});

logger.override({
  success: (message) => {
    console.log(message);
  },
  debug: (message) => {
    console.log(message);
  },
  ready: (message) => {
    console.log(message);
  },
  start: (message) => {
    console.log(message);
  },
  log: (message) => {
    console.log(message);
  },
  info: (message) => {
    console.log(message);
  },
  warn: (message) => {
    console.log(message);
  },
  error: (message) => {
    console.log(message);
  },
});

async function wc() {
  const option = Deno.args[0];
  const filePath = Deno.args[1];
  try {
    const isFile = await Deno.realPath(filePath);
    const stats = await Deno.stat(isFile);
    if (option === "-c") {
      logger.info(`${stats.size} ${filePath}`);
    } else {
      logger.warn(`Unknown flag ${option}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "NotFound") {
        logger.error(`File is not found in this path (${filePath})`);
      }
    }
    return String(error);
  }
}

wc();
