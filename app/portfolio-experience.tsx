"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NocturneGallery } from "./nocturne-gallery";

const experiences = [
  {
    period: "Jun 2026 – Aug 2026",
    role: "AI & App Developer",
    org: "HyperGlow UK · Leicester, UK",
    copy: "Built customer-ordering models, an AI image-enhancement app for food photography, and a restaurant self-service ordering product with behavioural upsell. Delivered Next.js, PostgreSQL, React Native and Docker applications on Linux, alongside technical specifications and handover documentation.",
    tags: ["Applied ML", "Next.js", "PostgreSQL", "React Native", "Docker"],
  },
  {
    period: "Jan 2024 – Aug 2026",
    role: "Research Assistant & Research Team Lead",
    org: "AIRIL — AI Research & Innovation Lab",
    copy: "Led and mentored three research teams across healthcare AI, explainability, NLP and deep learning. Built PyTorch and TensorFlow pipelines, reviewed experiments and paper drafts, and contributed to six research papers.",
    tags: ["Explainable AI", "BERT", "CNN", "Research mentorship"],
  },
  {
    period: "Aug 2023 – Dec 2023",
    role: "AI/ML Researcher & Software Engineer (Intern)",
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
    status: "Research paper",
    title:
      "Advancing Monkeypox Diagnosis: A Novel Approach Using Custom Neural Networks",
    detail: "A novel approach using custom neural networks.",
    field: "Diagnostic AI",
  },
  {
    status: "Research paper",
    title:
      "DeepResVit: A Hybrid Deep Learning Approach for Ovarian Cancer Classification with XAI",
    detail:
      "Hybrid deep learning for ovarian cancer classification with explainable AI.",
    field: "Deep learning · XAI",
  },
  {
    status: "Research paper",
    title:
      "An Explainable Hybrid CNN–ANN Model for Smartphone-Based Human Activity Recognition in Healthcare Analytics",
    detail: "A hybrid CNN–ANN model for smartphone-based healthcare analytics.",
    field: "Healthcare analytics",
  },
  {
    status: "Research paper",
    title:
      "AeroLung AI: An Explainable Machine Learning Framework for Lung Cancer Prediction in Smart Healthcare Systems",
    detail: "Explainable machine learning for lung cancer prediction.",
    field: "Machine learning",
  },
  {
    status: "Research paper",
    title:
      "Interpretable Machine Learning Techniques for Human Activity Recognition using Transfer Learning",
    detail: "Transfer learning techniques for human activity recognition.",
    field: "Transfer learning",
  },
  {
    status: "Research paper",
    title:
      "Improving Liver Disease Diagnosis through Ensemble Machine Learning Techniques",
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
                Agentic AI · Computer vision · AWS
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
                AI engineer and researcher with around three years of hands-on
                experience. Studying Computer Vision, Robotics and Machine
                Learning at the University of Surrey, based in Guildford, UK.
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
                <span>Currently studying at</span>
                <strong>University of Surrey</strong>
                <span className="profile-current-divider" />
                <span>MSc · Sep 2026 – Sep 2027 (expected)</span>
              </div>
              <p className="profile-availability-note">
                Open to part-time & remote AI/ML roles · Full-time from
                September 2027 · Open to relocating
              </p>
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
                  I take AI systems from research to working software, combining
                  a PyTorch-first background with full-stack delivery. My work
                  spans document intelligence, healthcare models, computer
                  vision and multi-agent systems built with LangGraph, n8n and
                  open-weight models.
                </p>
                <p>
                  I previously mentored three research teams at AIRIL and built
                  AI-powered applications at HyperGlow UK. I’m now completing an
                  MSc in Computer Vision, Robotics and Machine Learning at
                  Surrey, following my Advanced PG Certificate from IIT Roorkee.
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
                  ["Based in", "Guildford, Surrey, UK"],
                  ["Current focus", "Agentic AI, computer vision & robotics"],
                  [
                    "Languages",
                    "Bangla (native), English (proficient), Hindi (conversational)",
                  ],
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
                  "PyTorch",
                  "RAG systems",
                  "LangGraph",
                  "n8n",
                  "Hugging Face",
                  "LLM architecture",
                  "Deep learning",
                  "Computer vision",
                  "AWS",
                  "Explainable AI",
                  "Docker & MLOps",
                  "ROS 2 (learning)",
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
              description="Clinical agents, document intelligence, and practical software. Explore the live systems and the projects I’m developing next."
            />
            <article className="profile-mediroute-card">
              <div>
                <p className="profile-label">In development · MediRoute AI</p>
                <h3>
                  The right clinical context,
                  <br />
                  routed to the right agent.
                </h3>
                <p>
                  A router identifies the clinical domain from prescriptions,
                  lab reports and scans, then hands off to a specialist agent
                  with safety gates and clinician review. Uses open-weight
                  Hugging Face models and OKF, with LangGraph and n8n;
                  architected for AWS deployment.
                </p>
                <div className="profile-tags">
                  <span>LangGraph + n8n</span>
                  <span>Open-weight models</span>
                  <span>OKF</span>
                  <span>AWS architecture</span>
                </div>
              </div>
              <div
                className="profile-route-visual"
                aria-label="Medical report to router to specialist to clinician review"
              >
                <span>Medical report</span>
                <i>↓</i>
                <strong>Router agent</strong>
                <i>↓</i>
                <div>
                  <span>Cardio</span>
                  <span>Endo</span>
                  <span>Renal</span>
                  <span>Respiratory</span>
                </div>
                <i>↓</i>
                <span>Safety gate & clinician review</span>
              </div>
            </article>
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
                    A governed OKF v0.2 clinical ontology with 12 concepts and
                    17 sources. A privacy-aware router selects the local engine
                    or Gemini Flash, with safety gates, audit trails and human
                    review.
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
            <div className="profile-additional-projects">
              {[
                [
                  "Client product · Deployed",
                  "HyperGlow Ordering App",
                  "Restaurant self-service ordering with behaviour-driven upsell, plus AI food-photo enhancement. Next.js, React Native, PostgreSQL and Docker on Linux.",
                ],
                [
                  "Bangla + English · GitHub",
                  "Multilingual RAG System",
                  "Textbook question answering with PyMuPDF extraction, sentence-based chunking, MiniLM embeddings, FAISS retrieval and a local LLM.",
                ],
                [
                  "Computer vision",
                  "Factory Instrument Detection",
                  "YOLO and OpenCV detect instruments carried by factory staff for an access-control workflow.",
                ],
                [
                  "Deep learning",
                  "Human Activity Recognition",
                  "CNN and LSTM models for smartphone sensor time-series.",
                ],
                [
                  "Machine learning",
                  "Term Deposit Prediction",
                  "A Bayesian-tuned classifier for bank term-deposit sign-ups.",
                ],
                [
                  "Healthcare ML",
                  "Heart Disease Prediction",
                  "Clinical-feature classification with exploratory analysis and model comparison.",
                ],
                [
                  "Full-stack software",
                  "Emergency Helpline System",
                  "A university project for police and fire service coordination using NestJS, Next.js and REST APIs.",
                ],
                [
                  "University project",
                  "Dhaka Guide",
                  "A console information system for places and transport in Dhaka.",
                ],
              ].map(([label, title, copy]) => (
                <article key={title}>
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
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
            <a
              className="profile-inline-link profile-scholar-link"
              href="https://scholar.google.com/citations?user=_rSz86QAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              View Google Scholar <Arrow />
            </a>
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
            <article className="profile-masters-card">
              <div>
                <span className="profile-label">
                  Current study · University of Surrey
                </span>
                <h3>
                  MSc in Computer Vision,
                  <br />
                  Robotics and Machine Learning
                </h3>
                <p>
                  Guildford, UK · September 2026 – September 2027 (expected)
                </p>
              </div>
              <div>
                <span className="profile-current-badge">In progress</span>
                <p>
                  Building on applied AI and healthcare research, with a focus
                  on computer vision, robotics and machine learning. Currently
                  learning ROS 2.
                </p>
              </div>
            </article>
            <div className="profile-education-grid">
              <article className="profile-certificate">
                <span className="profile-label">Professional development</span>
                <h3>
                  AI Engineering
                  <br />
                  on Cloud & AIOps
                </h3>
                <p className="profile-certificate-school">
                  Continuing Education Centre, IIT Roorkee · Futurense
                  Technologies
                </p>
                <p>
                  September 2025 – June 2026 · Completed the Advanced PG
                  Certificate pathway, extending my work across machine
                  learning, cloud, generative AI, agents, and AIOps.
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
                I’m available for part-time and remote AI/ML roles alongside my
                MSc, and full-time opportunities from September 2027. Based in
                Guildford, UK, and open to relocating.
              </p>
              <a
                className="profile-button profile-button-primary"
                href="mailto:tamim.shaifahamed@icloud.com"
              >
                Send me an email <Arrow />
              </a>
            </div>
            <div className="profile-contact-details">
              <a
                href="https://www.linkedin.com/in/shaif111/"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
                <strong>linkedin.com/in/shaif111</strong>
                <Arrow />
              </a>
              <a href="tel:+447466871988">
                <span>Phone</span>
                <strong>+44 7466 871988</strong>
                <Arrow />
              </a>
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
