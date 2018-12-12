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
 * @return string Returns the post content with remote posts added.
 */
function fb_render_block_core_remote_posts( $attributes ) {
	// Get $request from transient if it exists.
	$request = get_transient( 'fox_blocks_remote_posts' );

	// If there is no transient, fetch the data and set transient.
	if ( false === $request ) {
		$request = wp_remote_get( esc_url( $attributes['url'] ) );
		set_transient( 'fox_blocks_remote_posts', $request, 60 * 30 );
	}

	// Bail early if there are errors.
	if ( is_wp_error( $request ) ) {
		return '<p>' . esc_html__( 'There were no posts found.', 'fox-blocks' ) . '<p>';
	}

	// Retrieve the body of data and decode the JSON.
	$body = wp_remote_retrieve_body( $request );
	$data = json_decode( $body );

	// Start markup.
	$content_markup = '';

	// Classes.
	$class = 'fox-block-remote-posts';

	if ( isset( $attributes['className'] ) && $attributes['className'] ) {
		$class .= ' ' . $attributes['className'];
	}

	if ( ! empty( $data ) ) {
		$content_markup .= '<ul class="' . esc_attr( $class ) . '">';
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
			'attributes'      => array(
				'url'       => array(
					'type' => 'string',
				),
				'className' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'fb_render_block_core_remote_posts',
		)
	);
}
add_action( 'init', 'fb_register_block_core_remote_posts' );
