function WPSetAsThumbnail(a,b){var c=jQuery("a#wp-post-thumbnail-"+a);c.text(setPostThumbnailL10n.saving);jQuery.post(ajaxurl,{action:"set-post-thumbnail",post_id:post_id,thumbnail_id:a,_ajax_nonce:b,cookie:encodeURIComponent(document.cookie)},function(b){var d=window.dialogArguments||opener||parent||top;c.text(setPostThumbnailL10n.setThumbnail);if(b=="0")alert(setPostThumbnailL10n.error);else{jQuery("a.wp-post-thumbnail").show();c.text(setPostThumbnailL10n.done);c.fadeOut(2e3);d.WPSetThumbnailID(a);d.WPSetThumbnailHTML(b)}})};