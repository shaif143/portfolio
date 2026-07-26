"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";

type StudioUploaderProps = {
  galleryOnly?: boolean;
  onPublished?: () => void;
};

export function StudioUploader({
  galleryOnly = false,
  onPublished,
}: StudioUploaderProps = {}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [artifactKind, setArtifactKind] = useState<"photo" | "cv">("photo");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("Transmitting to the archive…");
    const form = event.currentTarget;
    const data = new FormData(form);
    let publishedCount = 0;

    try {
      const files = data
        .getAll("file")
        .filter((value): value is File => value instanceof File && value.size > 0);
      const kind = galleryOnly ? "photo" : data.get("kind");
      const title = String(data.get("title") || "").trim();
      const studioKey = String(data.get("studioKey") || "");
      const photoFormat = data.get("photoFormat") === "png" ? "png" : "jpg";

      if (files.length === 0 || (kind !== "photo" && kind !== "cv")) {
        throw new Error("Choose a valid file and artifact type.");
      }

      if (kind === "cv" && files.length !== 1) {
        throw new Error("Choose one PDF when replacing the living CV.");
      }

      let convertedCount = 0;
      for (const [index, file] of files.entries()) {
        const position = `${index + 1} of ${files.length}`;
        let uploadFile = file;

        if (kind === "photo" && looksLikeHeic(file)) {
          setStatus(
            `Converting ${position} from HEIC to ${
              photoFormat === "png" ? "lossless PNG" : "high-quality JPG"
            } on your device…`,
          );

          const { heicTo, isHeic } = await import("heic-to");
          if (!(await isHeic(file))) {
            throw new Error(`${file.name} is not a valid HEIC image.`);
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
          convertedCount += 1;
        }

        if (
          kind === "photo" &&
          !["image/jpeg", "image/png", "image/webp"].includes(uploadFile.type)
        ) {
          throw new Error(`${file.name} is not a supported photograph.`);
        }

        if (kind === "photo" && uploadFile.size > 50_000_000) {
          throw new Error(
            `${file.name} is larger than 50 MB after conversion. Choose high-quality JPG.`,
          );
        }

        const itemTitle =
          files.length > 1 && title
            ? `${title} ${String(index + 1).padStart(2, "0")}`
            : title;
        const pathname =
          kind === "cv"
            ? "resume/shaif-ahamed-tamim.pdf"
            : `gallery/${Date.now()}-${crypto.randomUUID()}-${safeFilename(
                itemTitle || uploadFile.name,
                uploadFile.name,
              )}`;

        setStatus(`Publishing ${position} to the private archive…`);
        await upload(pathname, uploadFile, {
          access: "public",
          handleUploadUrl: "/api/portfolio/upload",
          headers: { "x-studio-key": studioKey },
          clientPayload: JSON.stringify({ kind, title: itemTitle }),
          contentType: uploadFile.type,
          multipart: uploadFile.size > 5_000_000,
        });
        publishedCount += 1;
      }

      const conversionNote =
        convertedCount > 0
          ? ` ${convertedCount} HEIC ${
              convertedCount === 1 ? "original" : "originals"
            } never left your device.`
          : "";
      setStatus(
        `${publishedCount} ${
          publishedCount === 1 ? "artwork" : "artworks"
        } published.${conversionNote}`,
      );
      form.reset();
      setArtifactKind("photo");
      onPublished?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setStatus(
        publishedCount > 0
          ? `${publishedCount} published before the interruption. ${message}`
          : message,
      );
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
      {!galleryOnly && (
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
      )}
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
        {galleryOnly ? "Collection title · optional" : "Gallery title"}
        <input
          name="title"
          maxLength={80}
          placeholder={
            galleryOnly
              ? "e.g. Dhaka after rain"
              : "e.g. Rain over Dhanmondi"
          }
        />
      </label>
      <label>
        {galleryOnly ? "Select photographs" : "Select file"}
        <input
          name="file"
          type="file"
          required
          multiple={galleryOnly}
          accept={
            artifactKind === "photo"
              ? ".heic,.heif,image/heic,image/heif,image/jpeg,image/png,image/webp"
              : "application/pdf"
          }
        />
      </label>
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy
          ? "Publishing…"
          : galleryOnly
            ? "Publish selected photographs"
            : "Publish artifact"}{" "}
        <span>↗</span>
      </button>
      <p className="studio-status" role="status">{status}</p>
      {!galleryOnly && (
        <a className="text-link" href="/">Return to portfolio <span>↙</span></a>
      )}
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
