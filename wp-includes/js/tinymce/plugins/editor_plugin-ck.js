(function(){tinymce.create("tinymce.plugins.wpLink",{init:function(a,b){var c=!0;a.addCommand("WP_Link",function(){if(c)return;a.windowManager.open({id:"wp-link",width:480,height:"auto",wpDialog:!0,title:a.getLang("advlink.link_desc")},{plugin_url:b})});a.addButton("link",{title:a.getLang("advanced.link_desc"),cmd:"WP_Link"});a.addShortcut("alt+shift+a",a.getLang("advanced.link_desc"),"WP_Link");a.onNodeChange.add(function(a,b,d,e){c=e&&d.nodeName!="A"})},getInfo:function(){return{longname:"WordPress Link Dialog",author:"WordPress",authorurl:"http://wordpress.org",infourl:"",version:"1.0"}}});tinymce.PluginManager.add("wplink",tinymce.plugins.wpLink)})();