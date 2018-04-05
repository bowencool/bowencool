const fs = require('fs')
const path = require('path')

const entry = {
	'index': path.resolve(__dirname, '../index.js')
}
// const entryNames = fs.readdirSync(path.resolve(__dirname, '../src'))
// 	.filter(file => /\.js$/.test(file))
// 	.map(file => file.replace('.js', ''))
// entryNames.forEach(name => { entry[name] = path.resolve(__dirname, `../src/${name}.js`) })

// console.log(entryNames, entry);

module.exports = {
	entry
}
