import { Logtail } from "@logtail/node";

export const logtail = new Logtail(
  process.env.BETTERSTACK_SOURCE_TOKEN!,
  {
    endpoint: "https://s1681247.eu-nbg-2.betterstackdata.com", // ✅ OBLIGATOIRE
  }
);
