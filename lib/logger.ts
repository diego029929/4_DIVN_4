import pino from "pino";
import send from "pino-http-send";

const betterStackUrl = process.env.BETTER_STACK_URL!; // ton endpoint HTTPS

export const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  },
  send({
    url: betterStackUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BETTER_STACK_TOKEN}`, // si Better Stack demande un token
    },
  })
);
