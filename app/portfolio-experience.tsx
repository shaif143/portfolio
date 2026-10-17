"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NocturneGallery } from "./nocturne-gallery";

const experiences = [
  {
    period: "Current role",
    role: "Research Assistant & Team Lead",
    org: "AIRIL — AI Research & Innovation Lab",
    copy: "Mentoring three research teams working across healthcare AI, explainability, natural language processing, and deep learning.",
    tags: ["Explainable AI", "BERT", "CNN", "Research mentorship"],
  },
  {
    period: "Previous experience",
    role: "AI/ML Researcher & Software Engineer",
    org: "PAP International Ltd.",
    copy: "Built production AI pipelines, document intelligence, data ingestion, REST APIs, and cost-aware large language model architecture.",
    tags: ["LangChain", "LLM architecture", "NLP", "REST APIs"],
  },
  {
    period: "Leadership",
    role: "Team Leader",
    org: "AIESEC Bangladesh — Dhaka South",
    copy: "Led a four-person team through cross-functional events, coordinating operations and delivery under pressure.",
    tags: ["Team leadership", "Operations"],
  },
  {
    period: "Community service",
    role: "Volunteer — IT Support",
    org: "Sholoana Foundation & Ashia Foundation",
    copy: "Maintained technology infrastructure and supported medical campaigns and community programs.",
    tags: ["IT support", "Volunteering"],
  },
];

const publications = [
  {
    status: "Published",
    title: "Advancing Monkeypox Diagnosis",
    detail: "A novel approach using custom neural networks.",
    field: "Diagnostic AI",
  },
  {
    status: "Published",
    title: "DeepResVit",
    detail:
      "Hybrid deep learning for ovarian cancer classification with explainable AI.",
    field: "Deep learning · XAI",
  },
  {
    status: "Submitted",
    title: "Explainable Human Activity Recognition",
    detail: "A hybrid CNN–ANN model for smartphone-based healthcare analytics.",
    field: "Healthcare analytics",
  },
  {
    status: "In progress",
    title: "AeroLung AI",
    detail: "Explainable machine learning for lung cancer prediction.",
    field: "Machine learning",
  },
  {
    status: "In progress",
    title: "Interpretable HAR",
    detail: "Transfer learning techniques for human activity recognition.",
    field: "Transfer learning",
  },
  {
    status: "In progress",
    title: "Liver Disease Diagnosis",
    detail:
      "Ensemble machine learning techniques for clinical decision support.",
    field: "Clinical decision support",
  },
];

function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="profile-section-heading">
      <p className="profile-label">
        <span>{number}</span>
        {label}
      </p>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="profile-site">
      <a className="profile-skip" href="#main-content">
        Skip to content
      </a>
      <header className="profile-header">
        <div className="profile-container profile-nav-wrap">
          <a
            className="profile-brand"
            href="#top"
            aria-label="Shaif Ahamed Tamim — home"
          >
            <span className="profile-brand-mark">
              ST<span>.</span>
            </span>
            <span>Shaif Ahamed Tamim</span>
          </a>
          <button
            className="profile-menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="profile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
          </button>
          <nav
            id="profile-navigation"
            className={`profile-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {[
              ["#about", "About"],
              ["#experience", "Experience"],
              ["#projects", "Projects"],
              ["#research", "Research"],
              ["/gallery", "Gallery"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="profile-nav-contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section
          className="profile-hero"
          id="top"
          aria-labelledby="profile-title"
        >
          <div className="profile-container profile-hero-grid">
            <div className="profile-hero-copy">
              <p className="profile-label">
                <span className="profile-status-dot" />
                AI engineering · Research · Software
              </p>
              <h1 id="profile-title">
                Shaif Ahamed
                <br />
                <em>Tamim.</em>
              </h1>
              <p className="profile-hero-intro">
                I build intelligent systems
                <br />
                with a purpose.
              </p>
              <p className="profile-hero-description">
                AI engineer and researcher connecting applied machine learning,
                thoughtful software, and healthcare research. Based in Dhaka,
                Bangladesh.
              </p>
              <div className="profile-actions">
                <a
                  className="profile-button profile-button-primary"
                  href="#projects"
                >
                  Explore my work <Arrow />
                </a>
                <a
                  className="profile-button profile-button-outline"
                  href="/api/portfolio/resume"
                  target="_blank"
                  rel="noreferrer"
                >
                  View CV <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="profile-hero-current">
                <span>Currently at</span>
                <strong>AIRIL</strong>
                <span className="profile-current-divider" />
                <span>Research Assistant & Team Lead</span>
              </div>
            </div>
            <div className="profile-portrait-panel">
              <div className="profile-portrait-label">
                <span>Meet the person behind the work</span>
                <span aria-hidden="true">01 / PROFILE</span>
              </div>
              <div className="profile-photo">
                <Image
                  src="/assets/shaif-portrait.png"
                  alt="Shaif Ahamed Tamim, AI engineer and researcher"
                  width={1086}
                  height={1448}
                  sizes="(max-width: 700px) 90vw, 40vw"
                  priority
                />
              </div>
              <div className="profile-portrait-caption">
                <span>Research-led. People-focused.</span>
                <a
                  href="https://github.com/shaif143"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <Arrow />
                </a>
              </div>
            </div>
          </div>
          <div className="profile-container profile-hero-bottom">
            <span>Applied intelligence. Practical impact.</span>
            <a href="#about">
              A closer look <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="profile-section profile-about" id="about">
          <div className="profile-container">
            <SectionHeading
              number="01"
              label="About me"
              title="Curiosity, with a practical direction."
            />
            <div className="profile-about-grid">
              <div className="profile-about-copy">
                <h3>
                  A researcher’s patience.
                  <br />
                  An engineer’s mindset.
                </h3>
                <p>
                  My work sits where AI research meets software people can use.
                  I build document intelligence and AI pipelines, explore
                  explainable models for healthcare, and help research teams
                  turn questions into structured work.
                </p>
                <p>
                  At AIRIL, I mentor three teams across healthcare AI, NLP, and
                  deep learning. Previously, at PAP International Ltd., I worked
                  on production AI systems, APIs, and LLM architecture.
                </p>
                <a
                  className="profile-inline-link"
                  href="/api/portfolio/resume"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read my full CV <Arrow />
                </a>
              </div>
              <dl className="profile-facts">
                {[
                  ["Based in", "Dhaka, Bangladesh"],
                  ["Current focus", "Applied AI & healthcare research"],
                  ["Languages", "Bengali, English & Hindi"],
                  ["Approach", "Clarity, usefulness & collaboration"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="profile-capabilities">
              <p>Areas I work in</p>
              <div>
                {[
                  "Agentic AI",
                  "RAG systems",
                  "LangGraph",
                  "LLM architecture",
                  "Deep learning",
                  "Computer vision",
                  "AWS",
                  "Explainable AI",
                ].map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section profile-experience" id="experience">
          <div className="profile-container">
            <SectionHeading
              number="02"
              label="Experience"
              title="Work, research & responsibility."
              description="A path through applied AI, software engineering, team leadership, and community service."
            />
            <div className="profile-timeline">
              {experiences.map((experience, index) => (
                <article className="profile-role" key={experience.org}>
                  <div className="profile-role-period">
                    <span
                      className={index === 0 ? "profile-current-badge" : ""}
                    >
                      {experience.period}
                    </span>
                    <span className="profile-role-index">0{index + 1}</span>
                  </div>
                  <div className="profile-role-content">
                    <p className="profile-organization">{experience.org}</p>
                    <h3>{experience.role}</h3>
                    <p>{experience.copy}</p>
                    <div className="profile-tags">
                      {experience.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="profile-section profile-projects" id="projects">
          <div className="profile-container">
            <SectionHeading
              number="03"
              label="Selected projects"
              title="Ideas put into practice."
              description="Two approaches to the same question: how can clinical reports become easier to understand?"
            />
            <div className="profile-project-grid">
              <article className="profile-project-card">
                <div
                  className="profile-project-visual profile-rag-visual"
                  aria-label="Report to retrieval to explanation workflow"
                >
                  <div className="profile-document-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <i />
                  </div>
                  <div className="profile-workflow">
                    <span>Report</span>
                    <i>→</i>
                    <span>Retrieve</span>
                    <i>→</i>
                    <span>Explain</span>
                  </div>
                  <span className="profile-visual-caption">
                    CLINICAL INTELLIGENCE / 01
                  </span>
                </div>
                <div className="profile-project-body">
                  <div className="profile-project-meta">
                    <span>Applied AI · Group capstone</span>
                    <span>01</span>
                  </div>
                  <h3>ClinicalAI</h3>
                  <p>
                    A multi-agent assistant that reads patient lab reports,
                    summarizes findings, and uses retrieved medical guidelines
                    to support follow-up explanations.
                  </p>
                  <div className="profile-tags">
                    <span>RAG</span>
                    <span>Multi-agent systems</span>
                    <span>PDF analysis</span>
                  </div>
                  <a
                    className="profile-project-link"
                    href="https://clinical-assistant-agent.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore the RAG system <Arrow />
                  </a>
                </div>
              </article>
              <article className="profile-project-card">
                <div
                  className="profile-project-visual profile-okf-visual"
                  aria-label="Structured knowledge connected to a clinical explanation"
                >
                  <div className="profile-knowledge-grid" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span>OKF</span>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="profile-visual-caption">
                    CLINICAL INTELLIGENCE / 02
                  </span>
                </div>
                <div className="profile-project-body">
                  <div className="profile-project-meta">
                    <span>Knowledge engineering · Independent project</span>
                    <span>02</span>
                  </div>
                  <h3>ClinicalOKF</h3>
                  <p>
                    A clinical report assistant exploring structured knowledge,
                    clinical ontology, visible safety rules, source trails, and
                    human review as an alternative to vector retrieval.
                  </p>
                  <div className="profile-tags">
                    <span>Open Knowledge Format</span>
                    <span>Rule engine</span>
                    <span>Audit trails</span>
                  </div>
                  <a
                    className="profile-project-link"
                    href="https://clinical-assistant-okf.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore the OKF system <Arrow />
                  </a>
                </div>
              </article>
            </div>
            <p className="profile-project-note">
              Research and engineering projects for explaining information.
              Clinical decisions require qualified medical review.
            </p>
            <a
              className="profile-inline-link"
              href="https://github.com/shaif143"
              target="_blank"
              rel="noreferrer"
            >
              More on GitHub <Arrow />
            </a>
          </div>
        </section>

        <section className="profile-section profile-research" id="research">
          <div className="profile-container">
            <SectionHeading
              number="04"
              label="Research"
              title="Making AI more understandable."
              description="Research interests in explainability, diagnostic AI, and the application of deep learning to healthcare."
            />
            <div className="profile-research-list">
              {publications.map((publication, index) => (
                <article className="profile-paper" key={publication.title}>
                  <span className="profile-paper-number">0{index + 1}</span>
                  <div>
                    <span className="profile-paper-field">
                      {publication.field}
                    </span>
                    <h3>{publication.title}</h3>
                    <p>{publication.detail}</p>
                  </div>
                  <span
                    className={`profile-paper-status ${publication.status === "Published" ? "is-published" : ""}`}
                  >
                    {publication.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="profile-section profile-education" id="education">
          <div className="profile-container">
            <SectionHeading
              number="05"
              label="Education & learning"
              title="A foundation to keep building on."
            />
            <div className="profile-education-grid">
              <article className="profile-certificate">
                <span className="profile-label">Professional development</span>
                <h3>
                  AI Engineering
                  <br />
                  on Cloud & AIOps
                </h3>
                <p className="profile-certificate-school">
                  Futurense × IIT Roorkee
                </p>
                <p>
                  Completed the Advanced PG Certificate pathway, extending my
                  work across machine learning, cloud, generative AI, agents,
                  and AIOps.
                </p>
                <div className="profile-tags">
                  {[
                    "ML & deep learning",
                    "Cloud",
                    "Generative AI",
                    "AIOps",
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="profile-inline-link"
                  href="/documents/aiops-lesson-plan-iit-roorkee.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View course curriculum <Arrow />
                </a>
              </article>
              <div className="profile-degrees">
                {[
                  [
                    "BSc",
                    "Computer Science & Engineering",
                    "American International University-Bangladesh",
                  ],
                  ["HSC", "Science", "Govt. Science College"],
                  [
                    "SSC",
                    "Science",
                    "Rajendrapur Cantonment Public School & College",
                  ],
                ].map(([code, degree, school]) => (
                  <article key={code}>
                    <span>{code}</span>
                    <div>
                      <h3>{degree}</h3>
                      <p>{school}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="profile-section profile-recognition"
          id="recognition"
        >
          <div className="profile-container">
            <SectionHeading
              number="06"
              label="Recognition"
              title="Milestones along the way."
            />
            <div className="profile-awards">
              {[
                [
                  "02×",
                  "Dean’s Honourable Mention",
                  "AIUB · Academic excellence",
                ],
                ["2024", "Emerging Leader Award", "DMH Foundation"],
                [
                  "03",
                  "Research teams mentored",
                  "Healthcare AI, NLP & explainability",
                ],
              ].map(([value, title, detail]) => (
                <article key={title}>
                  <span>{value}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <NocturneGallery />

        <section className="profile-section profile-interests" id="interests">
          <div className="profile-container">
            <SectionHeading
              number="08"
              label="Beyond the work"
              title="A little more of who I am."
              description="Photography, writing, and community are part of how I pay attention to the world."
            />
            <div className="profile-interests-grid">
              <article className="profile-poem">
                <span className="profile-label">A personal reflection</span>
                <h3>“What is truly mine?”</h3>
                <blockquote>
                  “A mere echo of His will,
                  <br />a breath shaped by His decree.”
                </blockquote>
                <p>
                  A reflection on possession, identity, the soul, and the Divine
                  command.
                </p>
                <a
                  className="profile-inline-link"
                  href="/assets/spiritual-reflection.png"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the complete poem <Arrow />
                </a>
              </article>
              <div className="profile-interest-list">
                {[
                  [
                    "Photography",
                    "Finding light, stillness, and small details with my phone.",
                  ],
                  [
                    "Poetry",
                    "Making space for reflection, meaning, and faith.",
                  ],
                  [
                    "Human–computer interaction",
                    "Making complex tools easier for people to use.",
                  ],
                  [
                    "Mentorship & service",
                    "Sharing knowledge and supporting the communities around me.",
                  ],
                ].map(([title, copy]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section profile-contact" id="contact">
          <div className="profile-container profile-contact-grid">
            <div>
              <p className="profile-label">
                <span>09</span>Get in touch
              </p>
              <h2>
                Good work starts
                <br />
                with a conversation.
              </h2>
              <p>
                I’m interested in opportunities across AI engineering, applied
                research, and intelligent software. If that connects with your
                team’s work, I’d like to hear from you.
              </p>
              <a
                className="profile-button profile-button-primary"
                href="mailto:tamim.shaifahamed@icloud.com"
              >
                Send me an email <Arrow />
              </a>
            </div>
            <div className="profile-contact-details">
              <a href="mailto:tamim.shaifahamed@icloud.com">
                <span>Email</span>
                <strong>tamim.shaifahamed@icloud.com</strong>
                <Arrow />
              </a>
              <a
                href="https://github.com/shaif143"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub</span>
                <strong>github.com/shaif143</strong>
                <Arrow />
              </a>
              <a href="/api/portfolio/resume" target="_blank" rel="noreferrer">
                <span>Curriculum vitae</span>
                <strong>View my CV</strong>
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="profile-footer">
        <div className="profile-container">
          <a className="profile-brand" href="#top">
            <span className="profile-brand-mark">
              ST<span>.</span>
            </span>
            <span>Shaif Ahamed Tamim</span>
          </a>
          <p>AI engineer. Researcher. Always learning.</p>
          <div>
            <a href="/studio">Owner studio</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
