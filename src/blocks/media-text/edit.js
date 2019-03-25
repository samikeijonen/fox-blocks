/**
 * External dependencies
 */
import classnames from 'classnames';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
} = wp.editor;

const { Component, Fragment } = wp.element;

const {
	PanelBody,
	TextareaControl,
	ToggleControl,
	Toolbar,
} = wp.components;

/**
 * Internal dependencies
 */
import MediaContainer from './media-container';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/list' ];

const TEMPLATE = [
	[ 'core/heading', { placeholder: _x( 'Heading…', 'heading placeholder', 'fox-blocks' ), level: 2 } ],
	[ 'core/paragraph', { placeholder: _x( 'Content…', 'content placeholder', 'fox-blocks' ) } ],
];

class MediaTextEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectMedia = this.onSelectMedia.bind( this );
	}

	onSelectMedia( media ) {
		const { setAttributes } = this.props;

		let mediaType;
		let src;

		// for media selections originated from a file upload.
		if ( media.media_type ) {
			if ( media.media_type === 'image' ) {
				mediaType = 'image';
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// video contain the media type of 'file' in the object returned from the rest api.
				mediaType = 'video';
			}
		} else { // for media selections originated from existing files in the media library.
			mediaType = media.type;
		}

		if ( mediaType === 'image' ) {
			// Try the "large" size URL, falling back to the "full" size URL below.
			src = get( media, [ 'sizes', 'large', 'url' ] ) || get( media, [ 'media_details', 'sizes', 'large', 'source_url' ] );
		}

		setAttributes( {
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType,
			mediaUrl: src || media.url,
		} );
	}

	renderMediaArea() {
		const { attributes } = this.props;
		const { marginTop, mediaAlt, mediaId, mediaPosition, mediaType, mediaUrl } = attributes;

		return (
			<MediaContainer
				className="wp-block-fox-blocks-media-text__media"
				onSelectMedia={ this.onSelectMedia }
				{ ...{ marginTop, mediaAlt, mediaId, mediaPosition, mediaType, mediaUrl } }
			/>
		);
	}

	render() {
		const {
			attributes,
			className,
			backgroundColor,
			isSelected,
			setAttributes,
			setBackgroundColor,
		} = this.props;

		const {
			marginTop,
			mediaAlt,
			mediaPosition,
			mediaType,
		} = attributes;

		const classNames = classnames( className, {
			'has-media-on-the-right': 'right' === mediaPosition,
			'is-selected': isSelected,
			[ backgroundColor.class ]: backgroundColor.class,
		} );

		const style = {
			backgroundColor: backgroundColor.color,
		};

		const colorSettings = [ {
			value: backgroundColor.color,
			onChange: setBackgroundColor,
			label: __( 'Background Color', 'fox-blocks' ),
		} ];

		const toolbarControls = [
			{
				icon: 'align-pull-left',
				title: __( 'Show media on left', 'fox-blocks' ),
				isActive: mediaPosition === 'left',
				onClick: () => setAttributes( { mediaPosition: 'left' } ),
			},
			{
				icon: 'align-pull-right',
				title: __( 'Show media on right', 'fox-blocks' ),
				isActive: mediaPosition === 'right',
				onClick: () => setAttributes( { mediaPosition: 'right' } ),
			},
		];

		const onMediaAltChange = ( newMediaAlt ) => {
			setAttributes( { mediaAlt: newMediaAlt } );
		};

		const toggleMarginTop = ( newMarginTop ) => {
			setAttributes( { marginTop: newMarginTop } );
		};

		const mediaTextGeneralSettings = (
			<PanelBody title={ __( 'Media & Text Settings', 'fox-blocks' ) }>
				{ mediaType === 'image' && (
					<TextareaControl
						label={ __( 'Alt Text (Alternative Text)', 'fox-blocks' ) }
						value={ mediaAlt }
						onChange={ onMediaAltChange }
						help={ __( 'Alternative text describes your image to people who can’t see it. Add a short description with its key details.', 'fox-blocks' ) }
					/>
				) }
			</PanelBody>
		);

		return (
			<Fragment>
				<InspectorControls>
					{ mediaTextGeneralSettings }
					<PanelBody title={ __( 'Layout settings', 'fox-blocks' ) }>
						<ToggleControl
							label={ __( 'Remove margin top', 'fox-blocks' ) }
							checked={ !! marginTop }
							onChange={ toggleMarginTop }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings', 'fox-blocks' ) }
						initialOpen={ false }
						colorSettings={ colorSettings }
					/>
				</InspectorControls>
				<BlockControls>
					<Toolbar
						controls={ toolbarControls }
					/>
				</BlockControls>
				<div className={ classNames } style={ style } >
					{ this.renderMediaArea() }
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</Fragment>
		);
	}
}

export default withColors( 'backgroundColor' )( MediaTextEdit );
