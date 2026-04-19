import React, { useState } from "react";
import { sendContact } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await sendContact(form);
      setStatus({ type: "success", message: res.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Get In Touch</p>
        <h1 className="section-title">Let's <span>Talk</span></h1>
        <p className="section-subtitle">Have a project in mind? I'd love to hear from you.</p>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info">
            <h3>Say hello.</h3>
            <p>
              Whether you have a project, a job opportunity, or just want to connect — my inbox is always open. I'll get back to you within 24 hours.
            </p>

            <div className="contact-links">
              <div className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>📧</span>
                <span>umar2180786@gmail.com</span>
              </div>
              <div className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>📞</span>
                <span>+91 9521873011</span>
              </div>
              <div className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>📍</span>
                <span>Noida, India</span>
              </div>
              <a href="https://github.com/umarfarook" target="_blank" rel="noreferrer" className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>💻</span>
                <span>github.com/umarfarook</span>
              </a>
              <a href="https://linkedin.com/in/umarfarook" target="_blank" rel="noreferrer" className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>🔗</span>
                <span>linkedin.com/in/umarfarook</span>
              </a>
              <a href="https://leetcode.com/umarfarook" target="_blank" rel="noreferrer" className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>🧩</span>
                <span>LeetCode — Max Rating 1814</span>
              </a>
              <a href="https://codeforces.com/profile/umarfarook" target="_blank" rel="noreferrer" className="contact-link">
                <span style={{ fontSize: "1.2rem" }}>⚡</span>
                <span>Codeforces Profile</span>
              </a>
            </div>

            {/* Availability card */}
            <div className="card" style={{ marginTop: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, background: "var(--green)", borderRadius: "50%", boxShadow: "0 0 8px var(--green)" }} />
                <strong style={{ fontSize: "0.95rem" }}>Available for Work</strong>
              </div>
              <p style={{ color: "var(--text2)", fontSize: "0.9rem" }}>
                Currently open to freelance projects and full-time opportunities. Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry / Job opportunity / Just saying hi"
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, and budget..."
                required
              />
            </div>

            {status && (
              <div className={`form-message ${status.type}`}>
                {status.type === "success" ? "✅" : "❌"} {status.message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={sending}
              style={{ fontSize: "1rem", padding: "14px 32px", opacity: sending ? 0.7 : 1 }}
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
