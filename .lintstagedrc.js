module.exports = {
	"src/**/*.{ts,js,tsx,jsx}": [
			(filenames) => {
				let command = `next lint`
				for (const file of filenames) {
					command+=` --file "${file}"`
				}
				return command
			},
			"prettier --write"
		]
}