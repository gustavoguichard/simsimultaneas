<?php get_header(); ?>
<?php global $language;?>
	<article>
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'content', get_post_format() ); ?>
				<?php endwhile; ?>
			<?php else : ?>
			<header>
				<?php if($language == 'en-US'):?>
				<h2>Error 404<br />
					Page not<br />
					found.</h2>
				<?php else:?>
				<h2>Erro 404<br />
					Página não<br />
					encontrada.</h2>
				<?php endif;?>
			</header>
			<section class="full">
				<?php if($language == 'en-US'):?>
				<p>Try reaching the homepage and starting again.</p>
				<?php else:?>
				<p>Tente voltar para a Home e começar de novo.</p>
				<?php endif;?>
			</section>
			<?php endif; ?>
	</article>
<?php get_footer(); ?>