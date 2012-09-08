<?php
/**
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */


add_action( 'after_setup_theme', 'samba_setup' );

if ( ! function_exists( 'samba_setup' ) ):

function samba_setup() {

	load_theme_textdomain( 'twentyeleven', get_template_directory() . '/languages' );
	add_editor_style();

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', __( 'Primary Menu', 'twentyeleven' ) );

	// This theme uses Featured Images (also known as post thumbnails) for per-post/per-page Custom Header images
	add_theme_support( 'post-thumbnails' );

	// We'll be using post thumbnails for custom header images on posts and pages.
	// We want them to be the size of the header image that we just defined
	// Larger images will be auto-cropped to fit, smaller ones will be ignored. See header.php.
	set_post_thumbnail_size( 900, 6000, true );

	// Add Twenty Eleven's custom image sizes.
	// Used for large feature (header) images.
	add_image_size( 'clients-thumb', 300, 85, false);
}
endif; // twentyeleven_setup

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 */
function twentyeleven_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'twentyeleven_page_menu_args' );

function twentyeleven_body_classes( $classes ) {

	if ( function_exists( 'is_multi_author' ) && ! is_multi_author() )
		$classes[] = 'single-author';

	if ( is_singular() && ! is_home() && ! is_page_template( 'showcase.php' ) && ! is_page_template( 'sidebar-page.php' ) )
		$classes[] = 'singular';

	return $classes;
}
add_filter( 'body_class', 'twentyeleven_body_classes' );


// SHORTCODES
function left_section( $attr, $content = null ) {
  return do_shortcode('<section class="left">' . $content . '</section>');
}
add_shortcode('esquerda', 'left_section'); 

function right_section( $attr, $content = null ) {
  return do_shortcode('<section class="right">' . $content . '</section>');
}
add_shortcode('direita', 'right_section'); 

function full_section( $attr, $content = null ) {
  return do_shortcode('<section class="full">' . $content . '</section>');
}
add_shortcode('cheio', 'full_section'); 

function coord_link() {
  return '<a href="http://maps.google.com/maps?q=Samba+Est%C3%BAdio,+Porto+Alegre+-+Rio+Grande+do+Sul,+Brasil&hl=pt-BR&ie=UTF8&ll=-30.004747,-51.194229&spn=0.092464,0.126686&sll=37.0625,-95.677068&sspn=43.123021,64.863281&oq=samba+es&hq=Samba+Est%C3%BAdio,&hnear=Porto+Alegre+-+Rio+Grande+do+Sul,+Brasil&t=m&z=13" target="_blank" id="coordinates" class="social">Veja no Google Maps</a>';
}
add_shortcode('coordenadas', 'coord_link');

// FUNCOES
function get_permalink_by_name($page_name)
{
	global $post;
	global $wpdb;
	$pageid_name = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '".$page_name."'");
	return get_permalink($pageid_name);
}

function get_permalink_by_post_title($page_title)
{
	global $wpdb;
  $post = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type='post'", $page_title ));
  if ( $post )
      return get_permalink($post);

  return null;
}

function get_post_by_title($page_title)
{
  global $wpdb;
  $post = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type='post'", $page_title ));
  if ( $post )
      return $post;

  return null;
}

function get_case_by_title($page_title, $output = OBJECT) {
  global $wpdb;
  $post = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type='cases'", $page_title ));
  if ( $post )
      return get_post($post, $output);

  return null;
}


// CUSTOM POSTS
/* CUSTOM POST TYPES */
add_action('init', 'my_cpt_init');
function my_cpt_init() 
{
/* CLIENTES */
  $labelsClients = array(
    'name' => 'Clientes',
    'singular_name' => 'Cliente',
    'add_new' => 'Novo Cliente',
    'add_new_item' => 'Adicionar novo Cliente',
    'edit_item' => 'Editar Cliente',
    'new_item' => 'Novo Cliente',
    'view_item' => 'Ver Cliente',
    'search_items' => 'Procurar Clientes',
    'not_found' =>  'Não foram encontrados Clientes',
    'not_found_in_trash' => 'Não há Clientes no lixo', 
    'parent_item_colon' => '',
    'menu_name' => 'Clientes'

  );
  $argsClients = array(
    'labels' => $labelsClients,
    'public' => true,
    'publicly_queryable' => false,
    'show_ui' => true,
    'exclude_from_search' => true,
    'menu_position' => 10,
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => false,
    'supports' => array('title','thumbnail')
  );
  register_post_type('clients',$argsClients);
/* CASES */
  $labelsCases = array(
    'name' => 'Cases',
    'singular_name' => 'Case',
    'add_new' => 'Novo Case',
    'add_new_item' => 'Adicionar novo Case',
    'edit_item' => 'Editar Case',
    'new_item' => 'Novo Case',
    'view_item' => 'Ver Case',
    'search_items' => 'Procurar Cases',
    'not_found' =>  'Não foram encontrados Cases',
    'not_found_in_trash' => 'Não há Cases no lixo', 
    'parent_item_colon' => '',
    'menu_name' => 'Cases'

  );
  $argsCases = array(
    'labels' => $labelsCases,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'exclude_from_search' => false,
    'menu_position' => 4,
    'show_in_menu' => true, 
    'query_var' => true,
    // 'rewrite' => array('slug' => 'portfolio', 'with_front' => false),
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => false,
    'supports' => array('title','editor')
  );
  register_post_type('cases',$argsCases);
}

function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Projetos';
    $submenu['edit.php'][5][0] = 'Projetos';
    $submenu['edit.php'][10][0] = 'Novo Projeto';
    echo '';
}

function change_post_object_label() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Projeto';
}
add_action( 'init', 'change_post_object_label' );
add_action( 'admin_menu', 'change_post_menu_label' );

// GOOGLE ANALYTICS
add_action('admin_menu', 'add_gcf_interface');

function add_gcf_interface() {
  add_options_page('Opções do Site', 'Opções do Site', '8', 'functions', 'editglobalcustomfields');
}

function editglobalcustomfields() {
  ?>
  <div class='wrap'>
  <h2>Opções do Site</h2>
  <form method="post" action="options.php">
  <?php wp_nonce_field('update-options') ?>

  <p><strong>Código do Google Analytics:</strong></p>
  <p>
    <input type="text" name="google_analytics" id="google_analytics" value="<?php echo get_option('google_analytics');?>" />
  </p>
  <p><input type="submit" name="Submit" value="Salvar Alterações" /></p>
  
  <input type="hidden" name="action" value="update" />
  <input type="hidden" name="page_options" value="google_analytics" />

  </form>
  </div>
  <?php
}

/* GOOGLE ANALYTICS */
function add_google_analytics() {
  if(!is_user_logged_in()){
    $echo = '<script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>';
    $echo .= '<script type="text/javascript">';
    $echo .= 'var pageTracker = _gat._getTracker("' . get_option('google_analytics') . '");';
    $echo .= 'pageTracker._trackPageview();';
    $echo .= '</script>';
    echo $echo;
  }
}
add_action('wp_footer', 'add_google_analytics');
