// Uncomment and change this document.domain value if you are loading the script cross subdomains
// document.domain = 'moxiecode.com';
var tinymce=null,tinyMCEPopup,tinyMCE;tinyMCEPopup={init:function(){var a=this,b,c;b=a.getWin();tinymce=b.tinymce;tinyMCE=b.tinyMCE;a.editor=tinymce.EditorManager.activeEditor;a.params=a.editor.windowManager.params;a.features=a.editor.windowManager.features;a.dom=a.editor.windowManager.createInstance("tinymce.dom.DOMUtils",document);a.features.popup_css!==!1&&a.dom.loadCSS(a.features.popup_css||a.editor.settings.popup_css);a.listeners=[];a.onInit={add:function(b,c){a.listeners.push({func:b,scope:c})}};a.isWindow=!a.getWindowArg("mce_inline");a.id=a.getWindowArg("mce_window_id");a.editor.windowManager.onOpen.dispatch(a.editor.windowManager,window)},getWin:function(){return!window.frameElement&&window.dialogArguments||opener||parent||top},getWindowArg:function(a,b){var c=this.params[a];return tinymce.is(c)?c:b},getParam:function(a,b){return this.editor.getParam(a,b)},getLang:function(a,b){return this.editor.getLang(a,b)},execCommand:function(a,b,c,d){d=d||{};d.skip_focus=1;this.restoreSelection();return this.editor.execCommand(a,b,c,d)},resizeToInnerSize:function(){var a=this;setTimeout(function(){var b=a.dom.getViewPort(window);a.editor.windowManager.resizeBy(a.getWindowArg("mce_width")-b.w,a.getWindowArg("mce_height")-b.h,a.id||window)},10)},executeOnLoad:function(s){this.onInit.add(function(){eval(s)})},storeSelection:function(){this.editor.windowManager.bookmark=tinyMCEPopup.editor.selection.getBookmark(1)},restoreSelection:function(){var a=tinyMCEPopup;!a.isWindow&&tinymce.isIE&&a.editor.selection.moveToBookmark(a.editor.windowManager.bookmark)},requireLangPack:function(){var a=this,b=a.getWindowArg("plugin_url")||a.getWindowArg("theme_url");if(b&&a.editor.settings.language&&a.features.translate_i18n!==!1&&a.editor.settings.language_load!==!1){b+="/langs/"+a.editor.settings.language+"_dlg.js";if(!tinymce.ScriptLoader.isDone(b)){document.write('<script type="text/javascript" src="'+tinymce._addVer(b)+'"></script>');tinymce.ScriptLoader.markDone(b)}}},pickColor:function(a,b){this.execCommand("mceColorPicker",!0,{color:document.getElementById(b).value,func:function(a){document.getElementById(b).value=a;try{document.getElementById(b).onchange()}catch(c){}}})},openBrowser:function(a,b,c){tinyMCEPopup.restoreSelection();this.editor.execCallback("file_browser_callback",a,document.getElementById(a).value,b,window)},confirm:function(a,b,c){this.editor.windowManager.confirm(a,b,c,window)},alert:function(a,b,c){this.editor.windowManager.alert(a,b,c,window)},close:function(){function b(){a.editor.windowManager.close(window);tinymce=tinyMCE=a.editor=a.params=a.dom=a.dom.doc=null}var a=this;tinymce.isOpera?a.getWin().setTimeout(b,0):b()},_restoreSelection:function(){var a=window.event.srcElement;a.nodeName=="INPUT"&&(a.type=="submit"||a.type=="button")&&tinyMCEPopup.restoreSelection()},_onDOMLoaded:function(){var a=tinyMCEPopup,b=document.title,c,d,e;if(a.domLoaded)return;a.domLoaded=1;if(a.features.translate_i18n!==!1){d=document.body.innerHTML;tinymce.isIE&&(d=d.replace(/ (value|title|alt)=([^"][^\s>]+)/gi,' $1="$2"'));document.dir=a.editor.getParam("directionality","");(e=a.editor.translate(d))&&e!=d&&(document.body.innerHTML=e);(e=a.editor.translate(b))&&e!=b&&(document.title=b=e)}(!a.editor.getParam("browser_preferred_colors",!1)||!a.isWindow)&&a.dom.addClass(document.body,"forceColors");document.body.style.display="";if(tinymce.isIE){document.attachEvent("onmouseup",tinyMCEPopup._restoreSelection);a.dom.add(a.dom.select("head")[0],"base",{target:"_self"})}a.restoreSelection();a.resizeToInnerSize();a.isWindow?window.focus():a.editor.windowManager.setTitle(window,b);!tinymce.isIE&&!a.isWindow&&tinymce.dom.Event._add(document,"focus",function(){a.editor.windowManager.focus(a.id)});tinymce.each(a.dom.select("select"),function(a){a.onkeydown=tinyMCEPopup._accessHandler});tinymce.each(a.listeners,function(b){b.func.call(b.scope,a.editor)});if(a.getWindowArg("mce_auto_focus",!0)){window.focus();tinymce.each(document.forms,function(b){tinymce.each(b.elements,function(b){if(a.dom.hasClass(b,"mceFocus")&&!b.disabled){b.focus();return!1}})})}document.onkeyup=tinyMCEPopup._closeWinKeyHandler},_accessHandler:function(a){a=a||window.event;if(a.keyCode==13||a.keyCode==32){a=a.target||a.srcElement;a.onchange&&a.onchange();return tinymce.dom.Event.cancel(a)}},_closeWinKeyHandler:function(a){a=a||window.event;a.keyCode==27&&tinyMCEPopup.close()},_wait:function(){if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);tinyMCEPopup._onDOMLoaded()}});document.documentElement.doScroll&&window==window.top&&function(){if(tinyMCEPopup.domLoaded)return;try{document.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}tinyMCEPopup._onDOMLoaded()}();document.attachEvent("onload",tinyMCEPopup._onDOMLoaded)}else if(document.addEventListener){window.addEventListener("DOMContentLoaded",tinyMCEPopup._onDOMLoaded,!1);window.addEventListener("load",tinyMCEPopup._onDOMLoaded,!1)}}};tinyMCEPopup.init();tinyMCEPopup._wait();