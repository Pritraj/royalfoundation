import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/ravi.bhau.nangre/';
const OUTPUT_DIR = './scraped-content';

async function scrapeFacebookPage() {
  console.log('🚀 Starting Facebook scraper...');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Set to true once you've tested it
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  try {
    // Navigate to Facebook login
    console.log('📱 Navigating to Facebook...');
    await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });

    // Wait for manual login
    console.log('⏳ Please login to Facebook in the browser window...');
    console.log('   Waiting for you to login (will auto-detect when ready)...');

    // Wait for login to complete by checking for the presence of logged-in elements
    await page.waitForFunction(
      () => {
        // Check if we're logged in by looking for common Facebook UI elements
        return document.querySelector('[aria-label="Facebook"]') ||
          document.querySelector('[role="banner"]') ||
          document.querySelector('a[href*="/me/"]') ||
          window.location.href.includes('facebook.com') && !window.location.href.includes('/login');
      },
      { timeout: 120000 } // 2 minute timeout
    );

    console.log('✅ Login detected! Waiting a bit for the page to fully load...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Navigate to the target page
    console.log(`📄 Navigating to target page: ${FACEBOOK_PAGE_URL}`);
    await page.goto(FACEBOOK_PAGE_URL, { waitUntil: 'networkidle2' });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Scroll to load more posts
    console.log('📜 Scrolling to load posts...');
    await autoScroll(page, 50); // Increased scrolls to load more content

    // Extract page information
    console.log('🔍 Extracting page content...');
    const pageData = await page.evaluate(() => {
      const data = {
        pageName: '',
        posts: []
      };

      // Try to get page name
      const pageNameElement = document.querySelector('h1');
      if (pageNameElement) {
        data.pageName = pageNameElement.textContent.trim();
      }

      // Extract posts - Facebook's structure changes often, so we'll try multiple selectors
      const postSelectors = [
        '[role="article"]',
        'div[data-pagelet^="FeedUnit"]',
        'div.x1yztbdb'
      ];

      let posts = [];
      for (const selector of postSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          posts = Array.from(elements);
          break;
        }
      }

      posts.forEach((post, index) => {
        const postData = {
          id: index + 1,
          text: '',
          images: [],
          timestamp: ''
        };

        // Extract text content
        const textElements = post.querySelectorAll('[dir="auto"]');
        const texts = Array.from(textElements)
          .map(el => el.textContent.trim())
          .filter(text => text.length > 20 && text.length < 5000);

        if (texts.length > 0) {
          postData.text = texts[0];
        }

        // Extract images
        const images = post.querySelectorAll('img');
        images.forEach(img => {
          const src = img.src;
          if (src && !src.includes('emoji') && !src.includes('static')) {
            postData.images.push(src);
          }
        });

        // Try to extract timestamp
        const timeElement = post.querySelector('a[href*="/posts/"] span, a[href*="/permalink/"] span');
        if (timeElement) {
          postData.timestamp = timeElement.textContent.trim();
        }

        // Only add posts with actual content
        if (postData.text || postData.images.length > 0) {
          data.posts.push(postData);
        }
      });

      return data;
    });

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Save data as JSON
    const outputPath = path.join(OUTPUT_DIR, 'facebook-content.json');
    fs.writeFileSync(outputPath, JSON.stringify(pageData, null, 2));

    console.log(`✅ Scraped ${pageData.posts.length} posts from "${pageData.pageName}"`);
    console.log(`💾 Data saved to: ${outputPath}`);

    // Also create a markdown file for easy reading
    const mdPath = path.join(OUTPUT_DIR, 'facebook-content.md');
    let markdown = `# ${pageData.pageName}\n\n`;
    markdown += `Scraped on: ${new Date().toLocaleString()}\n\n`;
    markdown += `Total posts: ${pageData.posts.length}\n\n---\n\n`;

    pageData.posts.forEach((post, index) => {
      markdown += `## Post ${index + 1}\n\n`;
      if (post.timestamp) {
        markdown += `**Posted:** ${post.timestamp}\n\n`;
      }
      if (post.text) {
        markdown += `${post.text}\n\n`;
      }
      if (post.images.length > 0) {
        markdown += `**Images:** ${post.images.length}\n`;
        post.images.forEach((img, i) => {
          markdown += `- Image ${i + 1}: [Link](${img})\n`;
        });
        markdown += '\n';
      }
      markdown += '---\n\n';
    });

    fs.writeFileSync(mdPath, markdown);
    console.log(`📝 Markdown file saved to: ${mdPath}`);

    return pageData;

  } catch (error) {
    console.error('❌ Error scraping Facebook page:', error);
    throw error;
  } finally {
    await browser.close();
    console.log('🔒 Browser closed');
  }
}

// Helper function to auto-scroll the page
async function autoScroll(page, maxScrolls = 20) {
  await page.evaluate(async (maxScrolls) => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200; // Increased scroll distance
      const scrollDelay = 500; // Increased delay to let content load
      let scrollCount = 0;

      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrollCount++;

        if (totalHeight >= scrollHeight || scrollCount >= maxScrolls) {
          clearInterval(timer);
          resolve();
        }
      }, scrollDelay);
    });
  }, maxScrolls);
}

// Run the scraper
scrapeFacebookPage()
  .then(() => {
    console.log('✨ Scraping complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to scrape:', error);
    process.exit(1);
  });
