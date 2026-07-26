import { getChatGPTUser, chatGPTSignInPath } from "../chatgpt-auth";
import { StudioUploader } from "./studio-uploader";

export const dynamic = "force-dynamic";

const OWNER_EMAIL = "tamim.shaifahamed@icloud.com";

export default async function StudioPage() {
  const user = await getChatGPTUser();
  const isOwner = user?.email.toLowerCase() === OWNER_EMAIL;

  return (
    <main className="studio-page">
      <section className="studio-shell">
        <p className="eyebrow">Owner Studio · Private surface</p>
        <h1>Curate the living archive.</h1>
        {!user ? (
          <>
            <p>
              Sign in with the ChatGPT account connected to Shaif’s portfolio to
              upload a new CV or release photographs into the Nocturne Archive.
            </p>
            <a className="button button-primary" href={chatGPTSignInPath("/studio")}>
              Sign in to continue <span>↗</span>
            </a>
          </>
        ) : !isOwner ? (
          <>
            <p>
              This studio is owner-only. You are signed in as {user.email}, which
              does not have publishing access.
            </p>
            <a className="button button-ghost" href="/">Return to portfolio</a>
          </>
        ) : (
          <>
            <p>
              Welcome back, {user.fullName ?? "Shaif"}. Upload a PDF to replace the
              living CV, or add an original mobile photograph to the gallery.
            </p>
            <StudioUploader />
          </>
        )}
      </section>
    </main>
  );
}
