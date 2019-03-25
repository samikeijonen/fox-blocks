/**
 * External dependencies
 */
import classnames from 'classnames';
import noop from 'lodash';

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

registerBlockType( 'fox-blocks/media-text', {
	title: __( 'Media and text', 'fox-blocks' ),
	description: __( 'Media and text together.', 'fox-blocks' ),
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
		marginTop: {
			type: 'boolean',
			default: false,
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'figure img',
			attribute: 'alt',
			default: '',
		},
		mediaId: {
			type: 'number',
		},
		mediaPosition: {
			type: 'string',
			default: 'left',
		},
		mediaType: {
			type: 'string',
		},
		mediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'figure video,figure img',
			attribute: 'src',
		},
	},

	edit,

	save( { attributes } ) {
		const {
			backgroundColor,
			marginTop,
			mediaAlt,
			mediaId,
			mediaPosition,
			mediaType,
			mediaUrl,
		} = attributes;

		const mediaTypeRenders = {
			image: () => <img src={ mediaUrl } alt={ mediaAlt } className={ ( mediaId && mediaType === 'image' ) ? `wp-image-${ mediaId }` : null } />,
			video: () => <video controls src={ mediaUrl } />,
		};

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const className = classnames( {
			'has-media-on-the-right': 'right' === mediaPosition,
			'mt-0': marginTop,
			[ backgroundClass ]: backgroundClass,
		} );

		return (
			<div className={ className }>
				<figure className="wp-block-fox-blocks-media-text__media" >
					{ ( mediaTypeRenders[ mediaType ] || noop )() }
				</figure>

				<div className="wp-block-fox-blocks-media-text__content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
