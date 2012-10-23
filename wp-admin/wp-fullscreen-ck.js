var PubSub,fullscreen,wptitlehint;PubSub=function(){this.topics={}};PubSub.prototype.subscribe=function(a,b){this.topics[a]||(this.topics[a]=[]);this.topics[a].push(b);return b};PubSub.prototype.unsubscribe=function(a,b){var c,d,e=this.topics[a];if(!e)return b||[];if(b){for(c=0,d=e.length;c<d;c++)b==e[c]&&e.splice(c,1);return b}this.topics[a]=[];return e};PubSub.prototype.publish=function(a,b){var c,d,e,f=this.topics[a];if(!f)return;b=b||[];for(c=0,d=f.length;c<d;c++)e=f[c].apply(null,b)===!1||e;return!e};(function(a){var b,c,d,e;fullscreen=b={};c=b.pubsub=new PubSub;timer=0;block=!1;e=b.settings={visible:!1,mode:"tinymce",editor_id:"content",title_id:"",timer:0,toolbar_shown:!1};d=b.bounder=function(b,d,f,g){function j(){c.publish(d);e.timer=0}var h,i;f=f||1250;if(g){h=g.pageY||g.clientY||g.offsetY;i=a(document).scrollTop();g.isDefaultPrevented||(h=135+h);if(h-i>120)return}if(block)return;block=!0;setTimeout(function(){block=!1},400);e.timer?clearTimeout(e.timer):c.publish(b);e.timer=setTimeout(j,f)};b.on=function(){if(e.visible)return;typeof wp_fullscreen_settings=="object"&&a.extend(e,wp_fullscreen_settings);e.editor_id=wpActiveEditor||"content";a("input#title").length&&e.editor_id=="content"?e.title_id="title":a("input#"+e.editor_id+"-title").length?e.title_id=e.editor_id+"-title":a("#wp-fullscreen-title, #wp-fullscreen-title-prompt-text").hide();e.mode=a("#"+e.editor_id).is(":hidden")?"tinymce":"html";e.qt_canvas=a("#"+e.editor_id).get(0);e.element||b.ui.init();e.is_mce_on=e.has_tinymce&&typeof tinyMCE.get(e.editor_id)!="undefined";b.ui.fade("show","showing","shown")};b.off=function(){if(!e.visible)return;b.ui.fade("hide","hiding","hidden")};b.switchmode=function(a){var b=e.mode;if(!a||!e.visible||!e.has_tinymce)return b;if(b==a)return b;c.publish("switchMode",[b,a]);e.mode=a;c.publish("switchedMode",[b,a]);return a};b.save=function(){var c=a("#hiddenaction"),d=c.val(),e=a("#wp-fullscreen-save img"),f=a("#wp-fullscreen-save span");e.show();b.savecontent();c.val("wp-fullscreen-save-post");a.post(ajaxurl,a("form#post").serialize(),function(b){e.hide();f.show();setTimeout(function(){f.fadeOut(1e3)},3e3);b.last_edited&&a("#wp-fullscreen-save input").attr("title",b.last_edited)},"json");c.val(d)};b.savecontent=function(){var b,c;e.title_id&&a("#"+e.title_id).val(a("#wp-fullscreen-title").val());e.mode==="tinymce"&&(b=tinyMCE.get("wp_mce_fullscreen"))?c=b.save():c=a("#wp_mce_fullscreen").val();a("#"+e.editor_id).val(c);a(document).triggerHandler("wpcountwords",[c])};set_title_hint=function(a){a.val().length?a.siblings("label").css("visibility","hidden"):a.siblings("label").css("visibility","")};b.dfw_width=function(b){var c=a("#wp-fullscreen-wrap"),d=c.width();if(!b){c.width(a("#wp-fullscreen-central-toolbar").width());deleteUserSetting("dfw_width");return}d=b+d;if(d<200||d>1200)return;c.width(d);setUserSetting("dfw_width",d)};c.subscribe("showToolbar",function(){e.toolbars.removeClass("fade-1000").addClass("fade-300");b.fade.In(e.toolbars,300,function(){c.publish("toolbarShown")},!0);a("#wp-fullscreen-body").addClass("wp-fullscreen-focus");e.toolbar_shown=!0});c.subscribe("hideToolbar",function(){e.toolbars.removeClass("fade-300").addClass("fade-1000");b.fade.Out(e.toolbars,1e3,function(){c.publish("toolbarHidden")},!0);a("#wp-fullscreen-body").removeClass("wp-fullscreen-focus")});c.subscribe("toolbarShown",function(){e.toolbars.removeClass("fade-300")});c.subscribe("toolbarHidden",function(){e.toolbars.removeClass("fade-1000");e.toolbar_shown=!1});c.subscribe("show",function(){var b;if(e.title_id){b=a("#wp-fullscreen-title").val(a("#"+e.title_id).val());set_title_hint(b)}a("#wp-fullscreen-save input").attr("title",a("#last-edit").text());e.textarea_obj.value=e.qt_canvas.value;e.has_tinymce&&e.mode==="tinymce"&&tinyMCE.execCommand("wpFullScreenInit");e.orig_y=a(window).scrollTop()});c.subscribe("showing",function(){a(document.body).addClass("fullscreen-active");b.refresh_buttons();a(document).bind("mousemove.fullscreen",function(a){d("showToolbar","hideToolbar",2e3,a)});d("showToolbar","hideToolbar",2e3);b.bind_resize();setTimeout(b.resize_textarea,200);scrollTo(0,0);a("#wpadminbar").hide()});c.subscribe("shown",function(){var a;e.visible=!0;if(e.has_tinymce&&!e.is_mce_on){a=function(b,c){var d=c.getElement(),g=d.value,h=tinyMCEPreInit.mceInit[e.editor_id];h&&h.wpautop&&typeof switchEditors!="undefined"&&(d.value=switchEditors.wpautop(d.value));c.onInit.add(function(b){b.hide();b.getElement().value=g;tinymce.onAddEditor.remove(a)})};tinymce.onAddEditor.add(a);tinyMCE.init(tinyMCEPreInit.mceInit[e.editor_id]);e.is_mce_on=!0}wpActiveEditor="wp_mce_fullscreen"});c.subscribe("hide",function(){var c=a("#"+e.editor_id).is(":hidden");e.has_tinymce&&e.mode==="tinymce"&&!c?switchEditors.go(e.editor_id,"tmce"):e.mode==="html"&&c&&switchEditors.go(e.editor_id,"html");b.savecontent();a(document).unbind(".fullscreen");a(e.textarea_obj).unbind(".grow");e.has_tinymce&&e.mode==="tinymce"&&tinyMCE.execCommand("wpFullScreenSave");e.title_id&&set_title_hint(a("#"+e.title_id));e.qt_canvas.value=e.textarea_obj.value});c.subscribe("hiding",function(){a(document.body).removeClass("fullscreen-active");scrollTo(0,e.orig_y);a("#wpadminbar").show()});c.subscribe("hidden",function(){e.visible=!1;a("#wp_mce_fullscreen, #wp-fullscreen-title").removeAttr("style");e.has_tinymce&&e.is_mce_on&&tinyMCE.execCommand("wpFullScreenClose");e.textarea_obj.value="";b.oldheight=0;wpActiveEditor=e.editor_id});c.subscribe("switchMode",function(a,b){var c;if(!e.has_tinymce||!e.is_mce_on)return;c=tinyMCE.get("wp_mce_fullscreen");if(a==="html"&&b==="tinymce"){tinyMCE.get(e.editor_id).getParam("wpautop")&&typeof switchEditors!="undefined"&&(e.textarea_obj.value=switchEditors.wpautop(e.textarea_obj.value));"undefined"==typeof c?tinyMCE.execCommand("wpFullScreenInit"):c.show()}else a==="tinymce"&&b==="html"&&c&&c.hide()});c.subscribe("switchedMode",function(a,c){b.refresh_buttons(!0);c==="html"&&setTimeout(b.resize_textarea,200)});b.b=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("Bold")};b.i=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("Italic")};b.ul=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("InsertUnorderedList")};b.ol=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("InsertOrderedList")};b.link=function(){e.has_tinymce&&"tinymce"===e.mode?tinyMCE.execCommand("WP_Link"):wpLink.open()};b.unlink=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("unlink")};b.atd=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("mceWritingImprovementTool")};b.help=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("WP_Help")};b.blockquote=function(){e.has_tinymce&&"tinymce"===e.mode&&tinyMCE.execCommand("mceBlockQuote")};b.medialib=function(){if(e.has_tinymce&&"tinymce"===e.mode)tinyMCE.execCommand("WP_Medialib");else{var b=a("#wp-"+e.editor_id+"-media-buttons a.thickbox").attr("href")||"";b&&tb_show("",b)}};b.refresh_buttons=function(b){b=b||!1;if(e.mode==="html"){a("#wp-fullscreen-mode-bar").removeClass("wp-tmce-mode").addClass("wp-html-mode");b?a("#wp-fullscreen-button-bar").fadeOut(150,function(){a(this).addClass("wp-html-mode").fadeIn(150)}):a("#wp-fullscreen-button-bar").addClass("wp-html-mode")}else if(e.mode==="tinymce"){a("#wp-fullscreen-mode-bar").removeClass("wp-html-mode").addClass("wp-tmce-mode");b?a("#wp-fullscreen-button-bar").fadeOut(150,function(){a(this).removeClass("wp-html-mode").fadeIn(150)}):a("#wp-fullscreen-button-bar").removeClass("wp-html-mode")}};b.ui={init:function(){var c=a("#fullscreen-topbar"),f=a("#wp_mce_fullscreen"),g=0;e.toolbars=c.add(a("#wp-fullscreen-status"));e.element=a("#fullscreen-fader");e.textarea_obj=f[0];e.has_tinymce=typeof tinymce!="undefined";e.has_tinymce||a("#wp-fullscreen-mode-bar").hide();wptitlehint&&a("#wp-fullscreen-title").length&&wptitlehint("wp-fullscreen-title");a(document).keyup(function(c){var d=c.keyCode||c.charCode,e,f;if(!fullscreen.settings.visible)return!0;navigator.platform&&navigator.platform.indexOf("Mac")!=-1?e=c.ctrlKey:e=c.altKey;if(27==d){f={event:c,what:"dfw",cb:fullscreen.off,condition:function(){return a("#TB_window").is(":visible")||a(".wp-dialog").is(":visible")?!1:!0}};jQuery(document).triggerHandler("wp_CloseOnEscape",[f])||fullscreen.off()}e&&(61==d||107==d||187==d)&&b.dfw_width(25);e&&(45==d||109==d||189==d)&&b.dfw_width(-25);e&&48==d&&b.dfw_width(0);return!1});typeof wpWordCount!="undefined"&&f.keyup(function(b){var c=b.keyCode||b.charCode;if(c==g)return!0;(13==c||8==g||46==g)&&a(document).triggerHandler("wpcountwords",[f.val()]);g=c;return!0});c.mouseenter(function(b){e.toolbars.addClass("fullscreen-make-sticky");a(document).unbind(".fullscreen");clearTimeout(e.timer);e.timer=0}).mouseleave(function(b){e.toolbars.removeClass("fullscreen-make-sticky");e.visible&&a(document).bind("mousemove.fullscreen",function(a){d("showToolbar","hideToolbar",2e3,a)})})},fade:function(a,d,f){e.element||b.ui.init();if(a&&!c.publish(a))return;b.fade.In(e.element,600,function(){d&&c.publish(d);b.fade.Out(e.element,600,function(){f&&c.publish(f)})})}};b.fade={transitionend:"transitionend webkitTransitionEnd oTransitionEnd",sensitivity:100,In:function(c,d,e,f){e=e||a.noop;d=d||400;f=f||!1;if(b.fade.transitions){if(c.is(":visible")){c.addClass("fade-trigger");return c}c.show();c.first().one(this.transitionend,function(){e()});setTimeout(function(){c.addClass("fade-trigger")},this.sensitivity)}else{f&&c.stop();c.css("opacity",1);c.first().fadeIn(d,e);c.length>1&&c.not(":first").fadeIn(d)}return c},Out:function(c,d,e,f){e=e||a.noop;d=d||400;f=f||!1;if(!c.is(":visible"))return c;if(b.fade.transitions){c.first().one(b.fade.transitionend,function(){if(c.hasClass("fade-trigger"))return;c.hide();e()});setTimeout(function(){c.removeClass("fade-trigger")},this.sensitivity)}else{f&&c.stop();c.first().fadeOut(d,e);c.length>1&&c.not(":first").fadeOut(d)}return c},transitions:function(){var a=document.documentElement.style;return typeof a.WebkitTransition=="string"||typeof a.MozTransition=="string"||typeof a.OTransition=="string"||typeof a.transition=="string"}()};b.bind_resize=function(){a(e.textarea_obj).bind("keypress.grow click.grow paste.grow",function(){setTimeout(b.resize_textarea,200)})};b.oldheight=0;b.resize_textarea=function(){var a=e.textarea_obj,c;c=a.scrollHeight>300?a.scrollHeight:300;if(c!=b.oldheight){a.style.height=c+"px";b.oldheight=c}}})(jQuery);