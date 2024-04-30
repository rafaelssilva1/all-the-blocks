module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			babelrc: false,
			configFile: false,
			presets: [ '@babel/preset-react' ],
			parserOpts: {
				plugins: [ 'jsx', 'typescript' ],
			},
		},
	},
};
