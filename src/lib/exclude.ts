import {prismaExclude} from "prisma-exclude";
import {db} from "@/lib/db";

export const exclude = prismaExclude(db);