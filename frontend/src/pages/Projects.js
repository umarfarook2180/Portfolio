import React, { useEffect, useState } from "react";
import { getProjects } from "../api";

const CATEGORIES = ["all", "fullstack", "frontend", "backend"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setFiltered(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(activeTab === "all" ? projects : projects.filter(p => p.category === activeTab));
  }, [activeTab, projects]);

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Portfolio</p>
        <h1 className="section-title">All <span>Projects</span></h1>
        <p className="section-subtitle">Everything I've built — side projects, client work, and open source.</p>

        <div className="filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" />Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {filtered.map(p => (
              <div className="project-card fade-up" key={p.id}>
                <img src={p.image} alt={p.title} className="project-img" />
                <div className="project-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <h3 className="project-title" style={{ marginBottom: 0 }}>{p.title}</h3>
                    {p.featured && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 10px", borderRadius: 20, flexShrink: 0 }}>
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <p className="project-desc">{p.description}</p>
                  <div className="project-tech">
                    {p.tech.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline project-link">GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary project-link">Live ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text2)" }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
