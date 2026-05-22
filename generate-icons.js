// Run once: node generate-icons.js
// Requires: npm install --save-dev sharp
const sharp = require("sharp");
const path = require("path");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background -->
  <rect width="512" height="512" rx="96" fill="#0E0A07"/>

  <!-- Star above 1st place -->
  <polygon points="256,78 272,124 320,124 282,150 298,196 256,170 214,196 230,150 192,124 240,124"
    fill="#F0A832"/>

  <!-- 2nd place step (left) -->
  <rect x="64" y="250" width="138" height="194" rx="10" fill="#8A9BB0"/>
  <text x="133" y="372" text-anchor="middle" fill="#0E0A07"
    font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="64">2</text>

  <!-- 1st place step (center, tallest) -->
  <rect x="187" y="168" width="138" height="276" rx="10" fill="#F0A832"/>
  <text x="256" y="338" text-anchor="middle" fill="#0E0A07"
    font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="64">1</text>

  <!-- 3rd place step (right) -->
  <rect x="310" y="312" width="138" height="132" rx="10" fill="#B8762E"/>
  <text x="379" y="400" text-anchor="middle" fill="#0E0A07"
    font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="64">3</text>

  <!-- Base -->
  <rect x="44" y="444" width="424" height="14" rx="7" fill="#1E160E"/>
</svg>`;

const buf = Buffer.from(svg);
const out = path.join(__dirname, "public");

async function generate() {
  await sharp(buf).resize(512, 512).png().toFile(`${out}/icon-512.png`);
  await sharp(buf).resize(192, 192).png().toFile(`${out}/icon-192.png`);
  await sharp(buf).resize(180, 180).png().toFile(`${out}/apple-touch-icon.png`);
  await sharp(buf).resize(32, 32).png().toFile(`${out}/favicon-32.png`);
  console.log("✅ Icons generated in public/");
}

generate().catch(console.error);
