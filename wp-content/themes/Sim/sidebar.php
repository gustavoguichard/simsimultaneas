	<nav class="arrows">
		<?php
		$href_prev = esc_url( home_url( '/' ) );
		$href_next = get_permalink_by_name('contato');
		$order = $wp_query->post->menu_order;
		if(is_single()){
			if(get_post_type() == 'post'){
				$next_case = get_case_by_title(get_the_title());
				if($next_case){
					$href_next = get_permalink($next_case->ID);
				} else {
					$next_post = get_next_post();
					if($next_post){$href_next = get_permalink($next_post);}
				}
				$prev_post = get_previous_post();
				if($prev_post && $order > 0){$href_prev = get_permalink($prev_post);}
			} else {
				$related_post = get_post_by_title(get_the_title());
				$href_prev = get_permalink($related_post);
				global $post;
				$post = get_post($related_post);
				$next_post = get_next_post();
				if($next_post){$href_next = get_permalink($next_post);}
			}
		} else {
			$prev_page = get_post_meta($post->ID, 'prev_page', true);
			$next_page = get_post_meta($post->ID, 'next_page', true);
			if($next_page){$href_next = $next_page;}
			if($prev_page){$href_prev = $prev_page;}
		}?>
		<a href="<?php echo $href_prev; ?>" class="prev">&lt;</a>
		<a href="<?php echo $href_next;?>" class="next">&gt;</a>
	</nav>