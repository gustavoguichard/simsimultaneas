<?php get_header(); ?>
	<article>
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'content', get_post_format() ); ?>
				<?php endwhile; ?>
			<?php else : ?>
			<header>
				<h2>Erro 404<br />
					Página não<br />
					encontrada.</h2>
			</header>
			<section class="full">
				<p>Tente voltar para a Home e começar de novo, ou quem sabe olhar nosso portfólio.</p>
			</section>
			<?php endif; ?>
	</article>
<?php get_footer(); ?>