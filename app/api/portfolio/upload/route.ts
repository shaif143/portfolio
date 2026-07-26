import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isStudioKeyValid(request.headers.get("x-studio-key"))) {
          throw new Error("Owner access required.");
        }

        const payload = parsePayload(clientPayload);
        validatePathname(pathname, payload.kind);

        return {
          allowedContentTypes:
            payload.kind === "cv"
              ? ["application/pdf"]
              : ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: payload.kind === "cv" ? 8_000_000 : 15_000_000,
          addRandomSuffix: false,
          allowOverwrite: payload.kind === "cv",
          cacheControlMaxAge: payload.kind === "cv" ? 60 : 3600,
          tokenPayload: JSON.stringify(payload),
        };
      },
    });

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return Response.json({ error: message }, { status: 400 });
  }
}

function parsePayload(value: string | null): { kind: "photo" | "cv"; title: string } {
  let parsed: unknown;
  try {
    parsed = value ? JSON.parse(value) : null;
  } catch {
    throw new Error("Invalid upload request.");
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("kind" in parsed) ||
    (parsed.kind !== "photo" && parsed.kind !== "cv")
  ) {
    throw new Error("Invalid upload request.");
  }

  const title =
    "title" in parsed && typeof parsed.title === "string"
      ? parsed.title.trim().slice(0, 80)
      : "";
  return { kind: parsed.kind, title };
}

function validatePathname(pathname: string, kind: "photo" | "cv") {
  if (kind === "cv" && pathname === "resume/shaif-ahamed-tamim.pdf") return;
  if (
    kind === "photo" &&
    /^gallery\/\d+-[a-f0-9-]+-[a-z0-9._-]+\.(?:jpe?g|png|webp)$/i.test(pathname)
  ) {
    return;
  }
  throw new Error("Invalid archive destination.");
}

function isStudioKeyValid(provided: string | null): boolean {
  const expected = process.env.STUDIO_UPLOAD_KEY;
  if (!provided || !expected) return false;

  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}
