const fs = require('fs');
const dotenv = require('dotenv');


// Load the .env file
dotenv.config();


// Get the base URL from .env file
const baseUrl = process.env.VITE_BASE_URL || '';

// Generate the environment file
const envConfigFile = `
export const environment = {
    production: false,
    baseUrl: '${baseUrl}'
}
`;


// Write the environment file
fs.writeFileSync('./src/environment/environment.ts', envConfigFile);

console.log(`Environment file generated with baseUrl: ${baseUrl}`);

