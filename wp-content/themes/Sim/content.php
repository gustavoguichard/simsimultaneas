	<header>
		<h3><?php the_title(); ?></h3>
	</header>
	<section class="blog">
		<?php if(has_post_thumbnail()):?>
			<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'post');?>
			<a href="<?php echo $thumb[0]; ?>" title="<?php the_title();?>"><img src="<?=$thumb[0];?>" alt="<?php the_title();?>" /></a></p>
			<?php endif;?>src="<?=$thumb[0];?>" alt="<?php the_title();?>" /></a></p>
		<?php the_excerpt();?>
	</section>