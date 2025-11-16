import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const SCRAPED_DATA_PATH = './scraped-content/facebook-content.json';
const OUTPUT_DIR = './public/images/facebook';

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const file = fs.createWriteStream(filepath);
    client.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`❌ Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('🚀 Starting image download...');

  // Read scraped data
  const data = JSON.parse(fs.readFileSync(SCRAPED_DATA_PATH, 'utf8'));

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created directory: ${OUTPUT_DIR}`);
  }

  const imageMap = {};
  let totalImages = 0;
  let downloadedImages = 0;

  // Download all images
  for (const post of data.posts) {
    if (!post.images || post.images.length === 0) continue;

    const postImages = [];

    for (let i = 0; i < post.images.length; i++) {
      const imageUrl = post.images[i];
      const filename = `post-${post.id}-image-${i + 1}.jpg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      totalImages++;

      try {
        await downloadImage(imageUrl, filepath);
        postImages.push(`/images/facebook/${filename}`);
        downloadedImages++;
      } catch (error) {
        console.error(`Failed to download image ${i + 1} from post ${post.id}`);
      }
    }

    imageMap[post.id] = postImages;
  }

  // Update the JSON with local paths
  const updatedData = {
    ...data,
    posts: data.posts.map(post => ({
      ...post,
      localImages: imageMap[post.id] || [],
      originalImages: post.images
    }))
  };

  // Save updated data
  const outputPath = './src/data/facebook-content.json';
  const outputDataDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDataDir)) {
    fs.mkdirSync(outputDataDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2));

  console.log(`\n✨ Download complete!`);
  console.log(`📊 Downloaded ${downloadedImages}/${totalImages} images`);
  console.log(`💾 Updated data saved to: ${outputPath}`);
}

downloadAllImages().catch(console.error);
