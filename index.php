<?php

/**
 * Plugin Name:       All the blocks
 * Description:       All the blocks for Gutenberg.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Rafael Silva
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       atb
 *
 * @package           atb
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 */
function custom_blocks_init()
{

	$blocks = array(
		'hero/',
		'slider/',
		'portfolio/',
		'services/',
		'filters/',
		'works/',
		'products/',
		'catalogue/',
		'description/',
		'contacts/',
		'about-us/',
		'description-alt/',
		'icons-list/',
		'testimonials/',
		'comparison/',
	);

	foreach ($blocks as $block) {
		register_block_type(plugin_dir_path(__FILE__) . 'includes/block-editor/blocks/' . $block);
	}
}
add_action('init', 'custom_blocks_init');

function custom_block_category($block_categories, $editor_context)
{
	if (!empty($editor_context->post)) {
		array_push(
			$block_categories,
			array(
				'slug'  => 'custom',
				'title' => __('All the blocks', 'atb'),
				'icon'  => null,
			)
		);
	}
	return $block_categories;
}

add_filter('block_categories_all', 'custom_block_category', 10, 2);

// custom styles in admin page
function organic_origin_gutenberg_styles()
{
	wp_enqueue_style('organic-origin-gutenberg', get_theme_file_uri('/style.css'), false, '1.0', 'all');
}
add_action('enqueue_block_editor_assets', 'organic_origin_gutenberg_styles');

//Removes rel="noopener" from automatically being added to links in WordPress
function my_links_control($rel, $link)
{
	return false;
}
add_filter('wp_targeted_link_rel', 'my_links_control', 10, 2);
