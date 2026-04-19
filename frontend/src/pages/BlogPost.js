import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "../api";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(slug)
      .then(data => { setPost(data); setLoading(false); })
      .catch(() => { setLoading(false); navigate("/blog"); });
  }, [slug, navigate]);

  if (loading) return <div className="loading"><div className="spinner" />Loading post...</div>;
  if (!post) return null;

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh" }}>
      {/* Header */}
      <div className="post-header" style={{ background: "var(--bg2)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <Link to="/blog" style={{ color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            ← Back to Blog
          </Link>
          <img src={post.image} alt={post.title} style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: 12, marginBottom: 40, filter: "brightness(0.75) saturate(0.8)" }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {post.tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: 20, lineHeight: 1.15 }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div className="post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Back link */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginBottom: 80, display: "flex", justifyContent: "center" }}>
          <Link to="/blog" className="btn btn-outline">← More Posts</Link>
        </div>
      </div>
    </div>
  );
}
