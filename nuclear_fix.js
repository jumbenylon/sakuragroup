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
            
            // 1. Kill the Components in the JSX
            content = content.replace(/<GlobalNavbar\s*\/?>/g, '');
            content = content.replace(/<GlobalFooter\s*\/?>/g, '');
            content = content.replace(/<GlobalNavbar>[\s\S]*?<\/GlobalNavbar>/g, '');
            content = content.replace(/<GlobalFooter>[\s\S]*?<\/GlobalFooter>/g, '');
            
            // 2. Kill the Imports
            const lines = content.split('\n').filter(line => 
                !line.includes('import { GlobalNavbar }') && 
                !line.includes('import { GlobalFooter }') &&
                !line.includes('import { GlobalNavbar } from "@/components/global-navbar"') &&
                !line.includes('import { GlobalFooter } from "@/components/global-footer"')
            );
            
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            console.log(`Successfully Sanitized: ${filePath}`);
        }
    });
}

console.log("🚀 Starting Nuclear Footer Purge...");
nuclearPurge(directory);
console.log("✅ DONE: Sub-pages are now clean. Check your browser.");
