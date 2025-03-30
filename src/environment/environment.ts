
export const environment = {
    production: false,
    // baseUrl: 'prod/',
    // STSUrl: 'https://c4to99eiba.execute-api.us-west-2.amazonaws.com/prod/get-sts-token'
    baseUrl: "prod/",
    STSUrl: process.env['AWS_API_STS_URL'] || "http://localhost: 3000"
}
