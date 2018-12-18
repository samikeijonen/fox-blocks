// WordPress dependencies.
const { __ } = wp.i18n;

/**
 * Add new button style style variant.
 *
 * This adds new class `is-style-circle-button` to button block.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#block-style-variations
 */
wp.blocks.registerBlockStyle( 'core/button', {
	name: 'circle-button',
	label: __( 'Circle button', 'fox-blocks' ),
} );
