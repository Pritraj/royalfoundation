# Royal Foundation - Complete Setup Guide

## 🎉 What's Been Done

Your Royal Foundation website is fully set up and ready to deploy! Here's everything that's been configured:

### ✅ Core Features

1. **Facebook Content Scraper**
   - Automatically logs into Facebook and scrapes content
   - Downloads images locally for faster loading
   - Stores data in JSON format for easy use

2. **Centralized Configuration**
   - All site settings in one place: `src/config.js`
   - Easy to update branding, contact info, domain, etc.
   - No need to search through multiple files

3. **GitHub Pages Deployment**
   - Custom domain: `royalfoundations.in`
   - Automatic CI/CD with GitHub Actions
   - Deploys on every push to `main` branch

4. **Professional Website**
   - Hero section with call-to-action
   - Photo gallery from Facebook posts
   - Responsive design (mobile-friendly)
   - SEO optimized with meta tags

## 📋 Next Steps

### 1. Configure DNS for Custom Domain

Point `royalfoundations.in` to GitHub Pages:

**Option A: Using A Records (Recommended)**
Add these A records in your domain registrar:
```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

**Option B: Using CNAME**
```
Type: CNAME    Name: www    Value: pritamrajput.github.io
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Source: Deploy from a branch
4. Branch: Select `gh-pages` (will be created by Actions)
5. Save

OR use GitHub Actions deployment (already configured):
1. Go to Settings > Pages
2. Source: GitHub Actions
3. That's it! The workflow is already set up.

### 3. Push Your Code

```bash
# Stage all files
git add .

# Commit with a descriptive message
git commit -m "Initial setup: Royal Foundation website with Facebook integration"

# Push to GitHub
git push origin main
```

The GitHub Actions workflow will automatically:
- Build your Astro site
- Deploy to GitHub Pages
- Make it live at royalfoundations.in

### 4. Monitor Deployment

- Check deployment status: https://github.com/pritamrajput/royalfoundation/actions
- First deployment takes 2-5 minutes
- Subsequent deployments are faster (1-2 minutes)

## 🔄 Updating Content

### Scrape New Facebook Posts

```bash
# Run the scraper
npm run scrape

# Download images locally
npm run download-images

# Build and deploy
npm run build
git add .
git commit -m "Update content from Facebook"
git push
```

### Update Site Settings

Edit `src/config.js`:
```javascript
export const siteConfig = {
  name: "Royal Foundation",           // ← Change site name
  description: "...",                  // ← Update description
  contact: {
    email: "contact@royalfoundations.in"  // ← Update email
  },
  branding: {
    primaryColor: "#1877f2"            // ← Change colors
  }
  // ... all other settings
};
```

Then rebuild and deploy:
```bash
npm run build
git add .
git commit -m "Update site configuration"
git push
```

## 📁 Key Files & Locations

### Configuration (Edit These)
- `src/config.js` - **All site settings in one place**
- `public/CNAME` - Custom domain configuration
- `.github/workflows/deploy.yml` - CI/CD pipeline

### Components (Customize Design)
- `src/components/Hero.astro` - Landing hero section
- `src/components/Gallery.astro` - Photo gallery
- `src/components/Footer.astro` - Footer

### Data
- `src/data/facebook-content.json` - Facebook posts data
- `public/images/facebook/` - Downloaded images

### Scripts
- `scripts/facebook-scraper.js` - Scrape Facebook
- `scripts/download-images.js` - Download images

## 🛠️ Development

```bash
# Start dev server
npm run dev
# Visit: http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization Examples

### Add a New Page

1. Create `src/pages/about.astro`:
```astro
---
import { siteConfig } from '../config.js';
import Footer from '../components/Footer.astro';
---

<html lang={siteConfig.language}>
  <head>
    <title>About - {siteConfig.name}</title>
  </head>
  <body>
    <h1>About Us</h1>
    <p>Our story...</p>
    <Footer />
  </body>
</html>
```

2. Access at: `https://royalfoundations.in/about/`

### Change Colors

Edit `src/config.js`:
```javascript
branding: {
  primaryColor: "#ff5733",    // New primary color
  secondaryColor: "#33ff57"   // New secondary color
}
```

### Add Social Media Links

Edit `src/config.js`:
```javascript
social: {
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/youraccount",
  twitter: "https://twitter.com/yourhandle"
}
```

Then update `src/components/Footer.astro` to display new links.

## 🔐 Security Notes

- Never commit `.env` files (already in `.gitignore`)
- Facebook login is done manually in browser
- No credentials are stored in code
- All scraping is done locally on your machine

## 📊 Performance

- **Fast Loading**: Static site generation
- **Optimized Images**: Local hosting
- **SEO Friendly**: Meta tags, semantic HTML
- **Mobile Responsive**: Works on all devices

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build
```

### GitHub Actions Fails
- Check Actions tab for error logs
- Ensure repository is public OR GitHub Pages is enabled for private repos
- Verify workflow file syntax

### Custom Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records with: `nslookup royalfoundations.in`
- Ensure CNAME file exists in `public/` folder

### Scraper Not Working
- Ensure you're logged into Facebook
- Facebook may have changed their HTML structure
- Check browser console for errors

## 📞 Support

- **Issues**: https://github.com/pritamrajput/royalfoundation/issues
- **Astro Docs**: https://docs.astro.build
- **Email**: contact@royalfoundations.in

## ✨ Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Facebook Scraper | ✅ | Auto-login detection |
| Image Downloader | ✅ | Downloads locally |
| GitHub Pages | ✅ | Auto-deploy on push |
| Custom Domain | ✅ | royalfoundations.in |
| CI/CD Pipeline | ✅ | GitHub Actions |
| Responsive Design | ✅ | Mobile-friendly |
| SEO Optimization | ✅ | Meta tags included |
| Centralized Config | ✅ | src/config.js |

## 🚀 You're All Set!

Your website is production-ready. Just:
1. Configure DNS
2. Enable GitHub Pages
3. Push your code
4. Watch it go live! 🎊

**Live Site**: https://royalfoundations.in (after DNS setup)

---

Built with ❤️ using Astro, Tailwind CSS, and Puppeteer
