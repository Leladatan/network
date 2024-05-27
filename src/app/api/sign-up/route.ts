import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Получаем данные из формы регистрации
    const {email, username, password} = await req.json();
    // Проверяем существует ли пользователь с такой электронной почтой
    const existsEmail: User | null = await db.user.findUnique({
      where: {
        email
      }
    });

    if (existsEmail) {
      return NextResponse.json({message: "Email exist"}, {status: 400});
    }
    // Проверяем существует ли пользователь с таким логином
    const existsUsername: User | null = await db.user.findUnique({
      where: {
        username
      }
    });

    if (existsUsername) {
      return NextResponse.json({message: "Username exist"}, {status: 400});
    }
    // Кешируем пароль
    const hashedPassword: string = await bcrypt.hash(password, 10);
    // Создаем пользователя
    await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    });

    return NextResponse.json({message: "User registered"}, {status: 200});
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
}