<?php 
/*
  Plugin Name: Gustavo Guichard e Samba Copyright
  Description: Mostra informações de copyright no Dashboard
  Version: 0.1
  Author: Gustavo Guichard
  Author URI: http://gustavoguichard.com/
*/


function modify_footer_admin () {
	echo 'Criado por <a href="http://gustavoguichard.com">Gustavo Guichard</a> e <a href="http://sambaestudio.com.br">Samba Estúdio</a>.';
	echo ' Suportado por <a href="http://WordPress.org">WordPress</a>.';
}

add_filter('admin_footer_text', 'modify_footer_admin');

/* FAVICON AUTOMÁTICO */
function blog_favicon() {
	echo '<link rel="Shortcut Icon" type="image/x-icon" href="'.get_bloginfo('wpurl').'/favicon.ico" />';
}
add_action('wp_head', 'blog_favicon');

?>