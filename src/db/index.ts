import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let primsa: PrismaClient;
if (process.env.NODE_ENV === "production") {
  primsa = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  primsa = global.cachedPrisma;
}

export const db = primsa;
