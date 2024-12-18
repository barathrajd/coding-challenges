import { createLogger } from "rslog";

const logger = createLogger({});

async function wc() {
  const option = Deno.args[0];
  const filePath = Deno.args[1];
  try {
    if (!option || !filePath) {
      logger.error("Unknown flags [OPTIONS] [FILE_PATH]");
      return null;
    }
    if (option === "-c" && filePath) {
      const isFile = await Deno.realPath(filePath);
      const stats = await Deno.stat(isFile);
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
