const fs = require('fs');
const path = require('path');

const root = './app';

function getRoutes(dir, prefix = '') {
    let routes = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Check if it's a route (contains page.tsx)
            if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
                routes.push(prefix + '/' + item);
            }
            // Recurse into subdirectories
            routes = routes.concat(getRoutes(fullPath, prefix + '/' + item));
        }
    });
    return routes;
}

console.log("\n--- SAKURA GROUP SITE MAP ---");
const siteMap = getRoutes(root);
siteMap.forEach(route => console.log(`LINK FOUND: ${route.replace('//', '/')}`));
console.log("-----------------------------\n");