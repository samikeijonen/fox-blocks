/**
 * Adds block class to list, paragraph, and heading blocks.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#blocks-registerblocktype
 */
function addBlockClassNames( settings, name ) {
    if ( name !== 'core/list' && name !== 'core/paragraph' && name !== 'core/heading' ) {
        return settings;
    }

    return lodash.assign( {}, settings, {
        supports: lodash.assign( {}, settings.supports, {
            className: true
        } )
    } );
}

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'fox-blocks/library',
    addBlockClassNames
);
