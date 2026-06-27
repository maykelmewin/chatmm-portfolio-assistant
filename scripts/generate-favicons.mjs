import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceSvg = resolve(__dirname, "../public/favicon/source.svg");
const outputDir = resolve(__dirname, "../public/favicon");

mkdirSync(outputDir, { recursive: true });

const sizes = [16, 32, 192, 512, 180];

async function generate() {
  const svgBuffer = await sharp(sourceSvg).toBuffer();

  for (const size of sizes) {
    const filename =
      size === 180
        ? "apple-touch-icon.png"
        : `favicon-${size}x${size}.png`;

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(resolve(outputDir, filename));

    console.log(`Created ${filename} (${size}x${size})`);
  }

  // Generate .ico from 16x16 and 32x32 PNGs
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  const icoBuffer = await pngToIco([png16, png32]);
  writeFileSync(resolve(outputDir, "favicon.ico"), icoBuffer);
  console.log("Created favicon.ico (16x16 + 32x32)");
}

generate().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});