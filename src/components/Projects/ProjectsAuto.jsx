import React, { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "tillu6";

// Repos you want to feature first (exact repo names)
const PRIORITY_REPOS = [
  "3D-portfolio-website",
  "Customer-Feedback-Portal",
  "Vulnerability-Scan-Automation",
  "Home-Lab-SIEM-Dashboard",
  "AI-Powered-Phishing-Detection-Tool",
  "AI-Job-Application-Agent",
  "GRC-Guide",
  "Interactive-Cyber-Risk-Web-App",
  "Incident-Playbook-Library",
  "Backup-and-Disaster-Recovery-DR",
];

function ProjectsAuto() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        // Use the topics preview header so repo.topics arrives
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) {
          // Handle rate limit message nicely
          const txt = await res.text();
          throw new Error(`GitHub API ${res.status}. ${txt.slice(0, 140)}`);
        }
        const data = await res.json();
        if (cancelled) return;

        // Keep non-forks (show forks? just remove this filter)
        const nonForks = data.filter((r) => !r.fork);

        // Sort: priority first, then recent updates
        const score = (name) => {
          const i = PRIORITY_REPOS.indexOf(name);
          return i === -1 ? Number.POSITIVE_INFINITY : i;
        };
        const sorted = [...nonForks].sort((a, b) => {
          const d = score(a.name) - score(b.name);
          if (d !== 0) return d;
          return new Date(b.updated_at) - new Date(a.updated_at);
        });

        setRepos(sorted);
      } catch (e) {
        setErr(e.message || "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter((r) => {
      const inName = r.name && r.name.toLowerCase().includes(q);
      const inDesc = r.description && r.description.toLowerCase().includes(q);
      const inTopics = (r.topics || []).some((t) => (t || "").toLowerCase().includes(q));
      return inName || inDesc || inTopics;
    });
  }, [repos, query]);

  return (
    <section style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <h2 style={{ margin: 0 }}>Projects</h2>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            style={{
              background: "#0f0f12",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "8px 10px",
              minWidth: 220
            }}
          />
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            style={btnStyle}
          >
            Switch to {view === "grid" ? "List" : "Grid"} View
          </button>
        </div>
      </div>

      {/* Body */}
      {loading && (
        <div style={{ color: "#aaa", padding: "2rem 0" }}>Loading projects…</div>
      )}

      {err && !loading && (
        <div style={{
          background: "#2a0f14",
          border: "1px solid #662027",
          color: "#ffd9de",
          padding: "12px 14px",
          borderRadius: 10,
          marginBottom: 12
        }}>
          <div style={{ marginBottom: 8 }}>Error: {err}</div>
          <button onClick={() => window.location.reload()} style={btnStyle}>Retry</button>
        </div>
      )}

      {!loading && !err && (
        filtered.length ? (
          <div style={{
            display: view === "grid" ? "grid" : "block",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16
          }}>
            {filtered.map((repo) => (
              <RepoCard key={repo.id} repo={repo} view={view} />
            ))}
          </div>
        ) : (
          <div style={{ color: "#aaa", paddingTop: 24 }}>No projects match your search.</div>
        )
      )}
    </section>
  );
}

function RepoCard({ repo, view }) {
  const name = repo.name;
  const title = prettyName(name);
  const description = repo.description || "Project description coming soon.";
  const stars = repo.stargazers_count || 0;
  const updated = new Date(repo.updated_at).toLocaleDateString();

  // Use OG image as preview; fallback if it fails
  const img = `https://opengraph.githubassets.com/1/${repo.owner.login}/${name}`;
  const homepage = (repo.homepage && /^https?:\/\//i.test(repo.homepage)) ? repo.homepage : null;

  const cardBase = {
    display: "flex",
    gap: 12,
    border: "1px solid #333",
    borderRadius: 12,
    padding: 14,
    background: "#0f0f12",
    color: "#fff",
    textDecoration: "none",
    alignItems: view === "grid" ? "stretch" : "center"
  };

  return (
    <div style={cardBase}>
      <div style={{ width: view === "grid" ? "100%" : 220 }}>
        <img
          src={img}
          alt={`${title} preview`}
          onError={(e) => { e.currentTarget.src = "/assets/project-fallback.png"; }}
          style={{
            width: "100%",
            height: view === "grid" ? 140 : 120,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 10,
            background: "#0b0b0e"
          }}
          loading="lazy"
        />

        <h3 style={{ margin: "6px 0 6px 0", fontSize: 18 }}>{title}</h3>
        <p style={{ margin: "0 0 10px 0", opacity: 0.85, lineHeight: 1.4 }}>
          {description}
        </p>

        {/* Topics / badges */}
        {!!(repo.topics && repo.topics.length) && (
          <div style={{ marginBottom: 10 }}>
            {repo.topics.slice(0, 6).map((t) => (
              <span key={t} style={badgeStyle}>{t}</span>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={linkBtnStyle}
            aria-label={`Open ${title} on GitHub`}
          >
            GitHub
          </a>

          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              style={linkBtnStyle}
              aria-label={`Open ${title} demo`}
            >
              Demo
            </a>
          )}

          <span style={{ fontSize: 12, opacity: 0.7, marginLeft: "auto" }}>
            ★ {stars} • Updated {updated}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Helpers + inline styles */

function prettyName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b([a-z])/g, function (m, c) { return c.toUpperCase(); });
}

const btnStyle = {
  background: "#5b25e6",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  cursor: "pointer"
};

const linkBtnStyle = {
  background: "transparent",
  color: "#bda8ff",
  border: "1px solid #5b25e6",
  borderRadius: 8,
  padding: "6px 10px",
  textDecoration: "none",
  fontSize: 14
};

const badgeStyle = {
  display: "inline-block",
  background: "#1a132b",
  color: "#d6c8ff",
  border: "1px solid #3c2c6b",
  borderRadius: 999,
  padding: "3px 8px",
  fontSize: 12,
  marginRight: 6,
  marginBottom: 6
};

export default ProjectsAuto;
