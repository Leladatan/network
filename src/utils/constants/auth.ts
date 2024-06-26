import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "@prisma/client";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";

async function login(credentials: Record<string, string>): Promise<User | null | undefined> {
  try {
    // Получаем пользователя по электронной почте из формы
    const user: User | null = await db.user.findUnique({
      where: {
        email: credentials.email
      },
    });

    if (!user) {
      return null;
    }
    // Проверяем совпадает ли пароль
    const isCorrect: boolean = await bcrypt.compare(credentials.password, user.password);

    if (!isCorrect) throw new Error("Wrong Credentials.");
    // Возращаем данные пользователя
    return user;
  } catch (err) {
    console.error(err);
  }
}

export const authOptions= {
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {
          return await login(credentials!);
        } catch (err) {
          console.log(err);
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: any, user: any}): Promise<any> {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}: {session: any, token: any}): Promise<any> {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};