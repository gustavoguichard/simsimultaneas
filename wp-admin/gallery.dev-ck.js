jQuery(document).ready(function(a){var b,c,d,e=!1;c=function(){b=a("#media-items").sortable({items:"div.media-item",placeholder:"sorthelper",axis:"y",distance:2,handle:"div.filename",stop:function(b,c){var d=a("#media-items").sortable("toArray"),f=d.length;a.each(d,function(b,c){var d=e?f-b:1+b;a("#"+c+" .menu_order input").val(d)})}})};sortIt=function(){var b=a(".menu_order_input"),c=b.length;b.each(function(b){var d=e?c-b:1+b;a(this).val(d)})};clearAll=function(b){b=b||0;a(".menu_order_input").each(function(){if(this.value=="0"||b)this.value=""})};a("#asc").click(function(){e=!1;sortIt();return!1});a("#desc").click(function(){e=!0;sortIt();return!1});a("#clear").click(function(){clearAll(1);return!1});a("#showall").click(function(){a("#sort-buttons span a").toggle();a("a.describe-toggle-on").hide();a("a.describe-toggle-off, table.slidetoggle").show();a("img.pinkynail").toggle(!1);return!1});a("#hideall").click(function(){a("#sort-buttons span a").toggle();a("a.describe-toggle-on").show();a("a.describe-toggle-off, table.slidetoggle").hide();a("img.pinkynail").toggle(!0);return!1});c();clearAll();if(a("#media-items>*").length>1){d=wpgallery.getWin();a("#save-all, #gallery-settings").show();if(typeof d.tinyMCE!="undefined"&&d.tinyMCE.activeEditor&&!d.tinyMCE.activeEditor.isHidden()){wpgallery.mcemode=!0;wpgallery.init()}else a("#insert-gallery").show()}});jQuery(window).unload(function(){tinymce=tinyMCE=wpgallery=null});var tinymce=null,tinyMCE,wpgallery;wpgallery={mcemode:!1,editor:{},dom:{},is_update:!1,el:{},I:function(a){return document.getElementById(a)},init:function(){var a=this,b,c,d,e,f=a.getWin();if(!a.mcemode)return;b=(""+document.location.search).replace(/^\?/,"").split("&");c={};for(d=0;d<b.length;d++){e=b[d].split("=");c[unescape(e[0])]=unescape(e[1])}c.mce_rdomain&&(document.domain=c.mce_rdomain);tinymce=f.tinymce;tinyMCE=f.tinyMCE;a.editor=tinymce.EditorManager.activeEditor;a.setup()},getWin:function(){return window.dialogArguments||opener||parent||top},setup:function(){var a=this,b,c=a.editor,d,e,f,g,h;if(!a.mcemode)return;a.el=c.selection.getNode();if(a.el.nodeName!="IMG"||!c.dom.hasClass(a.el,"wpGallery")){if(!(d=c.dom.select("img.wpGallery"))||!d[0]){getUserSetting("galfile")=="1"&&(a.I("linkto-file").checked="checked");getUserSetting("galdesc")=="1"&&(a.I("order-desc").checked="checked");getUserSetting("galcols")&&(a.I("columns").value=getUserSetting("galcols"));getUserSetting("galord")&&(a.I("orderby").value=getUserSetting("galord"));jQuery("#insert-gallery").show();return}a.el=d[0]}b=c.dom.getAttrib(a.el,"title");b=c.dom.decode(b);if(b){jQuery("#update-gallery").show();a.is_update=!0;e=b.match(/columns=['"]([0-9]+)['"]/);f=b.match(/link=['"]([^'"]+)['"]/i);g=b.match(/order=['"]([^'"]+)['"]/i);h=b.match(/orderby=['"]([^'"]+)['"]/i);f&&f[1]&&(a.I("linkto-file").checked="checked");g&&g[1]&&(a.I("order-desc").checked="checked");e&&e[1]&&(a.I("columns").value=""+e[1]);h&&h[1]&&(a.I("orderby").value=h[1])}else jQuery("#insert-gallery").show()},update:function(){var a=this,b=a.editor,c="",d;if(!a.mcemode||!a.is_update){d="[gallery"+a.getSettings()+"]";a.getWin().send_to_editor(d);return}if(a.el.nodeName!="IMG")return;c=b.dom.decode(b.dom.getAttrib(a.el,"title"));c=c.replace(/\s*(order|link|columns|orderby)=['"]([^'"]+)['"]/gi,"");c+=a.getSettings();b.dom.setAttrib(a.el,"title",c);a.getWin().tb_remove()},getSettings:function(){var a=this.I,b="";if(a("linkto-file").checked){b+=' link="file"';setUserSetting("galfile","1")}if(a("order-desc").checked){b+=' order="DESC"';setUserSetting("galdesc","1")}if(a("columns").value!=3){b+=' columns="'+a("columns").value+'"';setUserSetting("galcols",a("columns").value)}if(a("orderby").value!="menu_order"){b+=' orderby="'+a("orderby").value+'"';setUserSetting("galord",a("orderby").value)}return b}};