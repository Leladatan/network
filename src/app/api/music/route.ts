import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const {values, song} = await req.json();
    const {title} = values;
    const {author} = values;
    const {photo} = values;

    if (!title) {
      return new NextResponse("Title song is required", {status: 400});
    }

    if (!author) {
      return new NextResponse("Author song is required", {status: 400});
    }

    if (!photo) {
      return new NextResponse("Photo song is required", {status: 400});
    }

    if (!song) {
      return new NextResponse("Song is required", {status: 400});
    }

    const music = await db.music.create({
      data: {
        title,
        author,
        image_path: photo,
        song_path: song,
      }
    });

    return NextResponse.json(music);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", {status: 500});
  }
};