// External dependencies.
import classnames from 'classnames';

// WordPress dependencies.
import { createElement } from '@wordpress/element';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Register editor components.
const {
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockControls,
	RichText,
} = wp.editor;

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
		blockAlignment: {
			type: 'string',
		},
	},
	getEditWrapperProps( { blockAlignment } ) {
		if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment || 'wide' === blockAlignment ) {
			return { 'data-align': blockAlignment };
		}
	},

	edit( { attributes, className, setAttributes } ) {
		const { title, text, alignment, blockAlignment } = attributes;

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
					<BlockAlignmentToolbar
                        value={ blockAlignment }
                        onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                    />
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
		const { title, text, alignment, blockAlignment } = attributes;

		const className = classnames(
			'callout', {
				[ `is-text-${ alignment }` ]: alignment,
				[ `align${ blockAlignment }` ]: blockAlignment,
			},
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
