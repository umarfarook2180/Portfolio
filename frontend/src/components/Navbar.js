import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none" }}>
      <div className="container">
        <Link to="/" className="nav-logo">
          Umar<span>.</span>
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <Link to="/contact" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: "0.85rem" }}>
          Hire Me
        </Link>
      </div>
    </nav>
  );
}
