import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // `list` automatically uses the deployment's short-lived Vercel OIDC token.
    const result = await list({
      prefix: "resume/shaif-ahamed-tamim.pdf",
      limit: 1,
    });
    if (result.blobs[0]) {
      return NextResponse.redirect(result.blobs[0].url);
    }
  } catch (error) {
    // Keep the bundled CV available if Blob is ever temporarily unreachable.
    console.error("Unable to read the living CV from Blob.", error);
  }

  return NextResponse.redirect(
    new URL("/documents/shaif-ahamed-tamim-cv.pdf", request.url),
  );
}
