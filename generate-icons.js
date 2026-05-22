// Run once: node generate-icons.js
// Requires: npm install --save-dev sharp
const sharp = require("sharp");
const path = require("path");

// S2 — Cumbre (from Podium Logo Ideas)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background: dark warm gradient -->
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2A1E08"/>
      <stop offset="100%" stop-color="#0E0A07"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>

  <!-- Cumbre: amber triangle, centred, with subtle inner highlight -->
  <polygon points="256,80 464,432 48,432" fill="#F0A832"/>
  <!-- Highlight: right half slightly lighter -->
  <polygon points="256,80 464,432 256,432" fill="#F5EDD8" opacity="0.12"/>
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
