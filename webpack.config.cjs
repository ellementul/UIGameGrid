const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    experiments: {
        outputModule: true,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'test'),
        library: {
            type: "module",
        },
    },
    watch: true
}