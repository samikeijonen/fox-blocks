// External dependencies.
import classnames from 'classnames';

// WordPress dependencies.
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
} = wp.editor;

registerBlockType( 'fox-blocks/innerblocks-cta', {
	title: __( 'Callout', 'fox-blocks' ),
	description: __( 'Callout with title, text, and CTA button.', 'fox-blocks' ),
	icon: 'admin-site',
	category: 'common',
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		alignment: {
			type: 'string',
			default: 'center',
		},
	},

	edit( { attributes, className, setAttributes } ) {
		const { alignment } = attributes;

		const classNameEdit = classnames(
			'callout',
			{ [ `text-${ alignment }` ]: alignment },
			className
		);

		const styles = {
			textAlign: alignment,
		};

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
					/>
				</BlockControls>
				<div style={ styles } className={ classNameEdit ? classNameEdit : undefined }>
					<InnerBlocks
						allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button' ] }
						template={ [
							[ 'core/heading' ],
							[ 'core/paragraph' ],
							[ 'core/button' ],
						] }
						templateLock={ false }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { alignment } = attributes;

		const className = classnames(
			'callout', {
				[ `text-${ alignment }` ]: alignment,
			},
		);

		const styles = {
			textAlign: alignment,
		};

		return (
			<div style={ styles } className={ className ? className : undefined }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
