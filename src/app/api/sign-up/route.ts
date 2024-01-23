import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const {email, username, password} = await req.json();

  const existsEmail: User | null = await db.user.findUnique({
    where: {
      email
    }
  });

  if (existsEmail) {
    return NextResponse.json({message: "Email exist"}, {status: 400});
  }

  const existsUsername: User | null = await db.user.findUnique({
    where: {
      username
    }
  });

  if (existsUsername) {
    return NextResponse.json({message: "Username exist"}, {status: 400});
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  });

  return NextResponse.json({message: "User registered"}, {status: 200});
}