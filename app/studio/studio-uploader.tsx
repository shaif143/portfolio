"use client";

import { upload } from "@vercel/blob/client";
import { FormEvent, useState } from "react";

export function StudioUploader() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

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

      if (!(file instanceof File) || (kind !== "photo" && kind !== "cv")) {
        throw new Error("Choose a valid file and artifact type.");
      }

      const pathname =
        kind === "cv"
          ? "resume/shaif-ahamed-tamim.pdf"
          : `gallery/${Date.now()}-${crypto.randomUUID()}-${safeFilename(title || file.name, file.name)}`;

      await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/portfolio/upload",
        headers: { "x-studio-key": studioKey },
        clientPayload: JSON.stringify({ kind, title }),
        contentType: file.type,
        multipart: file.size > 5_000_000,
      });

      setStatus("Published. The portfolio has been updated.");
      form.reset();
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
        <select name="kind" defaultValue="photo">
          <option value="photo">Nocturne photograph</option>
          <option value="cv">Living CV</option>
        </select>
      </label>
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
          accept="image/jpeg,image/png,image/webp,application/pdf"
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
