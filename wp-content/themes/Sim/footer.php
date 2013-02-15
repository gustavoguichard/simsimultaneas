<?php global $language;?>
		<footer id="main-footer">
         <p class="copyright">
            <?php if($language == 'en-US'){echo 'Project designed by';}else{echo 'Projeto desenvolvido por';}?> <a href="http://sambaestudio.com.br"><img class="se-link" src="<?php bloginfo('template_url');?>/images/se_link.png" alt="Samba Estúdio" /></a>
         </p>
         <p>
            <?php if($language == 'en-US'){echo 'See you soon!';}else{echo 'Até breve!';}?> <a href="#"><img class="sim-link" src="<?php bloginfo('template_url');?>/images/sim_link.png" alt="Sim - Traduções Simultâneas" /></a> <a href="#home" class="top-link"><?php if($language == 'en-US'){echo 'back';}else{echo 'voltar';}?></a>
         </p>
      </footer>
   </div>
<!-- <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script> -->
<script src="<?php bloginfo('template_url');?>/js/jquery.min.js"></script>
<script src="<?php bloginfo('template_url');?>/js/foundation/jquery.foundation.forms.js"></script>
<script src="<?php bloginfo('template_url');?>/js/main.js"></script>
<?php wp_footer(); ?>
</body>
</html>