const fs = require('fs');
const path = require('path');

// Define the folder structure
const folders = [
    'controllers',
    'routes',
    'utils',
    'public',
];

// Create the folders
folders.forEach(folder => {
    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created folder: ${dir}`);
    } else {
        console.log(`Folder already exists: ${dir}`);
    }
});

console.log('Folder structure created successfully!');