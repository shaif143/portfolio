/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  MEDIA: R2Bucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/portfolio/gallery" && request.method === "GET") {
      const listed = await env.MEDIA.list({ prefix: "gallery/", limit: 60 });
      const items = listed.objects
        .sort((a, b) => b.uploaded.getTime() - a.uploaded.getTime())
        .map((item) => ({
          key: item.key,
          url: `/media/${encodeURIComponent(item.key)}`,
          title: item.customMetadata?.title || filenameToTitle(item.key),
          uploaded: item.uploaded.toISOString(),
        }));
      return Response.json({ items }, { headers: { "cache-control": "no-store" } });
    }

    if (url.pathname.startsWith("/media/") && request.method === "GET") {
      const key = decodeURIComponent(url.pathname.slice("/media/".length));
      if (!key.startsWith("gallery/") && key !== "resume/shaif-ahamed-tamim.pdf") {
        return new Response("Not found", { status: 404 });
      }
      const object = await env.MEDIA.get(key);
      if (!object) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("cache-control", "public, max-age=3600");
      headers.set("x-content-type-options", "nosniff");
      return new Response(object.body, { headers });
    }

    if (url.pathname === "/api/portfolio/upload" && request.method === "POST") {
      if (!isOwnerRequest(request, url)) {
        return Response.json({ error: "Owner access required." }, { status: 403 });
      }

      const form = await request.formData();
      const file = form.get("file");
      const kind = form.get("kind");
      const title = String(form.get("title") || "").trim().slice(0, 80);

      if (!(file instanceof File) || (kind !== "photo" && kind !== "cv")) {
        return Response.json({ error: "Choose a valid file and artifact type." }, { status: 400 });
      }

      const maxBytes = kind === "cv" ? 8_000_000 : 15_000_000;
      if (file.size > maxBytes) {
        return Response.json({ error: "That file is too large for the archive." }, { status: 413 });
      }

      const photoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
      if (kind === "photo" && !photoTypes.has(file.type)) {
        return Response.json({ error: "Gallery uploads must be JPEG, PNG, or WebP." }, { status: 415 });
      }
      if (kind === "cv" && file.type !== "application/pdf") {
        return Response.json({ error: "The living CV must be a PDF." }, { status: 415 });
      }

      const key =
        kind === "cv"
          ? "resume/shaif-ahamed-tamim.pdf"
          : `gallery/${Date.now()}-${crypto.randomUUID()}-${safeFilename(file.name)}`;

      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type,
          contentDisposition: kind === "cv" ? 'inline; filename="shaif-ahamed-tamim-cv.pdf"' : "inline",
        },
        customMetadata: { title: title || filenameToTitle(file.name) },
      });

      return Response.json({ ok: true, key, url: `/media/${encodeURIComponent(key)}` });
    }

    if (url.pathname === "/documents/shaif-ahamed-tamim-cv.pdf" && request.method === "GET") {
      const latest = await env.MEDIA.get("resume/shaif-ahamed-tamim.pdf");
      if (latest) {
        const headers = new Headers();
        latest.writeHttpMetadata(headers);
        headers.set("cache-control", "no-store");
        return new Response(latest.body, { headers });
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

function isOwnerRequest(request: Request, url: URL): boolean {
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
  return request.headers.get("oai-authenticated-user-email")?.toLowerCase() ===
    "tamim.shaifahamed@icloud.com";
}

function safeFilename(value: string): string {
  const cleaned = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "untitled-image";
}

function filenameToTitle(value: string): string {
  return value
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .replace(/^\d+-[a-f0-9-]+-/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Untitled frame";
}

export default worker;
