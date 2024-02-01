import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {User} from "@prisma/client";

export const PATCH = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;
    const {status} = await req.json();

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    const user: User = await db.user.update({
      where: {
        id
      },
      data: {
        status
      }
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};