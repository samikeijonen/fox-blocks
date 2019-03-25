/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	InnerBlocks,
	getColorClassName,
} = wp.editor;

/**
 * Internal dependencies
 */
import edit from './edit';

registerBlockType( 'fox-blocks/media-embed-text', {
	title: __( 'Media, embed and text', 'fox-blocks' ),
	description: __( 'Media, embed and text together.', 'fox-blocks' ),
	icon: 'admin-site',
	category: 'layout',
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		align: {
			type: 'string',
			default: 'wide',
		},
		backgroundColor: {
			type: 'string',
		},
		mediaPosition: {
			type: 'string',
			default: 'left',
		},
	},

	edit,

	save( { attributes } ) {
		const {
			backgroundColor,
			mediaPosition,
		} = attributes;

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const className = classnames( {
			'has-media-on-the-right': 'right' === mediaPosition,
			[ backgroundClass ]: backgroundClass,
		} );

		return (
			<div className={ className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
