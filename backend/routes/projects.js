const express = require("express");
const router = express.Router();

const projects = [
  {
    id: 1,
    title: "TradeXpress: Full-Stack Stock Trading Platform",
    description: "Real-time stock trading dashboard with JWT auth, portfolio CRUD, and live market data visualizations.",
    longDescription: "Implemented a real-time trading dashboard using React.js, Tailwind CSS, and Chart.js for holdings, positions, and watchlists. Implemented JWT authentication, portfolio CRUD operations, and 5+ REST API endpoints using Node.js, Express.js, MongoDB, tested with Jest, and deployed on AWS EC2.",
    tech: ["React.js", "Tailwind CSS", "Chart.js", "Node.js", "Express.js", "MongoDB", "JWT", "AWS EC2"],
    github: "https://github.com/umarfarook/tradexpress",
    live: null,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    featured: true,
    category: "fullstack",
  },
  {
    id: 2,
    title: "CodeBase: GitHub-inspired Collaboration Platform",
    description: "A GitHub-inspired code collaboration platform with repo management, contribution heatmaps, and team dashboards.",
    longDescription: "Developed a GitHub-inspired code collaboration platform using React.js, Node.js, and MongoDB with 3+ core modules including authentication, dashboards, and profiles. Implemented repository CRUD operations, contribution heatmap visualization, and deployed frontend and backend on cloud servers.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    github: "https://github.com/umarfarook/codebase",
    live: null,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80",
    featured: true,
    category: "fullstack",
  },
  {
    id: 3,
    title: "Real Estate Price Prediction",
    description: "End-to-end ML web app predicting real estate prices with 20% improved accuracy, deployed on AWS EC2 with Nginx.",
    longDescription: "Built an end-to-end ML pipeline using scikit-learn and exposed predictions via a Flask REST API. Improved model accuracy by 20% using preprocessing and GridSearchCV, deploying on AWS EC2 with Nginx to handle 1K+ real-time queries.",
    tech: ["Python", "scikit-learn", "Flask", "AWS EC2", "Nginx", "GridSearchCV"],
    github: "https://github.com/umarfarook/real-estate-prediction",
    live: null,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    featured: true,
    category: "backend",
  },
  {
    id: 4,
    title: "HRMS Dashboard",
    description: "Human Resource Management System dashboard built at The Analytix with 5+ modular React components and RESTful API integration.",
    longDescription: "Built during internship at The Analytix using React.js, Material UI, and React Router. Delivered 5+ modular UI components and integrated RESTful APIs in an Agile environment across 8 sprint milestones.",
    tech: ["React.js", "Material UI", "React Router", "REST APIs", "Agile"],
    github: null,
    live: null,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
    featured: false,
    category: "frontend",
  },
];

// GET /api/projects
router.get("/", (req, res) => {
  const { category, featured } = req.query;
  let result = [...projects];
  if (category) result = result.filter(p => p.category === category);
  if (featured === "true") result = result.filter(p => p.featured);
  res.json({ success: true, data: result, total: result.length });
});

// GET /api/projects/:id
router.get("/:id", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, data: project });
});

module.exports = router;
