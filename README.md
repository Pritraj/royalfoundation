# Royal Foundation Website

Official website for Royal Foundation - Empowering Communities through education, healthcare, and social welfare initiatives.

🌐 **Live Site:** [royalfoundations.in](https://royalfoundations.in)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pritamrajput/royalfoundation.git
cd royalfoundation

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site locally.

## 📁 Project Structure

```
royalfoundation/
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Hero.astro
│   │   ├── Gallery.astro
│   │   └── Footer.astro
│   ├── pages/          # Page routes
│   │   └── index.astro
│   ├── data/           # JSON data files
│   │   └── facebook-content.json
│   └── config.js       # ⭐ CENTRALIZED CONFIGURATION
├── public/             # Static assets
│   ├── images/
│   └── CNAME          # Custom domain configuration
├── scripts/           # Utility scripts
│   ├── facebook-scraper.js
│   └── download-images.js
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD pipeline
```

## ⚙️ Configuration

**All site settings are centralized in one file:** `src/config.js`

Edit this file to update:
- Site name, title, and description
- Domain and URLs
- Social media links
- Contact information
- Branding colors
- SEO settings
- And more!

```javascript
// src/config.js
export const siteConfig = {
  name: "Royal Foundation",
  domain: "royalfoundations.in",
  url: "https://royalfoundations.in",
  // ... all other settings
};
```

## 📸 Content Management

### Scraping Facebook Content

1. **Run the Facebook scraper:**
```bash
node scripts/facebook-scraper.js
```
- Browser will open
- Login to Facebook
- Script auto-detects login and scrapes the page
- Content saved to `scraped-content/facebook-content.json`

2. **Download images locally:**
```bash
node scripts/download-images.js
```
- Downloads all images from scraped posts
- Saves to `public/images/facebook/`
- Updates data with local image paths in `src/data/facebook-content.json`

3. **Build and deploy:**
```bash
npm run build
git add .
git commit -m "Update content"
git push
```

The CI/CD pipeline will automatically deploy changes to GitHub Pages.

## 🔄 CI/CD Pipeline

Automated deployment via GitHub Actions:

1. **Trigger:** Push to `main` branch or manual workflow dispatch
2. **Build:** Runs `npm run build` to generate static site
3. **Deploy:** Automatically publishes to GitHub Pages
4. **Live:** Changes appear at royalfoundations.in

View deployment status: [Actions tab](https://github.com/pritamrajput/royalfoundation/actions)

## 🌐 Custom Domain Setup

The site uses a custom domain: **royalfoundations.in**

### DNS Configuration
Point your domain to GitHub Pages:
1. Add A records pointing to GitHub's IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

2. Or add CNAME record: `pritamrajput.github.io`

The `public/CNAME` file is already configured.

## 🛠️ Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `node scripts/facebook-scraper.js` | Scrape Facebook page content |
| `node scripts/download-images.js` | Download images locally |

## 🎨 Customization

### Adding New Pages
Create `.astro` files in `src/pages/`:
```astro
---
import { siteConfig } from '../config.js';
---
<h1>New Page</h1>
```

### Styling
- Global styles: `src/pages/index.astro` (global styles section)
- Component styles: Each `.astro` component has scoped `<style>` tags
- Uses Tailwind CSS v4 (configured in `astro.config.mjs`)

### Components
All components are in `src/components/`:
- `Hero.astro` - Landing hero section
- `Gallery.astro` - Photo gallery grid
- `Footer.astro` - Site footer

## 📦 Tech Stack

- **Framework:** [Astro](https://astro.build) - Fast, content-focused static site generator
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Content:** Facebook scraper with Puppeteer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📞 Contact

- **Website:** [royalfoundations.in](https://royalfoundations.in)
- **Facebook:** [Royal Foundation](https://www.facebook.com/profile.php?id=100079902380354)
- **Email:** contact@royalfoundations.in

---

Built with ❤️ by [Pritam Rajput](https://github.com/pritamrajput)
