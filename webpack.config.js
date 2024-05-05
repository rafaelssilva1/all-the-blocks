const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		hero: './includes/block-editor/blocks/hero',
		portfolio: './includes/block-editor/blocks/portfolio',
		'portfolio-script':
			'./includes/block-editor/blocks/portfolio/script.js',
		services: './includes/block-editor/blocks/services',
		'services-script': './includes/block-editor/blocks/services/script.js',
		filters: './includes/block-editor/blocks/filters',
		works: './includes/block-editor/blocks/works',
		'works-script': './includes/block-editor/blocks/works/script.js',
		products: './includes/block-editor/blocks/products',
		catalogue: './includes/block-editor/blocks/catalogue',
		description: './includes/block-editor/blocks/description',
		'description-script':
			'./includes/block-editor/blocks/description/script.js',
		contacts: './includes/block-editor/blocks/contacts',
		'about-us': './includes/block-editor/blocks/about-us',
		'description-alt': './includes/block-editor/blocks/description-alt',
		'icons-list': './includes/block-editor/blocks/icons-list',
		testimonials: './includes/block-editor/blocks/testimonials',
		comparison: './includes/block-editor/blocks/comparison',
		'comparison-script': './includes/block-editor/blocks/comparison/script.js',
	},
};
