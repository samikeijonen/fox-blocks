import { createElement } from '@wordpress/element';
//import { registerBlockType } from '@wordpress/blocks';
//import { __ } from '@wordpress/i18n';
//import { RichText, MediaUpload } from '@wordpress/editor';
import classnames from 'classnames';
const { Fragment } = wp.element;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	AlignmentToolbar,
	URLInput,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
} = wp.editor;

// Register components.
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	Toolbar,
} = wp.components;

registerBlockType( 'fox-blocks/button-cta', {
	title: __( 'Button CTA' ),
	description: __( 'Button CTA desc' ),
	icon: 'admin-site',
	category: 'common',

	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: 'h2'
		},
		text: {
			type: 'array',
			source: 'children',
			selector: '.callout__text',
		},
		alignment: {
            type: 'string',
        },
	},

	edit( { attributes, className, setAttributes } ) {
		const { title, text, alignment } = attributes;

		const classNameEdit = classnames(
			'callout',
			{ [ `is-text-${ alignment }` ]: alignment },
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
                        onChange={ nextAlign => setAttributes({ alignment: nextAlign }) }
                    />
                </BlockControls>
				<div style={ styles } className={ classNameEdit ? classNameEdit : undefined }>
					<RichText
						onChange={ nextTitle => setAttributes({ title: nextTitle }) }
						placeholder={ __( 'Callout title' ) }
						tagName='h2'
						value={ title }
					/>
					<RichText
						multiline='p'
						placeholder={ __( 'Callout text' ) }
						onChange={ nextContent => setAttributes({ text: nextContent }) }
						value={ text }
					/>
				</div>
			</Fragment>
        );
    },

    save( { attributes } ) {
		const { title, text, alignment } = attributes;

		const className = classnames(
			'callout',
			{ [ `is-text-${ alignment }` ]: alignment }
		);

		const styles = {
			textAlign: alignment,
		};

        return (
			<div style={ styles } className={ className ? className : undefined }>
				<RichText.Content
					tagName='h2'
					className='callout__title'
					value={ title }
				/>
				<div className='callout__text'>
					{ text }
				</div>
			</div>
        );
    }
} );
