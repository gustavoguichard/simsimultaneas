<?php
/**
 * Template Name: Clientes
 *
 * @package WordPress
 * @subpackage Samba estúdio
 * @since Samba estúdio 1.0
 */

get_header(); ?>
<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	<article>
		<section class="clients">
		<?php $my_query = new WP_Query('showposts=-1&post_type=clients&orderby=menu_order&order=ASC'); ?>
		<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
			<?php the_post_thumbnail('clients-thumb');?>
	<?php endwhile; endif; wp_reset_query(); ?>
		</section>
	</article>
	<?php $extra_content = get_post_meta($post->ID, 'extra_content', true);?>
	<?php if($extra_content):?>
	<aside id="extra_content"><?php echo $extra_content;?></aside>
	<?php endif;?>
<?php endwhile;?>
<?php get_footer(); ?>