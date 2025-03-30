const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    resolve: {
        alias: {
            '@env': path.resolve(__dirname, 'src/environments')
        }
    },
    plugins: [
        // Inject environment variables into the build
        new webpack.DefinePlugin({
                'process.env.AWS_API_BASE_URL': JSON.stringify(process.env.AWS_API_BASE_URL),
                'process.env.AWS_API_STS_URL': JSON.stringify(process.env.AWS_API_STS_URL)
        })
    ]
};
