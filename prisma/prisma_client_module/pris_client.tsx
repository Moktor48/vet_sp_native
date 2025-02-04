import { PrismaClient } from "@prisma/client/react-native";
import { reactiveHooksExtension } from "@prisma/react-native";

const baseClient = new PrismaClient();

export const db = baseClient.$extends(reactiveHooksExtension());
