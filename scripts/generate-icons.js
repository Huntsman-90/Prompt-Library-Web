import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. SVG Icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
    <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#818cf8" />
    </linearGradient>
  </defs>
  
  <!-- Rounded Base -->
  <rect width="512" height="512" rx="112" fill="url(#bg)" />
  <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" />

  <!-- Outer Glow Stack -->
  <g transform="translate(64, 64) scale(0.75)">
    <!-- Terminal Prompt Symbol >_ -->
    <path d="M120 160 L240 256 L120 352" fill="none" stroke="url(#primary)" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />
    <line x1="280" y1="352" x2="380" y2="352" stroke="url(#accent)" stroke-width="44" stroke-linecap="round" />
    
    <!-- Sparkle Stars -->
    <path d="M380 140 Q380 180 420 180 Q380 180 380 220 Q380 180 340 180 Q380 180 380 140 Z" fill="#38bdf8" />
    <path d="M140 100 Q140 120 160 120 Q140 120 140 140 Q140 120 120 120 Q140 120 140 100 Z" fill="#ec4899" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon, 'utf8');

// Function to generate raw PNG with simple shape
function createPng(width, height, r, g, b, isMaskable = false) {
  // Simple PNG encoder
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // Generate pixels
  const rowLen = width * 4 + 1;
  const rawData = Buffer.alloc(rowLen * height);
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isMaskable) {
        // Full bleed background
        rawData[pxOffset] = 15;
        rawData[pxOffset + 1] = 23;
        rawData[pxOffset + 2] = 42;
        rawData[pxOffset + 3] = 255;
        // Inner badge
        if (dist < radius * 0.7) {
          rawData[pxOffset] = 99;
          rawData[pxOffset + 1] = 102;
          rawData[pxOffset + 2] = 241;
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Rounded or clean icon
        if (dist <= radius) {
          // gradient-like violet
          const factor = Math.min(1, Math.max(0, (y / height)));
          rawData[pxOffset] = Math.round(99 * (1 - factor) + 236 * factor);
          rawData[pxOffset + 1] = Math.round(102 * (1 - factor) + 72 * factor);
          rawData[pxOffset + 2] = Math.round(241 * (1 - factor) + 153 * factor);
          rawData[pxOffset + 3] = 255;
        } else {
          // Transparent
          rawData[pxOffset] = 0;
          rawData[pxOffset + 1] = 0;
          rawData[pxOffset + 2] = 0;
          rawData[pxOffset + 3] = 0;
        }
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  const ihdrChunk = makeChunk('IHDR', ihdr);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 99, 102, 241));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 99, 102, 241));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 99, 102, 241));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 15, 23, 42, true));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(64, 64, 99, 102, 241));

console.log('Icons generated successfully.');
