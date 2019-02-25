// External dependencies.
import classnames from 'classnames';

const { __ } = wp.i18n;

// Internal dependencies.
import edit from './edit';

// Register editor components.
const {
	InnerBlocks,
} = wp.editor;

const name = 'fox-blocks/innerblocks-cta';

const settings = {
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

	edit,

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
};

export { name, settings };
