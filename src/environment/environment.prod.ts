console.log("Base URL: ", process.env['AWS_API_BASE_URL']);
console.log("STS URL: ", process.env['AWS_API_STS_URL']);

export const environment = {
    production: true,
    baseUrl: '/prod/',
    STSUrl: process.env['AWS_API_STS_URL'] || "http://localhost:3000"
}
