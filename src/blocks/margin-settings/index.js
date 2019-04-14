/**
 * External dependencies
 */
import classnames from 'classnames';

const { __ } = wp.i18n;

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, ToggleControl } = wp.components;

/**
 * Add margin top attribute.
 *
 * @param {Object} settings Settings for the block.
 * @param {string} name     Blocks name.
 *
 * @return {Object} settings Modified settings.
 */
function addMarginAttributes( settings, name ) {
	if ( 'core/group' !== name ) {
		return settings;
	}

	settings.attributes.topMarginReset = {
		type: 'boolean',
		default: false,
	};

	return settings;
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'fox-blocks/margin-settings-attributes',
	addMarginAttributes
);

/**
 * Add margin top controls.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
function addMarginControls( BlockEdit ) {
	const withInspectorControls = createHigherOrderComponent( () => {
		return ( props ) => {
			// Bail if not in Group block.
			if ( props.name !== 'core/group' ) {
				return <BlockEdit { ...props } />;
			}

			const topMarginReset = props.attributes.topMarginReset;

			const toggleMargin = () => props.setAttributes( { topMarginReset: ! topMarginReset } );

			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									label={ __( 'Reset margin top to zero', 'fox-blocks' ) }
									help={ topMarginReset ? __( 'No top margin.', 'fox-blocks' ) : __( 'Has default top margin.', 'fox-blocks' ) }
									checked={ topMarginReset }
									onChange={ toggleMargin }
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		};
	} );

	return withInspectorControls( BlockEdit );
}

wp.hooks.addFilter(
	'editor.BlockEdit',
	'fox-blocks/margin-settings',
	addMarginControls
);

/**
 * Add margin top attribute.
 *
 * @param {Object} el         Block element.
 * @param {Object} block      Blocks object.
 * @param {Object} attributes Blocks attributes.
 *
 * @return {Object} el Modified bock element.
 */
function saveMarginTopSettings( el, block, attributes ) {
	if ( 'core/group' === block.name && attributes.topMarginReset ) {
		el.props.className = classnames( el.props.className, {
			'mt-0': attributes.topMarginReset,
		} );
	}

	return el;
}

wp.hooks.addFilter(
	'blocks.getSaveElement',
	'fox-blocks/save-margin-settings',
	saveMarginTopSettings
);
