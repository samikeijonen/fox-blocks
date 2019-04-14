/**
 * Handles table of contents (TOC).
 */
const toc = () => {
	// Get all H2 heading which have id.
	const headings = document.querySelectorAll( 'h2[id]' );

	// Where to output TOC.
	const target = document.querySelector( '.js-toc' );

	// Make sure there's a target and headings.
	if ( ! target || headings.length < 1 ) {
		return;
	}

	// Create the table of contents items.
	const tocItems = Array.prototype.map.call( headings, function( heading ) {
		return `<li><a href="#${ heading.id }">${ heading.id.replace( '-', ' ' ) }</a></li>`;
	} ).join( '' );

	// Add the table of contents to the DOM.
	target.innerHTML = `<h2>Table of Contents</h2>
		<ul>
			${ tocItems }
		</ul>`;
};

export default toc;
