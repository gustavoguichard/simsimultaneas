var switchEditors={switchto:function(a){var b=a.id,c=b.length,d=b.substr(0,c-5),e=b.substr(c-4);this.go(d,e)},go:function(a,b){a=a||"content";b=b||"toggle";var c=this,d=tinyMCE.get(a),e,f,g=tinymce.DOM;e="wp-"+a+"-wrap";f=g.get(a);"toggle"==b&&(d&&!d.isHidden()?b="html":b="tmce");if("tmce"==b||"tinymce"==b){if(d&&!d.isHidden())return!1;typeof QTags!="undefined"&&QTags.closeAllTags(a);tinyMCEPreInit.mceInit[a]&&tinyMCEPreInit.mceInit[a].wpautop&&(f.value=c.wpautop(f.value));if(d)d.show();else{d=new tinymce.Editor(a,tinyMCEPreInit.mceInit[a]);d.render()}g.removeClass(e,"html-active");g.addClass(e,"tmce-active");setUserSetting("editor","tinymce")}else if("html"==b){if(d&&d.isHidden())return!1;if(d){f.style.height=d.getContentAreaContainer().offsetHeight+20+"px";d.hide()}g.removeClass(e,"tmce-active");g.addClass(e,"html-active");setUserSetting("editor","html")}return!1},_wp_Nop:function(a){var b,c,d=!1,e=!1;if(a.indexOf("<pre")!=-1||a.indexOf("<script")!=-1){d=!0;a=a.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g,function(a){a=a.replace(/<br ?\/?>(\r\n|\n)?/g,"<wp-temp-lb>");return a.replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g,"<wp-temp-lb>")})}if(a.indexOf("[caption")!=-1){e=!0;a=a.replace(/\[caption[\s\S]+?\[\/caption\]/g,function(a){return a.replace(/<br([^>]*)>/g,"<wp-temp-br$1>").replace(/[\r\n\t]+/,"")})}b="blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|div|h[1-6]|p|fieldset";a=a.replace(new RegExp("\\s*</("+b+")>\\s*","g"),"</$1>\n");a=a.replace(new RegExp("\\s*<((?:"+b+")(?: [^>]*)?)>","g"),"\n<$1>");a=a.replace(/(<p [^>]+>.*?)<\/p>/g,"$1</p#>");a=a.replace(/<div( [^>]*)?>\s*<p>/gi,"<div$1>\n\n");a=a.replace(/\s*<p>/gi,"");a=a.replace(/\s*<\/p>\s*/gi,"\n\n");a=a.replace(/\n[\s\u00a0]+\n/g,"\n\n");a=a.replace(/\s*<br ?\/?>\s*/gi,"\n");a=a.replace(/\s*<div/g,"\n<div");a=a.replace(/<\/div>\s*/g,"</div>\n");a=a.replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi,"\n\n[caption$1[/caption]\n\n");a=a.replace(/caption\]\n\n+\[caption/g,"caption]\n\n[caption");c="blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|h[1-6]|pre|fieldset";a=a.replace(new RegExp("\\s*<((?:"+c+")(?: [^>]*)?)\\s*>","g"),"\n<$1>");a=a.replace(new RegExp("\\s*</("+c+")>\\s*","g"),"</$1>\n");a=a.replace(/<li([^>]*)>/g,"	<li$1>");a.indexOf("<hr")!=-1&&(a=a.replace(/\s*<hr( [^>]*)?>\s*/g,"\n\n<hr$1>\n\n"));a.indexOf("<object")!=-1&&(a=a.replace(/<object[\s\S]+?<\/object>/g,function(a){return a.replace(/[\r\n]+/g,"")}));a=a.replace(/<\/p#>/g,"</p>\n");a=a.replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g,"\n$1");a=a.replace(/^\s+/,"");a=a.replace(/[\s\u00a0]+$/,"");d&&(a=a.replace(/<wp-temp-lb>/g,"\n"));e&&(a=a.replace(/<wp-temp-br([^>]*)>/g,"<br$1>"));return a},_wp_Autop:function(a){var b=!1,c=!1,d="table|thead|tfoot|tbody|tr|td|th|caption|col|colgroup|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|p|h[1-6]|fieldset|legend|hr|noscript|menu|samp|header|footer|article|section|hgroup|nav|aside|details|summary";a.indexOf("<object")!=-1&&(a=a.replace(/<object[\s\S]+?<\/object>/g,function(a){return a.replace(/[\r\n]+/g,"")}));a=a.replace(/<[^<>]+>/g,function(a){return a.replace(/[\r\n]+/g," ")});if(a.indexOf("<pre")!=-1||a.indexOf("<script")!=-1){b=!0;a=a.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g,function(a){return a.replace(/(\r\n|\n)/g,"<wp-temp-lb>")})}if(a.indexOf("[caption")!=-1){c=!0;a=a.replace(/\[caption[\s\S]+?\[\/caption\]/g,function(a){a=a.replace(/<br([^>]*)>/g,"<wp-temp-br$1>");a=a.replace(/<[a-zA-Z0-9]+( [^<>]+)?>/g,function(a){return a.replace(/[\r\n\t]+/," ")});return a.replace(/\s*\n\s*/g,"<wp-temp-br />")})}a+="\n\n";a=a.replace(/<br \/>\s*<br \/>/gi,"\n\n");a=a.replace(new RegExp("(<(?:"+d+")(?: [^>]*)?>)","gi"),"\n$1");a=a.replace(new RegExp("(</(?:"+d+")>)","gi"),"$1\n\n");a=a.replace(/<hr( [^>]*)?>/gi,"<hr$1>\n\n");a=a.replace(/\r\n|\r/g,"\n");a=a.replace(/\n\s*\n+/g,"\n\n");a=a.replace(/([\s\S]+?)\n\n/g,"<p>$1</p>\n");a=a.replace(/<p>\s*?<\/p>/gi,"");a=a.replace(new RegExp("<p>\\s*(</?(?:"+d+")(?: [^>]*)?>)\\s*</p>","gi"),"$1");a=a.replace(/<p>(<li.+?)<\/p>/gi,"$1");a=a.replace(/<p>\s*<blockquote([^>]*)>/gi,"<blockquote$1><p>");a=a.replace(/<\/blockquote>\s*<\/p>/gi,"</p></blockquote>");a=a.replace(new RegExp("<p>\\s*(</?(?:"+d+")(?: [^>]*)?>)","gi"),"$1");a=a.replace(new RegExp("(</?(?:"+d+")(?: [^>]*)?>)\\s*</p>","gi"),"$1");a=a.replace(/\s*\n/gi,"<br />\n");a=a.replace(new RegExp("(</?(?:"+d+")[^>]*>)\\s*<br />","gi"),"$1");a=a.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi,"$1");a=a.replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi,"[caption$1[/caption]");a=a.replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g,function(a,b,c){return c.match(/<p( [^>]*)?>/)?a:b+"<p>"+c+"</p>"});b&&(a=a.replace(/<wp-temp-lb>/g,"\n"));c&&(a=a.replace(/<wp-temp-br([^>]*)>/g,"<br$1>"));return a},pre_wpautop:function(a){var b=this,c={o:b,data:a,unfiltered:a},d=typeof jQuery!="undefined";d&&jQuery("body").trigger("beforePreWpautop",[c]);c.data=b._wp_Nop(c.data);d&&jQuery("body").trigger("afterPreWpautop",[c]);return c.data},wpautop:function(a){var b=this,c={o:b,data:a,unfiltered:a},d=typeof jQuery!="undefined";d&&jQuery("body").trigger("beforeWpautop",[c]);c.data=b._wp_Autop(c.data);d&&jQuery("body").trigger("afterWpautop",[c]);return c.data}};