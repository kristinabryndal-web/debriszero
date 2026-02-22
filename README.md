# Debris Zero Foundation Website

The official website for the Debris Zero Foundation — promoting a sustainable future in space by addressing the growing threat of orbital debris.

Built with **React + Vite**.

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js** (version 18 or higher) — download from https://nodejs.org
- **Git** — download from https://git-scm.com

### Steps

```bash
# 1. Open your terminal and navigate to this folder
cd debris-zero

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The site will open at `http://localhost:5173`. Changes you make to the code will update instantly.

---

## Deploy to Vercel (Recommended — Free)

### First Time Setup

1. **Push your code to GitHub:**
   - Go to https://github.com and create a free account (if you don't have one)
   - Click the **+** button → **New repository**
   - Name it `debris-zero`, keep it Public or Private, click **Create repository**
   - In your terminal, run these commands from the project folder:

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Debris Zero website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/debris-zero.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com and sign up with your GitHub account
   - Click **"Add New..."** → **"Project"**
   - Find and select your `debris-zero` repository
   - Vercel will auto-detect it's a Vite project — just click **"Deploy"**
   - Your site will be live at `https://debris-zero.vercel.app` (or similar) in about 60 seconds!

3. **Connect your custom domain (debriszero.org):**
   - In your Vercel project dashboard, go to **Settings → Domains**
   - Add `debriszero.org` and `www.debriszero.org`
   - Vercel will give you DNS records to update
   - Go to wherever your domain is registered (likely Squarespace) and update the DNS:
     - Add an **A record** pointing to `76.76.21.21`
     - Add a **CNAME record** for `www` pointing to `cname.vercel-dns.com`
   - DNS changes can take up to 48 hours but usually work within minutes
   - Vercel automatically sets up HTTPS/SSL for you

### Future Updates

After the initial setup, deploying changes is automatic:

```bash
# Make your changes, then:
git add .
git commit -m "Description of what you changed"
git push
```

Vercel will automatically rebuild and deploy your site within seconds.

---

## Project Structure

```
debris-zero/
├── public/
│   └── favicon.svg          # Browser tab icon
├── src/
│   ├── main.jsx              # App entry point
│   ├── App.jsx               # App wrapper
│   └── DebrisZero.jsx        # Main website component (all sections)
├── index.html                # HTML template with SEO meta tags
├── package.json              # Dependencies and scripts
├── vite.config.js            # Build configuration
└── README.md                 # This file
```

---

## Squarespace Domain Transfer (Optional)

If you want to fully move your domain away from Squarespace:

1. Log into Squarespace → **Settings → Domains**
2. Click your domain → **Transfer domain away**
3. Squarespace will email you a transfer authorization code
4. Use that code to transfer to a registrar like Namecheap, Cloudflare, or Google Domains (~$10-12/year)

**Note:** You do NOT need to transfer the domain to use it with Vercel. You can keep it at Squarespace and just update the DNS records as described above.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Need Help?

- **Vercel docs:** https://vercel.com/docs
- **Vite docs:** https://vitejs.dev
- **Contact:** info@debriszero.org
