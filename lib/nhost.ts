// src/lib/nhost.ts
import { NhostClient } from "@nhost/nextjs"; // or '@nhost/nhost-js' depending on the example you follow
export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
});
