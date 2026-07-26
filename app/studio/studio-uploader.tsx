"use client";

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
      const response = await fetch("/api/portfolio/upload", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(result.error || "Upload failed");
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
