"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";

export function StudioUploader() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [artifactKind, setArtifactKind] = useState<"photo" | "cv">("photo");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("Transmitting to the archive…");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const file = data.get("file");
      const kind = data.get("kind");
      const title = String(data.get("title") || "").trim();
      const studioKey = String(data.get("studioKey") || "");
      const photoFormat = data.get("photoFormat") === "png" ? "png" : "jpg";

      if (!(file instanceof File) || (kind !== "photo" && kind !== "cv")) {
        throw new Error("Choose a valid file and artifact type.");
      }

      let uploadFile = file;
      let convertedFromHeic = false;

      if (kind === "photo" && looksLikeHeic(file)) {
        setStatus(
          photoFormat === "png"
            ? "Converting HEIC to lossless PNG on your device…"
            : "Converting HEIC to high-quality JPG on your device…",
        );

        const { heicTo, isHeic } = await import("heic-to");
        if (!(await isHeic(file))) {
          throw new Error("This file has a HEIC extension but is not a valid HEIC image.");
        }

        const converted =
          photoFormat === "png"
            ? await heicTo({ blob: file, type: "image/png" })
            : await heicTo({
                blob: file,
                type: "image/jpeg",
                quality: 0.96,
              });
        const outputType = photoFormat === "png" ? "image/png" : "image/jpeg";
        uploadFile = new File(
          [converted],
          replaceExtension(file.name, photoFormat === "png" ? ".png" : ".jpg"),
          { type: outputType, lastModified: file.lastModified },
        );
        convertedFromHeic = true;
      }

      if (
        kind === "photo" &&
        !["image/jpeg", "image/png", "image/webp"].includes(uploadFile.type)
      ) {
        throw new Error("Use a JPG, PNG, WebP, HEIC, or HEIF photograph.");
      }

      if (kind === "photo" && uploadFile.size > 50_000_000) {
        throw new Error(
          "The converted image is larger than 50 MB. Choose high-quality JPG for a smaller file.",
        );
      }

      const pathname =
        kind === "cv"
          ? "resume/shaif-ahamed-tamim.pdf"
          : `gallery/${Date.now()}-${crypto.randomUUID()}-${safeFilename(
              title || uploadFile.name,
              uploadFile.name,
            )}`;

      setStatus(
        convertedFromHeic
          ? "Conversion complete. Publishing the converted image…"
          : "Transmitting to the archive…",
      );

      await upload(pathname, uploadFile, {
        access: "public",
        handleUploadUrl: "/api/portfolio/upload",
        headers: { "x-studio-key": studioKey },
        clientPayload: JSON.stringify({ kind, title }),
        contentType: uploadFile.type,
        multipart: uploadFile.size > 5_000_000,
      });

      setStatus(
        convertedFromHeic
          ? `Published as ${photoFormat.toUpperCase()}. The original HEIC never left your device.`
          : "Published. The portfolio has been updated.",
      );
      form.reset();
      setArtifactKind("photo");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="studio-form" onSubmit={submit}>
      <label>
        Private studio key
        <input
          name="studioKey"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your owner key"
        />
      </label>
      <label>
        Artifact type
        <select
          name="kind"
          value={artifactKind}
          onChange={(event) =>
            setArtifactKind(event.target.value === "cv" ? "cv" : "photo")
          }
        >
          <option value="photo">Nocturne photograph</option>
          <option value="cv">Living CV</option>
        </select>
      </label>
      {artifactKind === "photo" && (
        <label>
          HEIC conversion output
          <select name="photoFormat" defaultValue="jpg">
            <option value="jpg">High-quality JPG · recommended</option>
            <option value="png">Lossless PNG · larger file</option>
          </select>
          <span className="studio-hint">
            HEIC and HEIF photos are converted privately on this device. Their
            original pixel dimensions are preserved.
          </span>
        </label>
      )}
      <label>
        Gallery title
        <input name="title" maxLength={80} placeholder="e.g. Rain over Dhanmondi" />
      </label>
      <label>
        Select file
        <input
          name="file"
          type="file"
          required
          accept={
            artifactKind === "photo"
              ? ".heic,.heif,image/heic,image/heif,image/jpeg,image/png,image/webp"
              : "application/pdf"
          }
        />
      </label>
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy ? "Publishing…" : "Publish artifact"} <span>↗</span>
      </button>
      <p className="studio-status" role="status">{status}</p>
      <a className="text-link" href="/">Return to portfolio <span>↙</span></a>
    </form>
  );
}

function looksLikeHeic(file: File): boolean {
  return (
    /\.(?:heic|heif)$/i.test(file.name) ||
    ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"].includes(
      file.type.toLowerCase(),
    )
  );
}

function replaceExtension(filename: string, extension: ".jpg" | ".png"): string {
  const stem = filename.replace(/\.[^.]+$/, "") || "iphone-photo";
  return `${stem}${extension}`;
}

function safeFilename(value: string, originalName: string): string {
  const extension =
    originalName.match(/\.(jpe?g|png|webp)$/i)?.[0].toLowerCase() || ".jpg";
  const stem = value
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${stem || "untitled-image"}${extension}`;
}
