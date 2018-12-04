// WordPress dependencies.
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Internal dependencies.
import edit from './edit';

// Register the block
registerBlockType( 'fox-blocks/fetch-posts', {
	title: __( 'Latest magazine posts' ),
	description: __( 'Display your most recent posts from magazine.' ),
	icon: 'admin-site',
	category: 'widgets',
	keywords: [ __( 'recent posts' ) ],
	supports: {
		html: false
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit,

	save() {
		return null;
	}
} );
