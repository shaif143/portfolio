import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { items: [] },
      { headers: { "cache-control": "no-store" } },
    );
  }

  const result = await list({ prefix: "gallery/", limit: 1000 });
  const items = result.blobs
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .map((item) => ({
      key: item.pathname,
      url: item.url,
      title: filenameToTitle(item.pathname),
      uploaded: item.uploadedAt.toISOString(),
    }));

  return Response.json({ items }, { headers: { "cache-control": "no-store" } });
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
