/**
 * External dependencies
 */
import classnames from 'classnames';

// WordPress dependencies
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;

const {
	Dashicon,
	IconButton,
	withFallbackStyles,
} = wp.components;

const {
	AlignmentToolbar,
	BlockAlignmentToolbar,
	BlockControls,
	URLInput,
	RichText,
	ContrastChecker,
	InspectorControls,
	withColors,
	PanelColorSettings,
} = wp.editor;

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	const textColorValue = textColor && textColor.color;
	// Avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColorValue || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} );

class ButtonEdit extends Component {
	constructor() {
		super( ...arguments );
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind( this );
	}

	bindRef( node ) {
		if ( ! node ) {
			return;
		}
		this.nodeRef = node;
	}

	render() {
		const {
			attributes,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setAttributes,
			isSelected,
			className,
		} = this.props;

		const {
			title,
			text,
			urlText,
			url,
			align,
			blockAlignment,
		} = attributes;

		const classNameEdit = classnames(
			'callout',
			{ [ `is-text-${ align }` ]: align },
			className
		);

		const styles = {
			textAlign: align,
		};

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ ( value ) => setAttributes( { value } ) }
					/>
					<AlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
				</BlockControls>

				<div style={ styles } className={ classNameEdit ? classNameEdit : undefined } ref={ this.bindRef }>
					<RichText
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						placeholder={ __( 'Callout title' ) }
						tagName="h2"
						value={ title }
					/>
					<div className="callout__text has-large-font-size has-grey-color">
						<RichText
							multiline="p"
							placeholder={ __( 'Callout text' ) }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							value={ text }
						/>
					</div>
					<RichText
						placeholder={ __( 'Add text…' ) }
						value={ urlText }
						onChange={ ( value ) => setAttributes( { urlText: value } ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
						className={ classnames(
							'wp-block-button__link', {
								'has-background': backgroundColor.color,
								[ backgroundColor.class ]: backgroundColor.class,
								'has-text-color': textColor.color,
								[ textColor.class ]: textColor.class,
							}
						) }
						style={ {
							backgroundColor: backgroundColor.color,
							color: textColor.color,
						} }
						keepPlaceholderOnFocus
					/>
					<InspectorControls>
						<PanelColorSettings
							title={ __( 'Color Settings', 'fox-blocks' ) }
							colorSettings={ [
								{
									value: backgroundColor.color,
									onChange: setBackgroundColor,
									label: __( 'Background Color', 'fox-blocks' ),
								},
								{
									value: textColor.color,
									onChange: setTextColor,
									label: __( 'Text Color', 'fox-blocks' ),
								},
							] }
						>
							<ContrastChecker
								{ ...{
									// Text is considered large if font size is greater or equal to 18pt or 24px,
									// currently that's not the case for button.
									isLargeText: false,
									textColor: textColor.color,
									backgroundColor: backgroundColor.color,
									fallbackBackgroundColor,
									fallbackTextColor,
								} }
							/>
						</PanelColorSettings>
					</InspectorControls>
				</div>
				{ isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ ( event ) => event.preventDefault() }>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
						<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
					</form>
				) }
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
	applyFallbackStyles,
] )( ButtonEdit );
