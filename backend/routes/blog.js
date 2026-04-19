const express = require("express");
const router = express.Router();

const posts = [
  {
    id: 1,
    slug: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    excerpt: "A deep dive into useState, useEffect, and custom hooks that will change how you write React.",
    content: `# Getting Started with React Hooks\n\nReact Hooks fundamentally changed how we write React components. Introduced in React 16.8, hooks let you use state and other React features without writing a class.\n\n## useState\n\nThe most basic hook. It lets you add state to functional components:\n\n\`\`\`javascript\nconst [count, setCount] = useState(0);\n\`\`\`\n\n## useEffect\n\nuseEffect lets you perform side effects in function components — data fetching, subscriptions, manually changing the DOM.\n\n\`\`\`javascript\nuseEffect(() => {\n  document.title = \`Count: \${count}\`;\n}, [count]);\n\`\`\`\n\n## Custom Hooks\n\nYou can extract component logic into reusable functions called custom hooks:\n\n\`\`\`javascript\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(url).then(r => r.json()).then(d => {\n      setData(d);\n      setLoading(false);\n    });\n  }, [url]);\n\n  return { data, loading };\n}\n\`\`\`\n\nHooks are one of the most powerful patterns in modern React. Master them and you'll write cleaner, more reusable code.`,
    author: "Your Name",
    date: "2024-03-15",
    readTime: "5 min read",
    tags: ["React", "JavaScript", "Frontend"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "building-rest-apis-with-express",
    title: "Building Production REST APIs with Express.js",
    excerpt: "Best practices for structuring, securing, and scaling Express APIs for production.",
    content: `# Building Production REST APIs with Express.js\n\nExpress.js is the most popular Node.js framework. Let's build a production-ready API.\n\n## Project Structure\n\nA clean folder structure is the foundation:\n\n\`\`\`\nsrc/\n  routes/\n  middleware/\n  controllers/\n  models/\n  utils/\nserver.js\n\`\`\`\n\n## Security Essentials\n\nAlways add these middlewares:\n\n\`\`\`javascript\napp.use(helmet()); // Security headers\napp.use(cors({ origin: process.env.FRONTEND_URL }));\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));\n\`\`\`\n\n## Error Handling\n\nCentralize your error handling:\n\n\`\`\`javascript\napp.use((err, req, res, next) => {\n  const status = err.status || 500;\n  res.status(status).json({ success: false, message: err.message });\n});\n\`\`\`\n\nWith these patterns, your API will be robust and maintainable.`,
    author: "Your Name",
    date: "2024-02-20",
    readTime: "7 min read",
    tags: ["Node.js", "Express", "Backend", "API"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    featured: true,
  },
  {
    id: 3,
    slug: "mastering-git-workflow",
    title: "Mastering Git Workflow for Teams",
    excerpt: "The branching strategy, commit conventions, and PR practices that make teams 10x more productive.",
    content: `# Mastering Git Workflow for Teams\n\nGit is not just version control — it's team communication. A good workflow prevents conflicts and keeps history clean.\n\n## Git Flow\n\nUse feature branches:\n- \`main\` — production ready code only\n- \`develop\` — integration branch\n- \`feature/\` — individual features\n- \`hotfix/\` — urgent production fixes\n\n## Commit Conventions\n\nConventional commits make history readable:\n\n\`\`\`\nfeat: add user authentication\nfix: resolve login redirect bug\ndocs: update API documentation\nchore: upgrade dependencies\n\`\`\`\n\n## Pull Request Best Practices\n\n- Keep PRs small and focused\n- Write descriptive PR descriptions\n- Always request at least one review\n- Squash commits before merging\n\nGood Git habits compound over time into a much healthier codebase.`,
    author: "Your Name",
    date: "2024-01-10",
    readTime: "4 min read",
    tags: ["Git", "DevOps", "Productivity"],
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&q=80",
    featured: false,
  },
];

// GET /api/blog
router.get("/", (req, res) => {
  const { tag, featured } = req.query;
  let result = [...posts];
  if (tag) result = result.filter(p => p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
  if (featured === "true") result = result.filter(p => p.featured);
  // Return list without full content
  const list = result.map(({ content, ...rest }) => rest);
  res.json({ success: true, data: list, total: list.length });
});

// GET /api/blog/:slug
router.get("/:slug", (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ success: true, data: post });
});

module.exports = router;
