const fs = require('fs');
const path = require('path');
const directory = './app';

function cleanup(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) cleanup(filePath);
        else if (file.endsWith('.tsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/<GlobalNavbar \/>/g, '');
            content = content.replace(/<GlobalFooter \/>/g, '');
            content = content.replace(/import { GlobalNavbar } from .*/g, '');
            content = content.replace(/import { GlobalFooter } from .*/g, '');
            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
}
cleanup(directory);
console.log("System Hardened: Redundancies Purged.");