// External dependencies.
import classnames from 'classnames';

// WordPress dependencies.
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	RichText,
	getColorClassName,
} = wp.editor;

// Internal dependencies.
import edit from './edit';

registerBlockType( 'fox-blocks/button-cta-1', {
	title: __( 'Button CTA 1', 'fox-blocks' ),
	description: __( 'Button CTA desc 1, with button block', 'fox-blocks' ),
	icon: 'admin-site',
	category: 'common',

	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: 'h2',
		},
		text: {
			type: 'array',
			source: 'children',
			selector: '.callout__text',
		},
		urlText: {
			type: 'string',
			source: 'text',
			selector: 'a',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
		align: {
			type: 'string',
		},
		blockAlignment: {
			type: 'string',
			supports: [ 'full', 'wide' ],
		},
	},
	getEditWrapperProps( { blockAlignment } ) {
		if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment || 'wide' === blockAlignment ) {
			return { 'data-align': blockAlignment };
		}
	},

	edit,

	save( { attributes } ) {
		const {
			title,
			text,
			urlText,
			url,
			align,
			blockAlignment,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const className = classnames(
			'callout', {
				[ `is-text-${ align }` ]: align,
				[ `align${ blockAlignment }` ]: blockAlignment,
			},
		);

		const styles = {
			textAlign: align,
		};

		const buttonClasses = classnames( 'wp-block-button__link', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		return (
			<div style={ styles } className={ className ? className : undefined }>
				<RichText.Content
					tagName="h2"
					className="callout__title"
					value={ title }
				/>
				<div className="callout__text has-large-font-size has-grey-color">
					{ text }
				</div>
				<RichText.Content
					tagName="a"
					className={ buttonClasses }
					href={ url }
					value={ urlText }
				/>
			</div>
		);
	},
} );
