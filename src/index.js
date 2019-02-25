import textCTA from './blocks/text-cta/';
import buttonCTA from './blocks/button-cta/';
import buttonCTA1 from './blocks/button-cta-1/';
import * as innerBlocksCTA from './blocks/innerblocks-cta/';
import remotePosts from './blocks/remote-posts/';

// Style variations.
import styleVariations from './blocks/style-variations/';

// Add classes to blocks.
import addClasses from './blocks/add-classes/';

const { registerBlockType } = wp.blocks;

// Array of allowed blocks.
const allowedBlocks = [
	innerBlocksCTA,
];

export const registerCustomBlocks = () => {
	allowedBlocks.forEach( ( block ) => {
		if ( ! block ) {
			return;
		}

		const { name, settings } = block;
		registerBlockType( name, settings );
	} );
};

const App = () => {
	registerCustomBlocks();
	textCTA();
	buttonCTA();
	buttonCTA1();
	remotePosts();
	styleVariations();
	addClasses();
};

App();

if ( module.hot ) {
	module.hot.accept( App );
}
