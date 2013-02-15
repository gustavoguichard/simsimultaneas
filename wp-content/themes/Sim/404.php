<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>
<?php global $language;?>
<article>
		<header>
			<?php if($language == 'en-US'):?>
			<h2>Maybe you<br />
			were trying to<br />
			reach one of the<br />
			places on the top menu.</h2>
			<?php else:?>
			<h2>Talvez voc&ecirc;<br />
			estivesse tentando<br />
			ir para um dos<br />
			link do menu acima.</h2>
			<?php endif;?>
		</header>
		<section class="full">
			<!-- <p>Por favor, navegue pelos links acima para saber + sobre o est&uacute;dio<br />
			ou entre em <a href="<?php echo get_permalink_by_name('contato');?>">contato</a>. <strong>Estamos prontos para ouvir voc&ecirc;</strong>.</p> -->
		</section>
	</article>
<?php get_footer(); ?>