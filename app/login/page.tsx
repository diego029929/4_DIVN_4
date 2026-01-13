'use client';

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function SentryHardTest() {
  useEffect(() => {
    Sentry.captureMessage("🔥 SENTRY HARD TEST FRONTEND");
  }, []);

  return <div>Sentry test</div>;
}
