import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <p>
          Built with <span>♥</span> by <span>Umar Farook</span> &nbsp;·&nbsp;{" "}
          <Link to="/projects" style={{ color: "inherit" }}>Projects</Link> &nbsp;·&nbsp;{" "}
          <Link to="/blog" style={{ color: "inherit" }}>Blog</Link> &nbsp;·&nbsp;{" "}
          <Link to="/contact" style={{ color: "inherit" }}>Contact</Link>
        </p>
        <p style={{ marginTop: 8, fontSize: "0.8rem", color: "var(--text3)" }}>
          © {year} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
