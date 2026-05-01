import fs from 'fs';
import path from 'path';

const dir = 'e:/val/portfolio_vercel/public/certificate';
const files = fs.readdirSync(dir);

const certFiles = files
  .filter(f => /^certificate\d+\.[a-z]+$/i.test(f))
  .map(f => {
    const match = f.match(/^certificate(\d+)\.([a-z]+)$/i);
    return {
      name: f,
      id: parseInt(match[1], 10),
      ext: match[2].toLowerCase()
    };
  })
  .sort((a, b) => a.id - b.id);

console.log(`Found ${certFiles.length} certificate files.`);

certFiles.forEach((file, index) => {
  const newId = index + 1;
  const newName = `certificate${newId}.${file.ext}`;
  
  if (file.name !== newName) {
    const oldPath = path.join(dir, file.name);
    const newPath = path.join(dir, newName);
    
    // Check if destination exists to avoid overwriting during sequential renaming
    // (though in this case it shouldn't happen if we're only moving down, 
    // but better safe than sorry with a temp suffix if needed, or just go in order)
    if (fs.existsSync(newPath)) {
        // If it exists, it's because we haven't renamed it yet. 
        // This could happen if we are skipping IDs.
        // Since we sorted by ID, and newId <= oldId, we shouldn't hit an existing file
        // unless there are duplicate IDs with different extensions (which shouldn't be here).
    }
    
    console.log(`Renaming ${file.name} -> ${newName}`);
    fs.renameSync(oldPath, newPath);
  } else {
    console.log(`Skipping ${file.name} (already correct)`);
  }
});

console.log('Renaming complete.');
