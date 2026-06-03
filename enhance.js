const sharp = require('sharp');
const fs = require('fs');

async function enhance() {
  try {
    const inputPath = './public/fifa_world_cup_bg.jpg';
    const outputPath = './public/fifa_world_cup_bg_4k.jpg';
    
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    
    // Target 4K width (3840)
    const targetWidth = 3840;
    
    await sharp(inputPath)
      .resize({
        width: targetWidth,
        kernel: sharp.kernel.lanczos3, // Best quality interpolation for upscaling
        fastShrinkOnLoad: false
      })
      .sharpen({
        sigma: 1.5,
        m1: 1.2,
        m2: 2.0,
        x1: 2.0,
        y2: 15,
        y3: 15
      })
      .modulate({
        brightness: 1.03,
        saturation: 1.1,
      })
      .jpeg({ quality: 100, mozjpeg: true })
      .toFile(outputPath);
      
    console.log('Successfully created 4k sharpened image!');
  } catch (err) {
    console.error(err);
  }
}

enhance();
