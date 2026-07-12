const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((file) => `"${path.relative(process.cwd(), file)}"`)
    .join(' ')}`

module.exports = {
  'src/**/*.{ts,js,tsx,jsx}': [buildEslintCommand, 'prettier --write']
}
