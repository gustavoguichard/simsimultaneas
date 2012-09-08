<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title><?php
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyeleven' ), max( $paged, $page ) );

	?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->
<?php	wp_head();?>
</head>

<body <?php body_class(); ?>>
	<div id="main">
		<header class="nav">
			<nav>
				<ul>
					<li class="home_item icon <?php if(is_front_page()) echo 'active';?>"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><h1><?php bloginfo( 'name' ); ?></h1></a></li>
					<li class="contact_item icon <?php if(is_page('contato')) echo 'active';?>"><a href="<?php echo get_permalink_by_name('contato');?>">Contato</a></li>
					<li class="services_item <?php if(is_page('como-podemos-ajudar')) echo 'active';?>"><a href="<?php echo get_permalink_by_name('como-podemos-ajudar');?>">Como podemos ajudar</a></li>
					<li class="portfolio_item <?php if(is_single()) echo 'active';?>"><a href="#">Portfólio</a>
						<ul class="dropdown-menu">
							<?php $my_query = new WP_Query('showposts=-1&post_type=cases&orderby=menu_order&order=ASC'); ?>
							<?php if($my_query->have_posts()) : ?>
							<li><span>Cases</span></li>
							<?php while($my_query->have_posts()) : $my_query->the_post(); ?>
							<li><a href="<?php echo get_permalink_by_post_title(get_the_title($post->ID));?>"><?php the_title();?></a></li>
							<?php endwhile; endif; wp_reset_query(); ?>
							<?php $my_query = new WP_Query('showposts=-1&post_type=post&orderby=menu_order&order=ASC'); ?>
							<?php if($my_query->have_posts()) : ?>
							<li><span>Outros trabalhos</span></li>
							<?php while($my_query->have_posts()) : $my_query->the_post(); ?>
								<?php if(!get_case_by_title(get_the_title($post->ID))):?>
								<li><a href="<?php the_permalink();?>"><?php the_title();?></a></li>
								<?php endif;?>
							<?php endwhile; endif; wp_reset_query(); ?>
						</ul>
					</li>
					<li class="buddyes_item <?php if(is_page('parceiros')) echo 'active';?>"><a href="<?php echo get_permalink_by_name('parceiros');?>">Parceiros</a></li>
					<li class="clients_item <?php if(is_page('clientes')) echo 'active';?>"><a href="<?php echo get_permalink_by_name('clientes');?>">Quem já nos contratou</a></li>
				</ul>
			</nav>
		</header>
		<div id="content">