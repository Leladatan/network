import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {User} from "@prisma/client";
import {authOptions} from "@/utils/constants/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };