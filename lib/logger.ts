import { Logtail } from "@logtail/node";

export const logger = new Logtail(
  process.env.BETTERSTACK_SOURCE_TOKEN!
);
