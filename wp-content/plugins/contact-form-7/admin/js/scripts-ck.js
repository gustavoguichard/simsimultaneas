(function(e){function t(){var t=e("input#wpcf7-title").val();t&&(t=t.replace(/["'\[\]]/g,""));e("input#wpcf7-title").val(t);var n=e("input#post_ID").val(),r='[contact-form-7 id="'+n+'" title="'+t+'"]';e("input#contact-form-anchor-text").val(r);var i=e("input#wpcf7-id").val();if(0!=i){var s="[contact-form "+i+' "'+t+'"]';e("input#contact-form-anchor-text-old").val(s).parent("p.tagcode").show()}}e(function(){try{e("div.cf7com-links").insertAfter(e("div.wrap h2:first"));e.extend(e.tgPanes,_wpcf7.tagGenerators);e("#taggenerator").tagGenerator(_wpcf7.generateTag,{dropdownIconUrl:_wpcf7.pluginUrl+"/admin/images/dropdown.gif"});e("input#wpcf7-title:disabled").css({cursor:"default"});e("input#wpcf7-title").mouseover(function(){e(this).not(".focus").addClass("mouseover")});e("input#wpcf7-title").mouseout(function(){e(this).removeClass("mouseover")});e("input#wpcf7-title").focus(function(){e(this).addClass("focus").removeClass("mouseover")});e("input#wpcf7-title").blur(function(){e(this).removeClass("focus")});e("input#wpcf7-title").change(function(){t()});t();e(".check-if-these-fields-are-active").each(function(t){e(this).is(":checked")||e(this).parent().siblings(".mail-fields").hide();e(this).click(function(){e(this).parent().siblings(".mail-fields").is(":hidden")&&e(this).is(":checked")?e(this).parent().siblings(".mail-fields").slideDown("fast"):e(this).parent().siblings(".mail-fields").is(":visible")&&e(this).not(":checked")&&e(this).parent().siblings(".mail-fields").slideUp("fast")})});postboxes.add_postbox_toggles(_wpcf7.screenId)}catch(n){}})})(jQuery);