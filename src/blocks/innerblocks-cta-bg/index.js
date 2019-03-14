/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';

// WordPress dependencies.
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	AlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
} = wp.editor;

const {
	Button,
	PanelBody,
	ToggleControl,
} = wp.components;

registerBlockType( 'fox-blocks/innerblocks-cta-bg', {
	title: __( 'Callout with background', 'fox-blocks' ),
	description: __( 'Callout background media.', 'fox-blocks' ),
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
		url: {
			type: 'string',
		},
		id: {
			type: 'number',
		},
		hasDim: {
			type: 'boolean',
			default: false,
		},
	},

	edit( { attributes, className, setAttributes } ) {
		const { alignment, id, url, hasDim } = attributes;

		const onSelectImage = ( img ) => {
			setAttributes( {
				id: img.id,
				url: img.url,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				id: null,
				url: null,
			} );
		};

		const toggleDim = () => setAttributes( { hasDim: ! hasDim } );

		const classNameEdit = classnames(
			'callout',
			{
				[ `text-${ alignment }` ]: alignment,
				// Add `has-background-bg`class if we have image URL.
				'has-background-bg': url,
				'has-dim': hasDim,
			},
			className
		);

		// Set background image first in object.
		const styles = backgroundImageStyles( url );

		// Set textAlign.
		styles.textAlign = alignment;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<ToggleControl
							label={ __( 'Has dim background.', 'fox-blocks' ) }
							checked={ hasDim }
							onChange={ toggleDim }
						/>
					</PanelBody>
				</InspectorControls>

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

					{ ! id && (
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ id }
							render={ ( { open } ) => (
								<Button
									className={ 'button button-large' }
									onClick={ open }
								>
									{ __( ' Upload Image', 'fox-blocks' ) }
								</Button>
							) }
						>
						</MediaUpload>
					) }

					{ id ? (

						<Button
							className={ 'remove-image' }
							onClick={ onRemoveImage }
						>
							{ icons.remove }
							<span className="screen-reader-text">{ __( 'Remove Image', 'fox-blocks' ) }</span>
						</Button>

					) : null }
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { alignment, url, hasDim } = attributes;

		const className = classnames(
			'callout', {
				[ `text-${ alignment }` ]: alignment,
				// Add `has-background-bg`class if we have image URL.
				'has-background-bg': url,
				'has-dim': hasDim,
			},
		);

		// Set background image first in object.
		const styles = backgroundImageStyles( url );

		// Set textAlign.
		styles.textAlign = alignment;

		return (
			<div style={ styles } className={ className ? className : undefined }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		{};
}
