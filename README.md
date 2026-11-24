# Vishvek Sharma — SRE / DevOps Portfolio

Static personal portfolio website built from Vishvek Sharma's resume.

## Structure
- `index.html` — Semantic portfolio layout (Hero + Interactive Terminal, Skills Matrix, Experience Timeline, ONES Project Showcase, Education & Certifications, Contact)
- `styles.css` — Responsive dark/light theme styling
- `script.js` — Theme toggle, terminal tabs, skill filters, clipboard copy, mailto form, and scroll-spy

## Local Preview
Run a static server from this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Deployment
This site uses zero build tools and can be deployed directly to:
- **GitHub Pages** (push to a repository such as `vishusharma1606.github.io`)
- **Netlify / Vercel / Cloudflare Pages** (drop or connect the folder as the publish directory)
