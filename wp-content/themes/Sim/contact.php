<?php
/**
 * Template Name: Contato
 *
 * @package WordPress
 * @subpackage Samba estúdio
 * @since Samba estúdio 1.0
 */

get_header(); ?>
<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	<article>
		<header>
			<?php $page_quoted_title = get_post_meta($post->ID, 'page_quoted_title', true);?>
			<h2><?php if($page_quoted_title){echo nl2br($page_quoted_title);} else {the_title();} ?></h2>
		</header>
		<?php the_content();?>
	</article>
	<?php $extra_content = get_post_meta($post->ID, 'extra_content', true);?>
	<?php if($extra_content):?>
	<aside id="extra_content"><?php echo $extra_content;?></aside>
	<?php endif;?>
<?php endwhile;?>
<?php get_footer(); ?>