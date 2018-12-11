// WordPress dependencies.
const { __ } = wp.i18n;
const { Fragment, createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { ServerSideRender, TextControl } = wp.components;

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

	edit( { attributes, className, isSelected, setAttributes } ) {
		const { url } = attributes;

        // Ensure the block attributes matches this plugin's name.
        return (
			<div className={ className }>
			{ isSelected ? (

				<Fragment>
					<form
						className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
						onSubmit={ event => event.preventDefault() }
					>
						<TextControl
							className="url"
							label={ __( 'Remote posts URL', 'fox-blocks' ) }
							value={ attributes.url }
							onChange={ url => setAttributes( { url } ) }
						/>
					</form>
				</Fragment>

			) : (

				<ServerSideRender
                	block="fox-blocks/remote-posts"
                	attributes={ attributes }
            	/>

			) }
			</div>
        );
    },

	save() {
		return null;
	}
} );
