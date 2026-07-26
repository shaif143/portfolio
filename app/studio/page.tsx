import { StudioUploader } from "./studio-uploader";

export default function StudioPage() {
  return (
    <main className="studio-page">
      <section className="studio-shell">
        <p className="eyebrow">Owner Studio · Private surface</p>
        <h1>Curate the living archive.</h1>
        <p>
          Enter your private studio key, then upload a PDF to replace the living
          CV or add an original mobile photograph to the Nocturne Archive.
          iPhone HEIC and HEIF photos are converted privately before publishing.
        </p>
        <StudioUploader />
      </section>
    </main>
  );
}
