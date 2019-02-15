<?php
/**
 * Plugin Name: Fox Blocks
 * Plugin URI: https://github.com/samikeijonen/fox-blocks/
 * Description: Fox Blocks for editor.
 * Version: 1.0.0
 * Author: Sami Keijonen
 * License: MIT
 * Text Domain: fox-blocks
 * Domain Path: /languages
 *
 * @package FoxBlocks
 */

namespace Fox\Blocks;

/**
 * Singleton class that sets up and initializes the plugin.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
final class Plugin {
	/**
	 * Plugin directory path.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $dir = '';

	/**
	 * Plugin directory URI.
	 *
	 * @since  1.0.0
	 * @access public
	 * @var    string
	 */
	public $uri = '';

	/**
	 * Returns the instance.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return object
	 */
	public static function get_instance() {
		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new self();
			$instance->setup();
			$instance->includes();
			$instance->setup_actions();
		}

		return $instance;
	}

	/**
	 * Constructor method.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function __construct() {}

	/**
	 * Magic method to output a string if trying to use the object as a string.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return string
	 */
	public function __toString() {
		return 'fox-blocks';
	}

	/**
	 * Sets up globals.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function setup() {
		// Main plugin directory path and URI.
		$this->dir = trailingslashit( plugin_dir_path( __FILE__ ) );
		$this->uri = trailingslashit( plugin_dir_url( __FILE__ ) );
	}

	/**
	 * Loads files needed by the plugin.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function includes() {
		// Include block PHP files.
		require_once $this->dir . 'src/blocks/remote-posts/index.php';
	}

	/**
	 * Sets up main plugin actions and filters.
	 *
	 * @since  1.0.0
	 * @access private
	 * @return void
	 */
	private function setup_actions() {
		// Register blocks.
		add_action( 'plugins_loaded', array( $this, 'register_blocks' ) );

		// Internationalize the text strings used.
		add_action( 'plugins_loaded', array( $this, 'i18n' ), 2 );
	}

	/**
	 * Register blocks.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function register_blocks() {
		wp_register_script(
			'fox-blocks',
			$this->uri . 'dist/index.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-editor',
				'wp-element',
				'wp-components',
			),
			'1.0.0',
			true
		);

		wp_register_style(
			'fox-blocks-styles',
			$this->uri . 'dist/main.css',
			array(),
			'1.0.0'
		);

		wp_register_style(
			'fox-blocks-editor',
			$this->uri . 'dist/editor.css',
			array(),
			'1.0.0'
		);

		register_block_type(
			'fox-blocks/library',
			array(
				'editor_script' => 'fox-blocks',
				'editor_style'  => 'fox-blocks-editor',
				'style'         => 'fox-blocks-styles',
			)
		);
	}

	/**
	 * Loads the translation files.
	 *
	 * @since  1.0.0
	 * @access public
	 * @return void
	 */
	public function i18n() {
		load_plugin_textdomain( 'fox-blocks', false, trailingslashit( dirname( plugin_basename( __FILE__ ) ) ) . 'languages' );
	}
}

/**
 * Gets the instance of the `Plugin` class.  This function is useful for quickly grabbing data
 * used throughout the plugin.
 *
 * @since  1.0.0
 * @access public
 * @return object
 */
function plugin() {
	return Plugin::get_instance();
}

// Let's get the plugin up and rolling.
plugin();
