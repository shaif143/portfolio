import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result = await list({
      prefix: "resume/shaif-ahamed-tamim.pdf",
      limit: 1,
    });
    if (result.blobs[0]) {
      return NextResponse.redirect(result.blobs[0].url);
    }
  }

  return NextResponse.redirect(
    new URL("/documents/shaif-ahamed-tamim-cv.pdf", request.url),
  );
}
