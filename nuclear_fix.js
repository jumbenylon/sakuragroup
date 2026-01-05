const fs = require('fs');
const path = require('path');
const directory = './app';

function nuclearPurge(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            nuclearPurge(filePath);
        } else if (file.endsWith('.tsx') && !filePath.includes('layout.tsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove the components from the code
            content = content.replace(/<GlobalNavbar\s*\/>/g, '');
            content = content.replace(/<GlobalFooter\s*\/>/g, '');
            content = content.replace(/<GlobalNavbar><\/GlobalNavbar>/g, '');
            content = content.replace(/<GlobalFooter><\/GlobalFooter>/g, '');
            
            // Remove the import lines entirely
            const lines = content.split('\n').filter(line => 
                !line.includes('import { GlobalNavbar }') && 
                !line.includes('import { GlobalFooter }')
            );
            
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            console.log(`Purged Redundancy: ${filePath}`);
        }
    });
}

nuclearPurge(directory);
console.log("SUCCESS: Footers removed from sub-pages. Only Layout remains.");
