var tb_position;jQuery(document).ready(function(a){tb_position=function(){var b=a("#TB_window"),c=a(window).width(),d=a(window).height(),e=720<c?720:c,f=0;a("body.admin-bar").length&&(f=28);if(b.size()){b.width(e-50).height(d-45-f);a("#TB_iframeContent").width(e-50).height(d-75-f);b.css({"margin-left":"-"+parseInt((e-50)/2,10)+"px"});typeof document.body.style.maxWidth!="undefined"&&b.css({top:20+f+"px","margin-top":"0"})}return a("a.thickbox").each(function(){var b=a(this).attr("href");if(!b)return;b=b.replace(/&width=[0-9]+/g,"");b=b.replace(/&height=[0-9]+/g,"");a(this).attr("href",b+"&width="+(e-80)+"&height="+(d-85-f))})};a(window).resize(function(){tb_position()});a("#dashboard_plugins a.thickbox, .plugins a.thickbox").click(function(){tb_click.call(this);a("#TB_title").css({"background-color":"#222",color:"#cfcfcf"});a("#TB_ajaxWindowTitle").html("<strong>"+plugininstallL10n.plugin_information+"</strong>&nbsp;"+a(this).attr("title"));return!1});a("#plugin-information #sidemenu a").click(function(){var b=a(this).attr("name");a("#plugin-information-header a.current").removeClass("current");a(this).addClass("current");a("#section-holder div.section").hide();a("#section-"+b).show();return!1});a("a.install-now").click(function(){return confirm(plugininstallL10n.ays)})});