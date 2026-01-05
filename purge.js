const fs = require('fs');
const path = require('path');

const directory = './app'; // Targeted at your app directory

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.tsx')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove cursor-none
            const updatedContent = content.replace(/cursor-none/g, '');
            
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Cleaned: ${filePath}`);
            }
        }
    });
}

console.log("Starting global cursor purge...");
processDirectory(directory);
console.log("Purge complete.");