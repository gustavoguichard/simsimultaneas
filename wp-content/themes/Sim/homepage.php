<?php
/**
 * Template Name: Home
 *
 * @package WordPress
 * @subpackage Samba estúdio
 * @since Samba estúdio 1.0
 */

get_header(); ?>
		<?php function get_post_vars($post){
			global $title, $first_column, $second_column, $third_column, $layout_style, $arrow_between;
			$title = get_post_meta($post->ID, 'big_title', true);
			$first_column = apply_filters('the_content', get_post_meta($post->ID, 'first_column', true));
			$second_column = apply_filters('the_content', get_post_meta($post->ID, 'second_column', true));
			$third_column = apply_filters('the_content', get_post_meta($post->ID, 'third_column', true));
			$layout_style = get_post_meta($post->ID, 'layout_style', true);
			$arrow_between = get_post_meta($post->ID, 'arrow_between', true);
		}?>
		<section id="home" class="content-area">
		<?php $my_query = new WP_Query('name=home&post_type=areas&showposts=-1'); ?>  
		<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
			<?php get_post_vars($post);?>
			<?php if($title): ?>
				<h1 class="big-call-out">
	            <?php echo nl2br($title);?>	
	         </h1>
	      <?php endif;?>
	      <?php if(get_the_content()):?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>	
	      	</header>
		   <?php endif;?>
		   <?php if($layout_style == "3 Colunas"):?>
		   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
		   		<section class="column">
		   			<?php echo $first_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $second_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $third_column;?>
		   		</section>
		   	</article>
			<?php else:?>
				<article class="two-sections">
	            <?php if($layout_style == "Sidebar na esquerda"):?>
					<aside class="article-aside">
	               <?php echo $first_column;?>
	            </aside>
	            <section class="article-content">
	            	<?php echo $second_column;?>
	            </section>
		         <?php else:?>
	            <section class="article-content">
	               <?php echo $first_column;?>
	            </section>
		         <aside class="article-aside">
	            	<?php echo $second_column;?>
	            </aside>
			      <?php endif;?>
		   	</article>
			<?php endif;?>
		<?php endwhile; endif; wp_reset_query(); ?>
      </section>
      <section id="services" class="content-area">
      <?php $my_query = new WP_Query('name=servicos&post_type=areas&showposts=-1'); ?>  
		<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
			<?php get_post_vars($post);?>
			<?php if($title): ?>
				<h1 class="big-call-out">
	            <?php echo nl2br($title);?>	
	         </h1>
	      <?php endif;?>
	      <?php if(get_the_content()):?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>	
	      	</header>
		   <?php endif;?>
		   <?php if($layout_style == "3 Colunas"):?>
		   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
		   		<section class="column">
		   			<?php echo $first_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $second_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $third_column;?>
		   		</section>
		   	</article>
			<?php else:?>
				<article class="two-sections">
	            <?php if($layout_style == "Sidebar na esquerda"):?>
					<aside class="article-aside">
	               <?php echo $first_column;?>
	            </aside>
	            <section class="article-content">
	            	<?php echo $second_column;?>
	            </section>
		         <?php else:?>
	            <section class="article-content">
	               <?php echo $first_column;?>
	            </section>
		         <aside class="article-aside">
	            	<?php echo $second_column;?>
	            </aside>
			      <?php endif;?>
		   	</article>
			<?php endif;?>
		<?php endwhile; endif; wp_reset_query(); ?>
      </section>
      <section id="about" class="content-area">
      <?php $my_query = new WP_Query('name=sobre&post_type=areas&showposts=-1'); ?>  
		<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
			<?php get_post_vars($post);?>
			<?php if($title): ?>
				<h1 class="big-call-out">
	            <?php echo nl2br($title);?>	
	         </h1>
	      <?php endif;?>
	      <?php if(get_the_content()):?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>	
	      	</header>
		   <?php endif;?>
		   <?php if($layout_style == "3 Colunas"):?>
		   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
		   		<section class="column">
		   			<?php echo $first_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $second_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $third_column;?>
		   		</section>
		   	</article>
			<?php else:?>
				<article class="two-sections">
	            <?php if($layout_style == "Sidebar na esquerda"):?>
					<aside class="article-aside">
	               <?php echo $first_column;?>
	            </aside>
	            <section class="article-content">
	            	<?php echo $second_column;?>
	            </section>
		         <?php else:?>
	            <section class="article-content">
	               <?php echo $first_column;?>
	            </section>
		         <aside class="article-aside">
	            	<?php echo $second_column;?>
	            </aside>
			      <?php endif;?>
		   	</article>
			<?php endif;?>
		<?php endwhile; endif; wp_reset_query(); ?>
      	<?php $my_query = new WP_Query('showposts=-1&post_type=post'); ?>  
			<?php if($my_query->have_posts()) : ?>
			<section class="three-sections team">
			<?php while($my_query->have_posts()) : $my_query->the_post(); ?>
				<div class="team-member">
	            <?php the_post_thumbnail('post', array('class'	=> "member-img")); ?>
	            <h4 class="member-name"><?php the_title();?></h4>
	            <section class="description">
	               <?php the_content();?>
	            </section>
	            <a href="#" class="more-content" title="Ver tudo">+</a>
	         </div>
			<?php endwhile; endif; wp_reset_query(); ?>	
         </section>
      </section>
      <section id="why" class="content-area">
      <?php $my_query = new WP_Query('name=por-que-a-sim&post_type=areas&showposts=-1'); ?>  
		<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
			<?php get_post_vars($post);?>
			<?php if($title): ?>
				<h1 class="big-call-out">
	            <?php echo nl2br($title);?>	
	         </h1>
	      <?php endif;?>
	      <?php if(get_the_content()):?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>	
	      	</header>
		   <?php endif;?>
		   <?php if($layout_style == "3 Colunas"):?>
		   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
		   		<section class="column">
		   			<?php echo $first_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $second_column;?>
		   		</section>
		   		<section class="column">
		   			<?php echo $third_column;?>
		   		</section>
		   	</article>
			<?php else:?>
				<article class="two-sections">
	            <?php if($layout_style == "Sidebar na esquerda"):?>
					<aside class="article-aside">
	               <?php echo $first_column;?>
	            </aside>
	            <section class="article-content">
	            	<?php echo $second_column;?>
	            </section>
		         <?php else:?>
	            <section class="article-content">
	               <?php echo $first_column;?>
	            </section>
		         <aside class="article-aside">
	            	<?php echo $second_column;?>
	            </aside>
			      <?php endif;?>
		   	</article>
			<?php endif;?>
		<?php endwhile; endif; wp_reset_query(); ?>
      </section>
      <section id="contact" class="content-area">
         <div id="form-contact" class="form-section three-sections">
         <?php $my_query = new WP_Query('name=contato&post_type=areas&showposts=-1'); ?>  
			<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
				<?php get_post_vars($post);?>
				<?php if($title): ?>
					<h1 class="big-call-out">
		            <?php echo nl2br($title);?>	
		         </h1>
		      <?php endif;?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>
	      		<img src="<?php bloginfo('template_url');?>/images/contact.png" class="form-image" alt="Trabalhe conosco" />
	      	</header>
			   <?php if($layout_style == "3 Colunas"):?>
			   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
			   		<section class="column">
			   			<?php echo $first_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $second_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $third_column;?>
			   		</section>
			   	</article>
				<?php else:?>
					<article class="two-sections">
		            <?php if($layout_style == "Sidebar na esquerda"):?>
						<aside class="article-aside">
		               <?php echo $first_column;?>
		            </aside>
		            <section class="article-content">
		            	<?php echo $second_column;?>
		            </section>
			         <?php else:?>
		            <section class="article-content">
		               <?php echo $first_column;?>
		            </section>
			         <aside class="article-aside">
		            	<?php echo $second_column;?>
		            </aside>
				      <?php endif;?>
			   	</article>
				<?php endif;?>
			<?php endwhile; endif; wp_reset_query(); ?>
         </div>
         <div id="form-orcamento" class="form-section three-sections hidden">
         <?php $my_query = new WP_Query('name=orcamento&post_type=areas&showposts=-1'); ?>  
			<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
				<?php get_post_vars($post);?>
				<?php if($title): ?>
					<h1 class="big-call-out">
		            <?php echo nl2br($title);?>	
		         </h1>
		      <?php endif;?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>
					<img src="<?php bloginfo('template_url');?>/images/orcamento.png" class="form-image" alt="Trabalhe conosco" />
	      	</header>
			   <?php if($layout_style == "3 Colunas"):?>
			   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
			   		<section class="column">
			   			<?php echo $first_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $second_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $third_column;?>
			   		</section>
			   	</article>
				<?php else:?>
					<article class="two-sections">
		            <?php if($layout_style == "Sidebar na esquerda"):?>
						<aside class="article-aside">
		               <?php echo $first_column;?>
		            </aside>
		            <section class="article-content">
		            	<?php echo $second_column;?>
		            </section>
			         <?php else:?>
		            <section class="article-content">
		               <?php echo $first_column;?>
		            </section>
			         <aside class="article-aside">
		            	<?php echo $second_column;?>
		            </aside>
				      <?php endif;?>
			   	</article>
				<?php endif;?>
			<?php endwhile; endif; wp_reset_query(); ?>
         </div>
         <div id="form-join" class="form-section three-sections hidden">
         <?php $my_query = new WP_Query('name=trabalhe-conosco&post_type=areas&showposts=-1'); ?>  
			<?php if($my_query->have_posts()) : ?><?php while($my_query->have_posts()) : $my_query->the_post(); ?>
				<?php get_post_vars($post);?>
				<?php if($title): ?>
					<h1 class="big-call-out">
		            <?php echo nl2br($title);?>	
		         </h1>
		      <?php endif;?>
	      	<header class="strong-introduction">
	      		<?php the_content();?>	
	      		<img src="<?php bloginfo('template_url');?>/images/join.png" class="form-image" alt="Trabalhe conosco" />
	      	</header>
			   <?php if($layout_style == "3 Colunas"):?>
			   	<article class="three-sections<?php if($arrow_between){echo " arrow-between";}?>">
			   		<section class="column">
			   			<?php echo $first_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $second_column;?>
			   		</section>
			   		<section class="column">
			   			<?php echo $third_column;?>
			   		</section>
			   	</article>
				<?php else:?>
					<article class="two-sections">
						<?php if($layout_style == "Sidebar na esquerda"):?>
						<aside class="article-aside">
		               <?php echo $first_column;?>
		            </aside>
		            <section class="article-content">
		            	<?php echo $second_column;?>
		            </section>
			         <?php else:?>
		            <section class="article-content">
		               <?php echo $first_column;?>
		            </section>
			         <aside class="article-aside">
		            	<?php echo $second_column;?>
		            </aside>
				      <?php endif;?>
			   	</article>
				<?php endif;?>
			<?php endwhile; endif; wp_reset_query(); ?>
         </div>
      </section>
 <?php get_footer();?>