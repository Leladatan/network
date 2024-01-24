import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {User} from "@prisma/client";

export const PATCH = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;
    const {newId, username} = await req.json();

    if (!id) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (username) {
      const user: User = await db.user.update({
        where: {
          id,
        },
        data: {
          username
        }
      });

      return NextResponse.json(user);
    }

    const user = await db.user.updateMany({
      where: {
        id,
      },
      data: {
        id: newId
      }
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", {status: 500});
  }
};