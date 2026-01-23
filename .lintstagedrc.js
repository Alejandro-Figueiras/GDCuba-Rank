module.exports = {
	"src/**/*.{ts,js,tsx,jsx}": [
			(filenames) => {
				let command = `eslint`
				for (const file of filenames) {
					command+=` "${file}"`
				}
				return command
			},
			"prettier --write"
		]
}