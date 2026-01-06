const fs = require('fs');
const path = require('path');
const directory = './app';

function totalSanitization(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            totalSanitization(filePath);
        } else if (file.endsWith('.tsx') && !filePath.includes('layout.tsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 1. REMOVE HIDDEN MOUSE: Strips 'cursor-none' from all tags
            content = content.replace(/cursor-none/g, '');
            
            // 2. KILL DOUBLE FOOTERS: Removes Footer/Navbar from sub-pages
            content = content.replace(/<GlobalNavbar\s*\/?>/g, '');
            content = content.replace(/<GlobalFooter\s*\/?>/g, '');
            content = content.replace(/<GlobalNavbar>[\s\S]*?<\/GlobalNavbar>/g, '');
            content = content.replace(/<GlobalFooter>[\s\S]*?<\/GlobalFooter>/g, '');
            
            // 3. CLEAN UP IMPORTS: Removes the import lines
            const lines = content.split('\n').filter(line => 
                !line.includes('import { GlobalNavbar }') && 
                !line.includes('import { GlobalFooter }')
            );
            
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            console.log(`✅ Sanitized: ${filePath}`);
        }
    });
}

console.log("🚀 Starting Total System Sanitization...");
totalSanitization(directory);
console.log("✨ DONE: Mouse restored and Footers removed from sub-pages.");
