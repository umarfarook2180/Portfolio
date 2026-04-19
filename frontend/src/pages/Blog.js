import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("all");

  useEffect(() => {
    getPosts().then(data => {
      setPosts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const allTags = ["all", ...new Set(posts.flatMap(p => p.tags))];
  const filtered = activeTag === "all" ? posts : posts.filter(p => p.tags.includes(activeTag));

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Writing</p>
        <h1 className="section-title">The <span>Blog</span></h1>
        <p className="section-subtitle">Thoughts, tutorials, and insights on software development.</p>

        <div className="filter-tabs">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-tab ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" />Loading posts...</div>
        ) : (
          <div className="blog-grid">
            {filtered.map(post => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className="blog-card fade-up"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={post.image} alt={post.title} className="blog-img" />
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text2)" }}>
            No posts with this tag yet.
          </div>
        )}
      </div>
    </div>
  );
}
