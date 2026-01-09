import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    service: "nextjs-app",
    env: process.env.NODE_ENV,
  },
});
