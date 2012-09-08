<?php get_header(); ?>
<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	<article>
		<header>
			<h3><?php the_title(); ?></h3>
		</header>
		<section class="<?php if(get_post_type() == "cases"){echo "full";}else{echo "blog";};?>">
			<?php if(has_post_thumbnail()):?>
			<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'post');?>
			<a href="<?php echo $thumb[0]; ?>" title="<?php the_title();?>"><img src="<?=$thumb[0];?>" alt="<?php the_title();?>" /></a></p>
			<?php endif;?>
			<?php the_content();?>
		</section>
	</article>
	<?php $extra_content = get_post_meta($post->ID, 'extra_content', true);?>
	<?php if($extra_content):?>
	<aside id="extra_content"><?php echo $extra_content;?></aside>
	<?php endif;?>
<?php endwhile;?>
<?php get_footer(); ?>