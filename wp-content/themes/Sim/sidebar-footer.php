		<section id="submenu">
			<a class="home_item icon" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">Home</a>
			<a class="contact_item icon" href="<?php echo get_permalink_by_name('contato');?>">Fale com a gente</a>
			<nav class="tree_menu">
				<a class="more_content" href="#">+ outros projetos</a>
				<?php $my_query = new WP_Query('showposts=-1&post_type=post&orderby=menu_order&order=ASC'); ?>
					<?php if($my_query->have_posts()) : ?>
				<ul>
					<?php while($my_query->have_posts()) : $my_query->the_post(); ?>
					<?php if(!get_case_by_title(get_the_title($post->ID))):?>
					<li><a href="<?php the_permalink();?>">/// <?php the_title();?></a></li>
					<?php endif;?>
				<?php endwhile;?>
				</ul>
				<?php endif; wp_reset_query(); ?>
			</nav>
			<nav class="tree_menu">
				<a class="more_content" href="#">+ sobre outros cases</a>
				<?php $my_query = new WP_Query('showposts=-1&post_type=cases&orderby=menu_order&order=ASC'); ?>
					<?php if($my_query->have_posts()) : ?>
				<ul>
					<?php while($my_query->have_posts()) : $my_query->the_post(); ?>
					<li><a href="<?php echo get_permalink_by_post_title(get_the_title($post->ID));?>">/// <?php the_title();?></a></li>
				<?php endwhile;?>
				</ul>
				<?php endif; wp_reset_query(); ?>
			</nav>
		</section>