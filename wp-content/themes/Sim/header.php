<?php
global $language;
$language = get_bloginfo('language');
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>
<?php if($language == 'en-US'):?>
Sim | Simultaneous translations, Certified translations (legal), public and simple translations. Porto Alegre – Brazil.
<?php else:?>
Sim | Traduções simultâneas, traduções juramentadas, traduções e versões. Porto Alegre – Brasil.
<?php endif;?>
</title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<script src="<?php bloginfo('template_url');?>/js/foundation/modernizr.foundation.js"></script>
<?php	wp_head();?>
</head>
<body <?php body_class(); ?>>
	<header id="main-header">
      <hgroup id="logo-group">
         <h1><a href="#" id="logo" title="<?php bloginfo( 'name' ); ?>"><?php bloginfo( 'name' ); ?></a></h1>
         <h2 class="sub-title"><?php bloginfo( 'description' ); ?></h2>
      </hgroup>
      <nav id="main-menu">
         <ul>
            <li id="home-item" class="main-menu-item current"><a href="#home" class="main-menu-link">Sim</a></li>
            <li id="services-item" class="main-menu-item"><a href="#services" class="main-menu-link"><?php if($language == 'en-US'){echo 'Services';}else{echo 'Serviços';}?></a></li>
            <li id="about-item" class="main-menu-item"><a href="#about" class="main-menu-link"><?php if($language == 'en-US'){echo 'About';}else{echo 'Sobre';}?></a></li>
            <li id="why-item" class="main-menu-item"><a href="#why" class="main-menu-link"><?php if($language == 'en-US'){echo 'Why Sim?';}else{echo 'Por que a Sim?';}?></a></li>
            <li id="orcamento-item" class="main-menu-item"><a href="#contact" data-form="orcamento" class="main-menu-link contact-menu-link"><?php if($language == 'en-US'){echo 'Price Estimate';}else{echo 'Orçamento';}?></a></li>
            <li id="contact-item" class="main-menu-item"><a href="#contact" data-form="contact" class="main-menu-link contact-menu-link"><?php if($language == 'en-US'){echo 'Contact Us';}else{echo 'Contato';}?></a></li>
            <li id="join-item" class="main-menu-item"><a href="#contact" data-form="join" class="main-menu-link contact-menu-link"><?php if($language == 'en-US'){echo 'Join us';}else{echo 'Trabalhe conosco';}?></a></li>
            <li class="main-menu-item"><a href="#home" class="top-link">Top<?php if($language != 'en-US'){echo 'o';}?></a></li>
         </ul>
      </nav>
   </header>
   <div id="main">