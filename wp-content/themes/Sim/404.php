<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>
<article>
		<header>
			<h2>Talvez voc&ecirc;<br />
			estivesse tentando<br />
			ir para um desses<br />
			lugares.</h2>
		</header>
		<section class="full">
			<p>Por favor, navegue pelos links acima para saber + sobre o est&uacute;dio<br />
			ou entre em <a href="<?php echo get_permalink_by_name('contato');?>">contato</a>. <strong>Estamos prontos para ouvir voc&ecirc;</strong>.</p>
		</section>
	</article>
<?php get_footer(); ?>