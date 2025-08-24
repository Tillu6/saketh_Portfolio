import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// ---------- NEW: import your custom cover PNGs ----------
import cover3DPortfolio from "../../Assets/Projects/threeD-portfolio.png";
import coverFeedbackPortal from "../../Assets/Projects/customer-feedback-portal.png";
import coverVulnScan from "../../Assets/Projects/vulnerability-scan-automation.png";
import coverSIEM from "../../Assets/Projects/siem-home-lab.png";
import coverPhishing from "../../Assets/Projects/phishing-detector.png";
import coverJobAgent from "../../Assets/Projects/ai-job-agent.png";
import coverGRC from "../../Assets/Projects/grc-guide.png";
import coverBackupDR from "../../Assets/Projects/backup-dr.png";
import coverRiskApp from "../../Assets/Projects/cyber-risk-webapp.png";
import coverLostFound from "../../Assets/Projects/lostfound-app.png";
import coverNewsTube from "../../Assets/Projects/newsapp-itubeapp.png";
import coverlearningapp from "../../Assets/Projects/learningapp.png";
// --- CONFIG ---
const GITHUB_USER = "tillu6";

// Curate priority repos to feature first (order matters). Names must match GitHub repo names.
const PRIORITY_REPOS = [
  "3D-portfolio-website",
  "Customer-Feedback-Portal",
  "Vulnerability-Scan-Automation",
  "Home-Lab-SIEM-Dashboard",
  "AI-Powered-Phishing-Detection-Tool",
  "AI-Job-Application-Agent",
  "GRC-Guide",
  "Backup-and-Disaster-Recovery-DR",
  "Interactive-Cyber-Risk-Web-App",
  "Lost-Found-APP",
  "NewsApp-iTubeApp",
];

// ---------- NEW: repo → cover image map ----------
const COVERS = {
  "3D-portfolio-website": cover3DPortfolio,
  "Customer-Feedback-Portal": coverFeedbackPortal,
  "Vulnerability-Scan-Automation": coverVulnScan,
  "Home-Lab-SIEM-Dashboard": coverSIEM,
  "AI-Powered-Phishing-Detection-Tool": coverPhishing,
  "AI-Job-Application-Agent": coverJobAgent,
  "GRC-Guide": coverGRC,
  "Backup-and-Disaster-Recovery-DR": coverBackupDR,
  "Interactive-Cyber-Risk-Web-App": coverRiskApp,
  "Lost-Found-APP": coverLostFound,
  "NewsApp-iTubeApp": coverNewsTube,
  "Personalized-Learning-Experience-App": coverlearningapp,  
};

// If a repo has no description, we can inject a friendly fallback here:
const FALLBACK_DESCRIPTIONS = {
  "Vulnerability-Scan-Automation":
    "NexusScan AI — sleek glassmorphism dashboard with AI-driven remediation, live progress, and risk prioritization.",
  "Customer-Feedback-Portal":
    "Flask + Three.js portal with 3D charts, live updates (WebSockets), JWT auth, and responsive UI.",
  "AI-Powered-Phishing-Detection-Tool":
    "ML-powered phishing detector (TypeScript) to analyze URLs/emails for malicious indicators.",
  "Home-Lab-SIEM-Dashboard":
    "SOC-style SIEM dashboard for a home lab (detections, telemetry, and visuals).",
  "AI-Job-Application-Agent":
    "Agent that streamlines job applications with extraction, matching, and autofill.",
  "GRC-Guide":
    "Practical GRC resources and checklists for security governance and compliance.",
  "Interactive-Cyber-Risk-Web-App":
    "Cyber risk calculator with a futuristic UI, tooltips, and animated interactions.",
  "Backup-and-Disaster-Recovery-DR":
    "DR runbooks and scripts for backup/restore, validation, and RTO/RPO practice.",
  "Lost-Found-APP":
    "Post and discover lost or found items—online/offline with a lightweight SQLite backend.",
  "NewsApp-iTubeApp":
    "Android suite: RecyclerView, Fragments, and YouTube Player API integration.",
};

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const nonForks = data.filter((r) => !r.fork);

        const score = (name) => {
          const idx = PRIORITY_REPOS.indexOf(name);
          return idx === -1 ? Number.POSITIVE_INFINITY : idx;
        };

        const sorted = [...nonForks].sort((a, b) => {
          const aScore = score(a.name);
          const bScore = score(b.name);
          if (aScore !== bScore) return aScore - bScore;
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        setRepos(sorted);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    return repos.map((repo) => {
      const title = repo.name;
      const description =
        repo.description ||
        FALLBACK_DESCRIPTIONS[repo.name] ||
        "Project description coming soon.";

      const demoLink =
        repo.homepage && /^https?:\/\//i.test(repo.homepage)
          ? repo.homepage
          : null;

      const ghLink = repo.html_url;

      // ---------- NEW: prefer custom cover, else fall back to GitHub OpenGraph ----------
      const imgPath =
        COVERS[repo.name] ||
        `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`;

      return { imgPath, title, description, ghLink, demoLink };
    });
  }, [repos]);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          These are pulled live from my GitHub (<strong>{GITHUB_USER}</strong>).
        </p>

        {loading && (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" role="status" variant="light" />
          </div>
        )}

        {err && (
          <Alert variant="danger" className="my-4">
            {err}
            <div className="mt-3">
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </Alert>
        )}

        {!loading && !err && (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {cards.slice(0, 12).map((p) => (
              <Col key={p.title} md={4} className="project-card">
                <ProjectCard
                  imgPath={p.imgPath}
                  isBlog={false}
                  title={prettyName(p.title)}
                  description={p.description}
                  ghLink={p.ghLink}
                  demoLink={p.demoLink || undefined}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

function prettyName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}

export default Projects;
