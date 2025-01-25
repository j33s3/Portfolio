const fs = require('fs');
const dotenv = require('dotenv');


// Load the .env file
dotenv.config();


// Get the base URL from .env file
const dbBaseUrl = process.env.DB_BASE_URL || '';
const emailBaseUrl = process.env.EMAIL_BASE_URL || '';

// Generate the environment file
const envConfigFile = `
export const environment = {
    production: false,
    dbBaseUrl: '${dbBaseUrl}',
    emailBaseUrl: '${emailBaseUrl}'
}
`;


// Write the environment file
fs.writeFileSync('./src/environment/environment.ts', envConfigFile);

console.log(`Environment file generated with dbBaseUrl: ${dbBaseUrl}`);
console.log(`Environment file generated with dbBaseUrl: ${emailBaseUrl}`);