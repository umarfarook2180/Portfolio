# 🚀 Portfolio & Blog — Full Stack

A modern, dark-themed portfolio with blog, projects showcase, education/achievements section, and contact form.

**Stack:** React (frontend) · Node.js + Express (backend) · Vercel + Render (deploy)

---

## 📁 Project Structure

```
portfolio/
├── backend/          # Express API (deploy to Render)
│   ├── server.js
│   ├── routes/
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── blog.js
│   │   └── contact.js
│   ├── data/
│   │   └── profile.js    ← Edit YOUR info here
│   └── package.json
│
└── frontend/         # React app (deploy to Vercel)
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Projects.js
    │   │   ├── Blog.js
    │   │   ├── BlogPost.js
    │   │   └── Contact.js
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── Footer.js
    │   ├── api.js
    │   └── index.css
    └── package.json
```

---

## ✏️ Personalizing Your Portfolio

### 1. Update your info (backend/data/profile.js)
Edit this file to set your name, bio, skills, education, achievements, and social links.

### 2. Update projects (backend/routes/projects.js)
Replace the sample projects array with your real projects.

### 3. Update blog posts (backend/routes/blog.js)
Replace the sample posts with your own. Content supports full Markdown.

### 4. Update contact details (frontend/src/pages/Contact.js)
Update the email, GitHub, LinkedIn, and Twitter links in the contact info section.

---

## 🛠️ Run Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env      # fill in your values
npm run dev               # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env      # set REACT_APP_API_URL=http://localhost:5000/api
npm start                 # runs on http://localhost:3000
```

---

## 🌐 Deploy to Production

### Step 1 — Deploy Backend to Render

1. Push your code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node server.js`
7. Add Environment Variables:
   - `PORT` = `5000`
   - `FRONTEND_URL` = `https://your-app.vercel.app` (set after Vercel deploy)
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASS` = your Gmail App Password (not your real password!)
   - `EMAIL_TO` = email to receive contact messages
8. Click **Create Web Service**
9. Copy your Render URL (e.g. `https://portfolio-api.onrender.com`)

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords → Generate

### Step 2 — Deploy Frontend to Vercel

1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://your-render-url.onrender.com/api`
5. Click **Deploy**
6. Copy your Vercel URL

### Step 3 — Update CORS on Render

Go back to Render → your service → Environment → update:
- `FRONTEND_URL` = `https://your-app.vercel.app`

Then **Redeploy** on Render. Done! 🎉

---

## 📬 Contact Form Email Setup

The contact form uses Nodemailer with Gmail. To enable:

1. Enable 2-Step Verification on your Google Account
2. Go to: Google Account → Security → App Passwords
3. Generate an App Password for "Mail"
4. Set `EMAIL_USER` and `EMAIL_PASS` on Render

If email is not configured, form submissions are logged to the console (useful for development).

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Full profile data |
| GET | `/api/profile/education` | Education list |
| GET | `/api/profile/achievements` | Achievements list |
| GET | `/api/projects` | All projects (filter: `?category=frontend&featured=true`) |
| GET | `/api/projects/:id` | Single project |
| GET | `/api/blog` | All posts (filter: `?tag=React&featured=true`) |
| GET | `/api/blog/:slug` | Single post with full content |
| POST | `/api/contact` | Send contact message |

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, Axios, React Markdown |
| Backend | Node.js, Express, Nodemailer, express-rate-limit |
| Styling | Custom CSS with CSS Variables, Google Fonts |
| Deploy | Vercel (frontend) + Render (backend) |

---

## 🎨 Customization Tips

- **Colors**: Edit CSS variables in `frontend/src/index.css` (`:root` block)
- **Fonts**: Change the Google Fonts import at the top of `index.css`
- **Add a database**: Replace the static data files with MongoDB/PostgreSQL for dynamic content
- **Add auth**: Add JWT auth to protect a `/admin` route for editing posts/projects via UI
