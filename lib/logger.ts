import { Logtail } from "@logtail/node";

type LogFn = (message: unknown, context?: unknown) => unknown;

interface Logger {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  flush: () => Promise<unknown>;
}

// Better Stack est optionnel : sans BETTERSTACK_SOURCE_TOKEN, les logs
// partent simplement dans la console (et le build ne plante plus).
const consoleLogger: Logger = {
  info: (m, c) => console.info(m, c ?? ""),
  warn: (m, c) => console.warn(m, c ?? ""),
  error: (m, c) => console.error(m, c ?? ""),
  flush: async () => undefined,
};

export const logtail: Logger = process.env.BETTERSTACK_SOURCE_TOKEN
  ? (new Logtail(process.env.BETTERSTACK_SOURCE_TOKEN, {
      endpoint:
        process.env.BETTERSTACK_ENDPOINT ??
        "https://s1681247.eu-nbg-2.betterstackdata.com",
    }) as unknown as Logger)
  : consoleLogger;
