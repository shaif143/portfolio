"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NocturneGallery } from "./nocturne-gallery";

const publications = [
  {
    status: "Published",
    code: "R.01",
    title: "Advancing Monkeypox Diagnosis",
    detail: "A novel approach using custom neural networks.",
    tone: "lime",
  },
  {
    status: "Published",
    code: "R.02",
    title: "DeepResVit",
    detail: "Hybrid deep learning for ovarian cancer classification with XAI.",
    tone: "lime",
  },
  {
    status: "Submitted",
    code: "R.03",
    title: "Explainable Human Activity Recognition",
    detail: "A hybrid CNN–ANN model for smartphone-based healthcare analytics.",
    tone: "cyan",
  },
  {
    status: "In progress",
    code: "R.04",
    title: "AeroLung AI",
    detail: "Explainable machine learning for lung cancer prediction.",
    tone: "violet",
  },
  {
    status: "In progress",
    code: "R.05",
    title: "Interpretable HAR",
    detail: "Transfer learning techniques for human activity recognition.",
    tone: "violet",
  },
  {
    status: "In progress",
    code: "R.06",
    title: "Liver Disease Diagnosis",
    detail: "Ensemble machine learning techniques for clinical decision support.",
    tone: "violet",
  },
];

const experiences = [
  {
    period: "Now",
    role: "AI/ML Researcher & Software Engineer",
    org: "PAP International Ltd.",
    copy: "Production AI pipelines, document intelligence, data ingestion, REST APIs, and cost-aware LLM architecture.",
    tags: ["LangChain", "OpenAI", "NLP", "APIs"],
  },
  {
    period: "Now",
    role: "Research Assistant & Team Lead",
    org: "AIRIL — AI Research & Innovation Lab",
    copy: "Mentoring three research teams across healthcare AI, explainability, NLP, and deep learning.",
    tags: ["XAI", "BERT", "CNN", "Mentorship"],
  },
  {
    period: "Chapter 02",
    role: "Team Leader",
    org: "AIESEC Bangladesh — Dhaka South",
    copy: "Led a four-person team through high-pressure, cross-functional events and delivery.",
    tags: ["Leadership", "Operations"],
  },
  {
    period: "Chapter 01",
    role: "Volunteer — IT Support",
    org: "Sholoana Foundation & Ashia Foundation",
    copy: "Maintained technology infrastructure and supported medical campaigns and community programs.",
    tags: ["Service", "IT Systems"],
  },
];

const skillLoops = [
  "Agentic AI",
  "RAG Architecture",
  "LangGraph",
  "LLM Systems",
  "Deep Learning",
  "AWS",
  "Computer Vision",
  "Human-Centered AI",
];

function useTilt() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups = cards.map((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--rx", `${-y * 7}deg`);
        card.style.setProperty("--ry", `${x * 9}deg`);
        card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      };
      const leave = () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function SectionIntro({
  index,
  eyebrow,
  title,
  note,
}: {
  index: string;
  eyebrow: string;
  title: string;
  note: string;
}) {
  return (
    <div className="section-intro" data-reveal>
      <div className="section-index">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p className="section-note">{note}</p>
    </div>
  );
}

export function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useTilt();
  useReveal();

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <header className={progress < 0.008 ? "topbar topbar-landing" : "topbar"}>
        <a className="monogram" href="#top" aria-label="Back to top">
          <span>S</span>
          <i />
          <span>AT</span>
        </a>
        <div className="availability">
          <span className="availability-dot" />
          Dhaka · open to consequential work
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>Research</a>
          <a href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <section className="hero-artwork" id="top" aria-label="Shaif Ahamed Tamim — AI Engineer, Researcher, Builder">
        <div className="hero-artwork-frame">
          <Image
            src="/og.png"
            alt="Shaif Ahamed Tamim in a futuristic glass chamber with the title AI Engineer, Researcher, Builder"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <a className="artwork-scroll" href="#identity">
          Enter portfolio <span>↓</span>
        </a>
      </section>

      <div className="skill-marquee" aria-label="Core expertise">
        <div className="skill-track">
          {[...skillLoops, ...skillLoops].map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section className="identity section-shell" id="identity">
        <SectionIntro
          index="02"
          eyebrow="Identity Core"
          title="A technologist with a researcher’s patience."
          note="Equal parts rigorous engineering, restless curiosity, and a bias toward useful outcomes."
        />
        <div className="identity-grid">
          <article className="statement-card tilt-card" data-tilt data-reveal>
            <p className="card-kicker">Operating principle</p>
            <blockquote>
              “Build intelligence that earns trust—not attention.”
            </blockquote>
            <p>
              I work across AI research, production software, cloud systems, and
              human-centered design. The goal is not another demo. It is an
              intelligent system people can understand, use, and rely on.
            </p>
            <div className="signature-wrap">
              <Image src="/assets/shaif-signature.png" alt="Shaif's signature" width={300} height={80} />
              <span>Shaif Ahamed Tamim</span>
            </div>
          </article>
          <div className="identity-facts">
            {[
              ["Based", "Dhaka, Bangladesh"],
              ["Languages", "Bengali · English · Hindi"],
              ["Focus", "AI engineering · research · cloud"],
              ["North star", "Clarity, consequence, craft"],
            ].map(([label, value], index) => (
              <div className="fact-row" key={label} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
                <span>0{index + 1}</span>
                <p>{label}</p>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience section-shell" id="work">
        <SectionIntro
          index="03"
          eyebrow="Trajectory"
          title="Where research becomes operating reality."
          note="A career in motion across applied intelligence, software engineering, team leadership, and service."
        />
        <div className="experience-stack">
          {experiences.map((experience, index) => (
            <article
              className="experience-card tilt-card"
              data-tilt
              data-reveal
              key={experience.role}
              style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="experience-period">{experience.period}</div>
              <div className="experience-main">
                <p>{experience.org}</p>
                <h3>{experience.role}</h3>
                <span>{experience.copy}</span>
              </div>
              <div className="tag-stack">
                {experience.tags.map((tag) => <i key={tag}>{tag}</i>)}
              </div>
              <div className="experience-number">0{index + 1}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="capstone section-shell">
        <div className="capstone-frame" data-reveal>
          <div className="capstone-topline">
            <p><span>Featured system</span> IIT Roorkee · Group 3 Capstone</p>
            <span>2026</span>
          </div>
          <div className="capstone-grid">
            <div className="capstone-copy">
              <p className="eyebrow">Built Intelligence</p>
              <h2>Clinical reports,<br />translated into action.</h2>
              <p>
                A cloud-deployed multi-agent assistant that reads patient lab
                reports, extracts clinical findings, produces concise summaries,
                and grounds follow-up recommendations in medical guidelines.
              </p>
              <a
                className="text-link"
                href="https://drive.google.com/file/d/13hsqASgPu1Km8b1_hith6v6IRvkB-QCk/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Watch project presentation <span>↗</span>
              </a>
            </div>
            <div className="system-orbit" aria-label="Project architecture visualization">
              <div className="orbit-core">
                <span>RAG</span>
                <small>medical intelligence</small>
              </div>
              {["PDF", "ANALYZE", "SUMMARIZE", "RECOMMEND"].map((node, index) => (
                <div className={`orbit-node node-${index + 1}`} key={node}>{node}</div>
              ))}
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
            </div>
          </div>
          <div className="capstone-metrics">
            {[
              ["03", "specialized agents"],
              ["08", "guideline documents"],
              ["15", "synthetic reports"],
              ["AWS", "EC2 + S3 deployment"],
            ].map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <div className="architecture-flow">
            {["PDF intake", "Report analysis", "Clinical summary", "RAG recommendation", "Human review"].map((step, index) => (
              <div key={step}><span>{index + 1}</span>{step}{index < 4 && <i>→</i>}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="research section-shell" id="research">
        <SectionIntro
          index="04"
          eyebrow="Research Frontier"
          title="Questions worth staying with."
          note="Six research signals spanning diagnostic AI, deep learning, explainability, and intelligent healthcare."
        />
        <div className="research-grid">
          {publications.map((publication, index) => (
            <article
              className={`research-card tilt-card ${publication.tone}`}
              data-tilt
              data-reveal
              key={publication.code}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <div className="research-meta">
                <span>{publication.code}</span>
                <i>{publication.status}</i>
              </div>
              <h3>{publication.title}</h3>
              <p>{publication.detail}</p>
              <div className="research-arrow">↗</div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section-shell">
        <SectionIntro
          index="05"
          eyebrow="Academic Orbit"
          title="Foundations, then altitude."
          note="A technical education shaped in Dhaka and extended through advanced AI engineering on cloud."
        />
        <div className="education-layout">
          <article className="learning-core tilt-card" data-tilt data-reveal>
            <div className="learning-badge">Completed pathway</div>
            <p>Advanced PG Certificate</p>
            <h3>AI Engineering on Cloud & AIOps</h3>
            <span>Futurense × Indian Institute of Technology Roorkee</span>
            <div className="module-cloud" aria-label="Course modules">
              {["ML", "DL", "NLP", "Cloud", "GenAI", "LLMs", "RAG", "Agents", "AIOps"].map((module) => (
                <i key={module}>{module}</i>
              ))}
            </div>
            <a
              href="/documents/aiops-lesson-plan-iit-roorkee.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Explore the learning architecture <span>↗</span>
            </a>
          </article>
          <div className="degree-stack">
            {[
              ["BSc", "Computer Science & Engineering", "American International University-Bangladesh"],
              ["HSC", "Science", "Govt. Science College"],
              ["SSC", "Science", "Rajendrapur Cantonment Public School & College"],
            ].map(([code, degree, school], index) => (
              <article key={code} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <span>{code}</span>
                <div><h3>{degree}</h3><p>{school}</p></div>
                <i>0{index + 1}</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="honors section-shell">
        <SectionIntro
          index="06"
          eyebrow="Honor Ledger"
          title="Recognition is a signal. The work remains the source."
          note="Academic excellence, emerging leadership, and the responsibility to lift other researchers."
        />
        <div className="honor-grid">
          {[
            ["02×", "Dean’s Honourable Mention", "AIUB · academic excellence"],
            ["2024", "Emerging Leader Award", "DMH Foundation"],
            ["03", "Research Teams Mentored", "Healthcare AI · NLP · XAI"],
          ].map(([value, title, detail], index) => (
            <article className="honor-card tilt-card" data-tilt data-reveal key={title}>
              <span>{value}</span>
              <div className="honor-medallion"><i>{index + 1}</i></div>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <NocturneGallery />

      <section className="inner-frequency section-shell">
        <SectionIntro
          index="08"
          eyebrow="Inner Frequency"
          title="The systems behind the systems."
          note="Photography teaches attention. Poetry teaches compression. Service gives technology a reason."
        />
        <div className="frequency-grid">
          <article className="poem-card" data-reveal>
            <div className="poem-image-wrap">
              <Image
                src="/assets/spiritual-reflection.png"
                alt="A spiritual reflection written by Shaif"
                width={1866}
                height={3108}
              />
            </div>
            <div className="poem-caption">
              <span>Written reflection · personal archive</span>
              <h3>“What is truly mine?”</h3>
              <p>A meditation on possession, identity, the soul, and the Divine command.</p>
            </div>
          </article>
          <div className="interest-stack">
            {[
              ["01", "Photography", "Light, stillness, accidental geometry."],
              ["02", "Poetry", "Meaning compressed until every word carries weight."],
              ["03", "Human–computer interaction", "Making complex systems feel inevitable."],
              ["04", "Mentorship", "Knowledge compounds when it moves through people."],
            ].map(([number, title, copy]) => (
              <article key={title} data-reveal>
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact-panel" data-reveal>
          <div className="contact-radar" aria-hidden="true">
            <i /><i /><i /><span />
          </div>
          <p className="eyebrow">Open Channel · 09</p>
          <h2>Let’s make the next<br /><em>impossible</em> thing practical.</h2>
          <p className="contact-copy">
            I know you are busy, so this takes sixty seconds: if the work involves
            applied AI, research, intelligent products, or a problem that refuses
            to be ordinary, I would like to hear about it.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:tamim.shaifahamed@icloud.com?subject=Let%27s%20build%20something%20intelligent">
              Start a conversation <span>↗</span>
            </a>
            <a className="contact-email" href="mailto:tamim.shaifahamed@icloud.com">
              tamim.shaifahamed@icloud.com
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="footer-name" href="#top">Shaif Ahamed Tamim</a>
        <div className="footer-center">
          <Image src="/assets/shaif-signature.png" alt="" width={150} height={40} />
          <span>Designed with intent · built with intelligence</span>
        </div>
        <div className="footer-links">
          <a href="mailto:tamim.shaifahamed@icloud.com">Email</a>
          <a href="https://github.com/shaif143" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/gallery">Gallery</a>
          <a href="/api/portfolio/resume">CV</a>
          <a href="/studio">Owner studio</a>
          <a href="#top">Top ↑</a>
        </div>
      </footer>
    </main>
  );
}
