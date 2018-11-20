<?php
/**
 * Plugin Name: Fox Blocks
 * Plugin URI: https://github.com/samikeijonen/fox-blocks/
 * Description: Fox Blocks for editor.
 * Version: 1.0.0
 * Author: Sami Keijonen
 *
 * @package FoxBlocks
 */

/**
 * Retrieves a URL to a file in the plugin's directory.
 *
 * @param  string $path Relative path of the desired file.
 *
 * @return string Fully qualified URL pointing to the desired file.
 *
 * @since 1.0.0
 */
function fox_blocks_url( $path ) {
	return plugins_url( $path, __FILE__ );
}

/**
 * Registers the plugin's block.
 *
 * @since 1.0.0
 */
function fox_blocks_register_block() {
	wp_register_script(
		'fox-blocks',
		fox_blocks_url( 'dist/index.js' ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-components',
		),
		'1.0.0',
		true
	);

	register_block_type(
		'fox-blocks/library',
		array(
			'editor_script' => 'fox-blocks',
		)
	);
}
add_action( 'init', 'fox_blocks_register_block' );
