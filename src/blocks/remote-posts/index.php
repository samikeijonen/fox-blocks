<?php
/**
 * Server-side rendering of the `fox-blocks/remote-posts` block.
 *
 * @package FoxBlocks
 */

/**
 * Renders the `fox-blocks/remote-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function fb_render_block_core_remote_posts( $attributes ) {
	// Get $request from transient if it exists.
	$request = get_transient( 'fox_blocks_remote_posts' );

	// If there is no transient, fetch the data and set transient.
	if ( false === $request ) {
		$request = wp_remote_get( 'https://pohjiksenverkkolehti.fi/wp-json/wp/v2/posts?per_page=5' );
		set_transient( 'fox_blocks_remote_posts', $request, 60 * 30 );
	}

	// Bail early if there are errors.
	if ( is_wp_error( $request ) ) {
		return false;
	}

	// Retrieve the body of data and decode the JSON.
	$body = wp_remote_retrieve_body( $request );
	$data = json_decode( $body );

	// Start markup.
	$content_markup = '';

	if ( ! empty( $data ) ) {
		$content_markup .= '<ul>';
		foreach ( $data as $content ) {
			$content_markup .= '<li>';
			$content_markup .= '<a href="' . esc_url( $content->link ) . '">' . $content->title->rendered . '</a>';
			$content_markup .= '</li>';
		}
		$content_markup .= '</ul>';
	}

	return $content_markup;
}

/**
 * Registers the `fox-blocks/remote-posts` block on server.
 */
function fb_register_block_core_remote_posts() {
	// Check if the register function exists.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'fox-blocks/remote-posts',
		array(
			'render_callback' => 'fb_render_block_core_remote_posts',
		)
	);
}
add_action( 'init', 'fb_register_block_core_remote_posts' );
