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
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};

export const PATCH = async (req: Request, {params}: {params: {profileId: string}}) => {
  try {
    const id: string = params.profileId;
    const {last_name, first_name, gender, birthday, about} = await req.json();

    if (!id) {
      return new NextResponse("Unauthenticated", {status: 401});
    }

    const user = await db.user.update({
      where: {
        id
      },
      data: {
        last_name,
        first_name,
        gender,
        birthday: new Date(birthday).toISOString() || null,
        about
      }
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};