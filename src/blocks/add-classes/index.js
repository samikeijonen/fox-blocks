/**
 * Adds block class to list, paragraph, and heading blocks.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#blocks-registerblocktype
 *
 * @param {type}   settings Settings for the block.
 * @param {string} name     Block name.
 *
 * @return {string} Classname.
 */
function addBlockClassNames( settings, name ) {
	if ( 'core/list' !== name && 'core/paragraph' !== name && 'core/heading' !== name ) {
		return settings;
	}

	return lodash.assign( {}, settings, {
		supports: lodash.assign( {}, settings.supports, {
			className: true,
		} ),
	} );
}

wp.hooks.addFilter(
	'blocks.registerBlockType',
	'fox-blocks/library',
	addBlockClassNames
);
