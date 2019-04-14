// WordPress dependencies.
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register block.
registerBlockType( 'fox-blocks/toc', {
	title: __( 'TOC', 'fox-blocks' ),
	description: __( 'Table of contents from headings anchor', 'fox-blocks' ),
	icon: 'admin-site',
	category: 'common',

	edit( { className } ) {
		return (
			<div className={ className }>
				{ __( 'Placeholder for table of contents', 'fox-blocks' ) }
			</div>
		);
	},

	save( {} ) {
		return (
			<div className="js-toc"></div>
		);
	},
} );
