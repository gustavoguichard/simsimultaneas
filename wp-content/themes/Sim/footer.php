	<?php if(!is_page_template('apresenta.php')):?>
		</div><!-- CONTENT -->
	</div><!-- MAIN -->
	<?php endif;?>
	<?php if(!is_page_template('contact.php')):?>
	<footer id="<?php if(is_page_template('apresenta.php')){echo 'intern-';}?>footer">
		<section>
			<a href="#" class="social facebook">Encontre-nos no Facebook</a>
			<a href="#" class="social twitter">Siga-nos no Twitter</a>
			<a href="http://maps.google.com/maps?q=Samba+Est%C3%BAdio,+Porto+Alegre+-+Rio+Grande+do+Sul,+Brasil&hl=pt-BR&ie=UTF8&ll=-30.004747,-51.194229&spn=0.092464,0.126686&sll=37.0625,-95.677068&sspn=43.123021,64.863281&oq=samba+es&hq=Samba+Est%C3%BAdio,&hnear=Porto+Alegre+-+Rio+Grande+do+Sul,+Brasil&t=m&z=13" target="_blank" class="social coordinates">Veja no Google Maps</a>
			<p class="telephones">
				55 51 3029 8284<br />
				55 51 9999 8284
			</p>
			<?php if(is_front_page()):?><img src="http://sambaestudio.com.br/wp-content/uploads/2012/06/bike-012.png" alt="Vá de Skate ou Bike!" style="margin: 0 0 0 10px" /><?php endif;?>
		</section>
		<?php if(is_single()){ get_sidebar('footer'); }?>
	</footer>
	<?php endif;?>
	<?php if(is_page_template('apresenta.php')):?>
		</div><!-- CONTENT -->
	</div><!-- MAIN -->
	<?php endif;?>
	<?php get_sidebar();?>
	<!-- JS
	================================================== -->
	<script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
	<script src="<?php bloginfo('template_url');?>/js/jquery.fancybox.js"></script>
	<script src="<?php bloginfo('template_url');?>/js/main.js"></script>
<?php wp_footer(); ?>
</body>
</html>