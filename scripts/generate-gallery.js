import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/gallery');
const outputFile = path.join(__dirname, '../src/lib/gallery.json');
const outputDir = path.dirname(outputFile);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getGalleryImages() {
    try {
        if (!fs.existsSync(galleryDir)) {
            console.error('Gallery directory does not exist:', galleryDir);
            return [];
        }

        const files = fs.readdirSync(galleryDir);
        const images = [];

        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (validExtensions.includes(ext)) {
                const filePath = path.join(galleryDir, file);
                try {
                    const buffer = fs.readFileSync(filePath);
                    const dimensions = sizeOf(buffer);
                    const basename = path.basename(file, ext);

                    // 1. Formateo limpio del nombre del archivo
                    const formattedName = basename
                        .replace(/[-_]/g, ' ')
                        .replace(/([a-z])([A-Z])/g, '$1 $2');

                    // 2. Lógica de SEO dinámico: 
                    // Si el nombre tiene "kitchen", "bathroom" o "commercial", le damos prioridad.
                    // Si no, usamos una frase descriptiva profesional.
                    let seoAlt = "";
                    const lowerName = formattedName.toLowerCase();

                    if (lowerName.includes('kitchen') || lowerName.includes('bath') || lowerName.includes('commercial')) {
                        seoAlt = `${formattedName} by MAS Contractors LLC`;
                    } else {
                        seoAlt = `${formattedName} | Professional Remodeling & Construction`;
                    }

                    images.push({
                        src: `/gallery/${file}`,
                        width: dimensions.width,
                        height: dimensions.height,
                        alt: seoAlt // <--- Usamos el nuevo Alt optimizado
                    });
                } catch (e) {
                    console.error(`Error processing file ${file}:`, e.message);
                }
            }
        });

        return images;
    } catch (err) {
        console.error('Error reading gallery directory:', err);
        return [];
    }
}

const galleryData = getGalleryImages();
fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2));
console.log(`Generated gallery data with ${galleryData.length} images at ${outputFile}`);
