function saveContent(){tinyMCEPopup.editor.setContent(document.getElementById("htmlSource").value,{source_view:!0});tinyMCEPopup.close()}function onLoadInit(){tinyMCEPopup.resizeToInnerSize();tinymce.isGecko&&(document.body.spellcheck=tinyMCEPopup.editor.getParam("gecko_spellcheck"));document.getElementById("htmlSource").value=tinyMCEPopup.editor.getContent({source_view:!0});if(tinyMCEPopup.editor.getParam("theme_advanced_source_editor_wrap",!0)){setWrap("soft");document.getElementById("wraped").checked=!0}resizeInputs()}function setWrap(a){var b,c,d=document.getElementById("htmlSource");d.wrap=a;if(!tinymce.isIE){b=d.value;c=d.cloneNode(!1);c.setAttribute("wrap",a);d.parentNode.replaceChild(c,d);c.value=b}}function toggleWordWrap(a){a.checked?setWrap("soft"):setWrap("off")}function resizeInputs(){var a=tinyMCEPopup.dom.getViewPort(window),b;b=document.getElementById("htmlSource");if(b){b.style.width=a.w-20+"px";b.style.height=a.h-65+"px"}}tinyMCEPopup.requireLangPack();tinyMCEPopup.onInit.add(onLoadInit);