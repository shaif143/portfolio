import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // The Blob SDK authenticates with Vercel's short-lived OIDC identity in
    // production. Local development can still use credentials from `vercel env pull`.
    const result = await list({ prefix: "gallery/", limit: 1000 });
    const items = result.blobs
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
      .map((item) => ({
        key: item.pathname,
        url: item.url,
        title: filenameToTitle(item.pathname),
        uploaded: item.uploadedAt.toISOString(),
      }));

    return Response.json(
      { items },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    console.error("Unable to read the portfolio gallery from Blob.", error);
    return Response.json(
      { error: "The gallery is temporarily unavailable." },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}

function filenameToTitle(value: string): string {
  return (
    value
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "")
      .replace(/^\d+-[a-f0-9-]+-/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Untitled frame"
  );
}
