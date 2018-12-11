// WordPress dependencies.
const { __ } = wp.i18n;
const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { ServerSideRender } = wp.components;

// Register the block
registerBlockType( 'fox-blocks/remote-posts', {
	title: __( 'Fetch remote posts', 'fox-blocks' ),
	description: __( 'Fetch remote posts from magazine.', 'fox-blocks' ),
	icon: 'admin-site',
	category: 'widgets',
	keywords: [ __( 'remote posts', 'fox-blocks' ) ],
	supports: {
		html: false
	},

	edit: function( props ) {
        // Ensure the block attributes matches this plugin's name.
        return (
            <ServerSideRender
                block="fox-blocks/remote-posts"
                attributes={ props.attributes }
            />
        );
    },

	save() {
		return null;
	}
} );
