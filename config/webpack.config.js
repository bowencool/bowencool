const path = require('path')
const { entry } = require('./utilitys')

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "[name].js",
    },
}
