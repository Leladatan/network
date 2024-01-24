import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const DELETE = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    const user = await db.user.deleteMany({
      where: {
        id,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal error", {status: 500});
  }
};