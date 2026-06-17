// One-time image optimization script.
// Run manually: node scripts/optimize-images.js
// Resizes images wider than 1920px to 1920px max and re-saves as JPEG at 85% quality.
// Originals are replaced in-place (backup manually first if needed).

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, '../public/gallery');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const QUALITY = 85;
const VALID = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG'];

async function optimize() {
    const files = fs.readdirSync(galleryDir);
    let optimized = 0;
    let skipped = 0;
    let totalSaved = 0;

    for (const file of files) {
        const ext = path.extname(file);
        if (!VALID.includes(ext)) continue;

        const filePath = path.join(galleryDir, file);
        const statBefore = fs.statSync(filePath).size;

        try {
            const image = sharp(filePath);
            const meta = await image.metadata();

            if (meta.width <= MAX_WIDTH && meta.height <= MAX_HEIGHT) {
                // Still re-save to optimize compression if > 500KB
                if (statBefore < 500_000) {
                    skipped++;
                    continue;
                }
            }

            const buffer = await image
                .resize({
                    width: MAX_WIDTH,
                    height: MAX_HEIGHT,
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .jpeg({ quality: QUALITY, mozjpeg: true })
                .toBuffer();

            fs.writeFileSync(filePath, buffer);
            const statAfter = buffer.length;
            const saved = statBefore - statAfter;
            totalSaved += saved;
            optimized++;

            console.log(
                `✓ ${file.padEnd(40)} ${(statBefore / 1024).toFixed(0)}KB → ${(statAfter / 1024).toFixed(0)}KB  (-${(saved / 1024).toFixed(0)}KB)`
            );
        } catch (err) {
            console.error(`✗ ${file}: ${err.message}`);
        }
    }

    console.log(`\nDone: ${optimized} optimized, ${skipped} skipped`);
    console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

optimize();
