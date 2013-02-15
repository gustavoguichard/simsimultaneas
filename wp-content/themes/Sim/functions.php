<?php
/**
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

add_action( 'after_setup_theme', 'sim_setup' );

if ( ! function_exists( 'sim_setup' ) ):

function sim_setup() {

	load_theme_textdomain( 'twentyeleven', get_template_directory() . '/languages' );
	add_editor_style();
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 170, 150, true );
	// add_image_size( 'clients-thumb', 300, 85, false);
}
endif; // twentyeleven_setup

function get_area_by_title($page_title)
{
  global $wpdb;
  $post = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type='areas'", $page_title ));
  if ( $post )
      return $post;

  return null;
}

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

function contact_link() {
  return '<a href="#contact" class="contact-link form-link contact-menu-link" data-form="contact">Informações</a>';
}
add_shortcode('contato', 'contact_link');

function contact_link_eng() {
  return '<a href="#contact" class="contact-link form-link contact-menu-link" data-form="contact">Informations</a>';
}
add_shortcode('contato-en', 'contact_link_eng');

function simple_contact_link( $attr, $content = null ) {
  return do_shortcode('<a href="#contact" class="contact-menu-link" data-form="contact">' . $content . '</a>');;
}
add_shortcode('simples-contato', 'simple_contact_link');

function orcamento_link() {
  return '<a href="#contact" class="orcamento-link form-link contact-menu-link" data-form="orcamento">Orçamento</a>';
}
add_shortcode('orcamento', 'orcamento_link');

function orcamento_link_eng() {
  return '<a href="#contact" class="orcamento-link form-link contact-menu-link" data-form="orcamento">Price Estimate</a>';
}
add_shortcode('orcamento-en', 'orcamento_link_eng');

function simple_orcamento_link( $attr, $content = null ) {
  return do_shortcode('<a href="#contact" class="contact-menu-link" data-form="orcamento">' . $content . '</a>');;
}
add_shortcode('simples-orcamento', 'simple_orcamento_link');

function join_link() {
  return '<a href="#contact" class="join-link form-link contact-menu-link" data-form="join">Trabalhe conosco</a>';
}
add_shortcode('trabalhe', 'join_link');

function join_link_eng() {
  return '<a href="#contact" class="join-link form-link contact-menu-link" data-form="join">Join us</a>';
}
add_shortcode('trabalhe-en', 'join_link_eng');

function simple_join_link( $attr, $content = null ) {
  return do_shortcode('<a href="#contact" class="contact-menu-link" data-form="join">' . $content . '</a>');;
}
add_shortcode('simples-trabalhe', 'simple_join_link');

// CUSTOM POSTS
/* CUSTOM POST TYPES */
add_action('init', 'my_cpt_init');
function my_cpt_init()
{
/* AREAS */
  $labelsAreas = array(
    'name' => 'Áreas',
    'singular_name' => 'Área',
    'add_new' => 'Nova Área',
    'add_new_item' => 'Adicionar nova Área',
    'edit_item' => 'Editar Área',
    'new_item' => 'Nova Área',
    'view_item' => 'Ver Área',
    'search_items' => 'Procurar Áreas',
    'not_found' =>  'Não foram encontradas Áreas',
    'not_found_in_trash' => 'Não há Áreas no lixo',
    'parent_item_colon' => '',
    'menu_name' => 'Áreas'

  );
  $argsAreas = array(
    'labels' => $labelsAreas,
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'exclude_from_search' => false,
    'menu_position' => 6,
    'show_in_menu' => true,
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'page',
    'has_archive' => true,
    'hierarchical' => false,
    'supports' => array('title', 'editor', 'revisions')
  );
  register_post_type('areas',$argsAreas);
}

function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Equipe';
    $submenu['edit.php'][5][0] = 'Tradutores';
    $submenu['edit.php'][10][0] = 'Novo Tradutor';
    echo '';
}

function change_post_object_label() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Tradutor';
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
