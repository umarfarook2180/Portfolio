import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, getProjects, getPosts } from "../api";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProfile(),
      getProjects({ featured: true }),
      getPosts({ featured: true }),
      axios.get(`${API_URL}/profile/experience`).then(r => r.data.data),
    ]).then(([p, proj, bl, exp]) => {
      setProfile(p);
      setProjects(proj.slice(0, 3));
      setPosts(bl.slice(0, 3));
      setExperience(exp);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading...
    </div>
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-label">
            <span style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", display: "inline-block" }} />
            Associate Software Engineer @ MAQ Software
          </div>
          <h1 className="hero-title">
            Umar Farook<br />
            <span className="line2">Full Stack Dev.</span>
          </h1>
          <p className="hero-desc">
            I build scalable full-stack applications, data pipelines, and real-time systems. Competitive programmer with Global Rank 86 in TCS CodeVita Season 13.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
            <a href="mailto:umar2180786@gmail.com" className="btn btn-outline">umar2180786@gmail.com</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          scroll
        </div>
      </section>

      {/* ── ABOUT / SKILLS ── */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="two-col">
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>About Me</p>
              <h2 className="section-title">Crafting digital <span>experiences</span></h2>
              <p style={{ color: "var(--text2)", marginTop: 24, marginBottom: 24, lineHeight: 1.85 }}>
                {profile?.bio}
              </p>
              <p style={{ color: "var(--text2)", lineHeight: 1.85, marginBottom: 32 }}>
                Based in <strong style={{ color: "var(--text)" }}>Noida, India</strong>. Currently working at <strong style={{ color: "var(--accent)" }}>MAQ Software</strong> on Microsoft Fabric data pipelines and Power BI dashboards. Pursuing B.Tech at <strong style={{ color: "var(--text)" }}>IIIT Sonepat</strong> with a CGPA of <strong style={{ color: "var(--accent)" }}>8.96/10</strong>.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {profile?.social?.github && <a href={profile.social.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>GitHub</a>}
                {profile?.social?.linkedin && <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>LinkedIn</a>}
                {profile?.social?.leetcode && <a href={profile.social.leetcode} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}>LeetCode</a>}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Tech Stack</p>
              <div className="skills-grid">
                {profile?.skills && Object.entries(profile.skills).map(([cat, items]) => (
                  <div className="skill-category card" key={cat}>
                    <h4>{cat}</h4>
                    <div className="skill-list">
                      {items.map(s => <span className="tag" key={s}>{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section">
        <div className="container">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Work History</p>
          <h2 className="section-title">Work <span>Experience</span></h2>
          <p className="section-subtitle">Where I've built real things for real teams.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 820 }}>
            {experience.map((exp, i) => (
              <div className="card" key={exp.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: 4 }}>{exp.role}</h3>
                    <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "1rem" }}>{exp.company}</span>
                    <span style={{ color: "var(--text3)", marginLeft: 10, fontSize: "0.85rem" }}>· {exp.type} · {exp.location}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: "var(--text2)", background: "var(--surface2)", padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ paddingLeft: 20, marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ color: "var(--text2)", fontSize: "0.95rem", lineHeight: 1.7 }}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & ACHIEVEMENTS ── */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <div className="two-col">
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Education</p>
              <h2 className="section-title">Academic <span>Journey</span></h2>
              <p className="section-subtitle" style={{ marginBottom: 40 }}>Where I laid my foundations.</p>
              <div className="timeline">
                {profile?.education?.map((edu, i) => (
                  <div className="timeline-item" key={edu.id} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="timeline-year">{edu.year} · {edu.location}</div>
                    <h3 className="timeline-title">{edu.degree}</h3>
                    <div className="timeline-institution">{edu.institution}</div>
                    <div className="timeline-grade">🎓 {edu.grade}</div>
                    <p className="timeline-desc">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Recognition</p>
              <h2 className="section-title">Achieve<span>ments</span></h2>
              <p className="section-subtitle" style={{ marginBottom: 40 }}>Milestones I'm proud of.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {profile?.achievements?.map(a => (
                  <div className="achievement-card" key={a.id}>
                    <div className="achievement-icon">{a.icon}</div>
                    <div>
                      <div className="achievement-title">{a.title}</div>
                      <div className="achievement-issuer">{a.issuer} · {a.year}</div>
                      <div className="achievement-desc">{a.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Work</p>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle">Things I've built that I'm proud of.</p>

          <div className="projects-grid">
            {projects.map(p => (
              <div className="project-card" key={p.id}>
                <img src={p.image} alt={p.title} className="project-img" />
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
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

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/projects" className="btn btn-outline">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* ── LATEST POSTS ── */}
      <section className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Writing</p>
          <h2 className="section-title">Latest <span>Posts</span></h2>
          <p className="section-subtitle">Thoughts on code, tools, and the craft.</p>

          <div className="blog-grid">
            {posts.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card" style={{ textDecoration: "none", color: "inherit" }}>
                <img src={post.image} alt={post.title} className="blog-img" />
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/blog" className="btn btn-outline">Read All Posts →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 16 }}>
            Let's build something <span style={{ color: "var(--accent)", fontStyle: "italic" }}>great</span> together
          </h2>
          <p style={{ color: "var(--text2)", marginBottom: 36, fontSize: "1.1rem" }}>
            Open to exciting full-stack and software engineering opportunities.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 36px" }}>
            Start a Conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
