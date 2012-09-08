/**
 * WordPress Administration Navigation Menu
 * Interface JS functions
 *
 * @version 2.0.0
 *
 * @package WordPress
 * @subpackage Administration
 */var wpNavMenu;(function(a){var b=wpNavMenu={options:{menuItemDepthPerLevel:30,globalMaxDepth:11},menuList:undefined,targetList:undefined,menusChanged:!1,isRTL:"undefined"!=typeof isRtl&&!!isRtl,negateIfRTL:"undefined"!=typeof isRtl&&isRtl?-1:1,init:function(){b.menuList=a("#menu-to-edit");b.targetList=b.menuList;this.jQueryExtensions();this.attachMenuEditListeners();this.setupInputWithDefaultTitle();this.attachQuickSearchListeners();this.attachThemeLocationsListeners();this.attachTabsPanelListeners();this.attachUnsavedChangesListener();b.menuList.length&&this.initSortables();this.initToggles();this.initTabManager()},jQueryExtensions:function(){a.fn.extend({menuItemDepth:function(){var a=b.isRTL?this.eq(0).css("margin-right"):this.eq(0).css("margin-left");return b.pxToDepth(a&&-1!=a.indexOf("px")?a.slice(0,-2):0)},updateDepthClass:function(b,c){return this.each(function(){var d=a(this);c=c||d.menuItemDepth();a(this).removeClass("menu-item-depth-"+c).addClass("menu-item-depth-"+b)})},shiftDepthClass:function(b){return this.each(function(){var c=a(this),d=c.menuItemDepth();a(this).removeClass("menu-item-depth-"+d).addClass("menu-item-depth-"+(d+b))})},childMenuItems:function(){var b=a();this.each(function(){var c=a(this),d=c.menuItemDepth(),e=c.next();while(e.length&&e.menuItemDepth()>d){b=b.add(e);e=e.next()}});return b},updateParentMenuItemDBId:function(){return this.each(function(){var b=a(this),c=b.find(".menu-item-data-parent-id"),d=b.menuItemDepth(),e=b.prev();if(d==0)c.val(0);else{while(!e[0]||!e[0].className||-1==e[0].className.indexOf("menu-item")||e.menuItemDepth()!=d-1)e=e.prev();c.val(e.find(".menu-item-data-db-id").val())}})},hideAdvancedMenuItemFields:function(){return this.each(function(){var b=a(this);a(".hide-column-tog").not(":checked").each(function(){b.find(".field-"+a(this).val()).addClass("hidden-field")})})},addSelectedToMenu:function(c){return 0==a("#menu-to-edit").length?!1:this.each(function(){var d=a(this),e={},f=d.find(".tabs-panel-active .categorychecklist li input:checked"),g=new RegExp("menu-item\\[([^\\]]*)");c=c||b.addMenuItemToBottom;if(!f.length)return!1;d.find("img.waiting").show();a(f).each(function(){var d=a(this),f=g.exec(d.attr("name")),h="undefined"==typeof f[1]?0:parseInt(f[1],10);this.className&&-1!=this.className.indexOf("add-to-top")&&(c=b.addMenuItemToTop);e[h]=d.closest("li").getItemData("add-menu-item",h)});b.addItemToMenu(e,c,function(){f.removeAttr("checked");d.find("img.waiting").hide()})})},getItemData:function(a,b){a=a||"menu-item";var c={},d,e=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"];!b&&a=="menu-item"&&(b=this.find(".menu-item-data-db-id").val());if(!b)return c;this.find("input").each(function(){var f;d=e.length;while(d--){a=="menu-item"?f=e[d]+"["+b+"]":a=="add-menu-item"&&(f="menu-item["+b+"]["+e[d]+"]");this.name&&f==this.name&&(c[e[d]]=this.value)}});return c},setItemData:function(b,c,d){c=c||"menu-item";!d&&c=="menu-item"&&(d=a(".menu-item-data-db-id",this).val());if(!d)return this;this.find("input").each(function(){var e=a(this),f;a.each(b,function(a,b){c=="menu-item"?f=a+"["+d+"]":c=="add-menu-item"&&(f="menu-item["+d+"]["+a+"]");f==e.attr("name")&&e.val(b)})});return this}})},initToggles:function(){postboxes.add_postbox_toggles("nav-menus");columns.useCheckboxesForHidden();columns.checked=function(b){a(".field-"+b).removeClass("hidden-field")};columns.unchecked=function(b){a(".field-"+b).addClass("hidden-field")};b.menuList.hideAdvancedMenuItemFields()},initSortables:function(){function q(a){var c;g=a.placeholder.prev();h=a.placeholder.next();g[0]==a.item[0]&&(g=g.prev());h[0]==a.item[0]&&(h=h.next());i=g.length?g.offset().top+g.height():0;j=h.length?h.offset().top+h.height()/3:0;e=h.length?h.menuItemDepth():0;g.length?f=(c=g.menuItemDepth()+1)>b.options.globalMaxDepth?b.options.globalMaxDepth:c:f=0}function r(a,b){a.placeholder.updateDepthClass(b,c);c=b}function s(){if(!n[0].className)return 0;var a=n[0].className.match(/menu-max-depth-(\d+)/);return a&&a[1]?parseInt(a[1]):0}function t(c){var d,e=p;if(c===0)return;if(c>0){d=o+c;d>p&&(e=d)}else if(c<0&&o==p)while(!a(".menu-item-depth-"+e,b.menuList).length&&e>0)e--;n.removeClass("menu-max-depth-"+p).addClass("menu-max-depth-"+e);p=e}var c=0,d,e,f,g,h,i,j,k,l,m=b.menuList.offset().left,n=a("body"),o,p=s();m+=b.isRTL?b.menuList.width():0;b.menuList.sortable({handle:".menu-item-handle",placeholder:"sortable-placeholder",start:function(c,e){var f,g,h,i,j;b.isRTL&&(e.item[0].style.right="auto");l=e.item.children(".menu-item-transport");d=e.item.menuItemDepth();r(e,d);h=e.item.next()[0]==e.placeholder[0]?e.item.next():e.item;i=h.childMenuItems();l.append(i);f=l.outerHeight();f+=f>0?e.placeholder.css("margin-top").slice(0,-2)*1:0;f+=e.helper.outerHeight();k=f;f-=2;e.placeholder.height(f);o=d;i.each(function(){var b=a(this).menuItemDepth();o=b>o?b:o});g=e.helper.find(".menu-item-handle").outerWidth();g+=b.depthToPx(o-d);g-=2;e.placeholder.width(g);j=e.placeholder.next();j.css("margin-top",k+"px");e.placeholder.detach();a(this).sortable("refresh");e.item.after(e.placeholder);j.css("margin-top",0);q(e)},stop:function(a,e){var f,g=c-d;f=l.children().insertAfter(e.item);if(g!=0){e.item.updateDepthClass(c);f.shiftDepthClass(g);t(g)}b.registerChange();e.item.updateParentMenuItemDBId();e.item[0].style.top=0;if(b.isRTL){e.item[0].style.left="auto";e.item[0].style.right=0}b.refreshMenuTabs(!0)},change:function(a,c){c.placeholder.parent().hasClass("menu")||(g.length?g.after(c.placeholder):b.menuList.prepend(c.placeholder));q(c)},sort:function(d,g){var l=g.helper.offset(),n=b.isRTL?l.left+g.helper.width():l.left,o=b.negateIfRTL*b.pxToDepth(n-m);o>f||l.top<i?o=f:o<e&&(o=e);o!=c&&r(g,o);if(j&&l.top+k>j){h.after(g.placeholder);q(g);a(this).sortable("refreshPositions")}}})},attachMenuEditListeners:function(){var b=this;a("#update-nav-menu").bind("click",function(a){if(a.target&&a.target.className){if(-1!=a.target.className.indexOf("item-edit"))return b.eventOnClickEditLink(a.target);if(-1!=a.target.className.indexOf("menu-save"))return b.eventOnClickMenuSave(a.target);if(-1!=a.target.className.indexOf("menu-delete"))return b.eventOnClickMenuDelete(a.target);if(-1!=a.target.className.indexOf("item-delete"))return b.eventOnClickMenuItemDelete(a.target);if(-1!=a.target.className.indexOf("item-cancel"))return b.eventOnClickCancelLink(a.target)}});a('#add-custom-links input[type="text"]').keypress(function(b){if(b.keyCode===13){b.preventDefault();a("#submit-customlinkdiv").click()}})},setupInputWithDefaultTitle:function(){var b="input-with-default-title";a("."+b).each(function(){var c=a(this),d=c.attr("title"),e=c.val();c.data(b,d);if(""==e)c.val(d);else{if(d==e)return;c.removeClass(b)}}).focus(function(){var c=a(this);c.val()==c.data(b)&&c.val("").removeClass(b)}).blur(function(){var c=a(this);""==c.val()&&c.addClass(b).val(c.data(b))})},attachThemeLocationsListeners:function(){var b=a("#nav-menu-theme-locations"),c={};c.action="menu-locations-save";c["menu-settings-column-nonce"]=a("#menu-settings-column-nonce").val();b.find('input[type="submit"]').click(function(){b.find("select").each(function(){c[this.name]=a(this).val()});b.find(".waiting").show();a.post(ajaxurl,c,function(a){b.find(".waiting").hide()});return!1})},attachQuickSearchListeners:function(){var c;a(".quick-search").keypress(function(d){var e=a(this);if(13==d.which){b.updateQuickSearchResults(e);return!1}c&&clearTimeout(c);c=setTimeout(function(){b.updateQuickSearchResults(e)},400)}).attr("autocomplete","off")},updateQuickSearchResults:function(c){var d,e,f=2,g=c.val();if(g.length<f)return;d=c.parents(".tabs-panel");e={action:"menu-quick-search","response-format":"markup",menu:a("#menu").val(),"menu-settings-column-nonce":a("#menu-settings-column-nonce").val(),q:g,type:c.attr("name")};a("img.waiting",d).show();a.post(ajaxurl,e,function(a){b.processQuickSearchQueryResponse(a,e,d)})},addCustomLink:function(c){var d=a("#custom-menu-item-url").val(),e=a("#custom-menu-item-name").val();c=c||b.addMenuItemToBottom;if(""==d||"http://"==d)return!1;a(".customlinkdiv img.waiting").show();this.addLinkToMenu(d,e,c,function(){a(".customlinkdiv img.waiting").hide();a("#custom-menu-item-name").val("").blur();a("#custom-menu-item-url").val("http://")})},addLinkToMenu:function(a,c,d,e){d=d||b.addMenuItemToBottom;e=e||function(){};b.addItemToMenu({"-1":{"menu-item-type":"custom","menu-item-url":a,"menu-item-title":c}},d,e)},addItemToMenu:function(b,c,d){var e=a("#menu").val(),f=a("#menu-settings-column-nonce").val();c=c||function(){};d=d||function(){};params={action:"add-menu-item",menu:e,"menu-settings-column-nonce":f,"menu-item":b};a.post(ajaxurl,params,function(b){var e=a("#menu-instructions");c(b,params);!e.hasClass("menu-instructions-inactive")&&e.siblings().length&&e.addClass("menu-instructions-inactive");d()})},addMenuItemToBottom:function(c,d){a(c).hideAdvancedMenuItemFields().appendTo(b.targetList)},addMenuItemToTop:function(c,d){a(c).hideAdvancedMenuItemFields().prependTo(b.targetList)},attachUnsavedChangesListener:function(){a("#menu-management input, #menu-management select, #menu-management, #menu-management textarea").change(function(){b.registerChange()});0!=a("#menu-to-edit").length?window.onbeforeunload=function(){if(b.menusChanged)return navMenuL10n.saveAlert}:a("#menu-settings-column").find("input,select").prop("disabled",!0).end().find("a").attr("href","#").unbind("click")},registerChange:function(){b.menusChanged=!0},attachTabsPanelListeners:function(){a("#menu-settings-column").bind("click",function(c){var d,e,f,g,h=a(c.target);if(h.hasClass("nav-tab-link")){e=/#(.*)$/.exec(c.target.href);if(!e||!e[1])return!1;e=e[1];f=h.parents(".inside").first();a("input",f).removeAttr("checked");a(".tabs-panel-active",f).removeClass("tabs-panel-active").addClass("tabs-panel-inactive");a("#"+e,f).removeClass("tabs-panel-inactive").addClass("tabs-panel-active");a(".tabs",f).removeClass("tabs");h.parent().addClass("tabs");a(".quick-search",f).focus();return!1}if(h.hasClass("select-all")){d=/#(.*)$/.exec(c.target.href);if(d&&d[1]){g=a("#"+d[1]+" .tabs-panel-active .menu-item-title input");g.length===g.filter(":checked").length?g.removeAttr("checked"):g.prop("checked",!0);return!1}}else{if(h.hasClass("submit-add-to-menu")){b.registerChange();c.target.id&&"submit-customlinkdiv"==c.target.id?b.addCustomLink(b.addMenuItemToBottom):c.target.id&&-1!=c.target.id.indexOf("submit-")&&a("#"+c.target.id.replace(/submit-/,"")).addSelectedToMenu(b.addMenuItemToBottom);return!1}if(h.hasClass("page-numbers")){a.post(ajaxurl,c.target.href.replace(/.*\?/,"").replace(/action=([^&]*)/,"")+"&action=menu-get-metabox",function(b){if(-1==b.indexOf("replace-id"))return;var c=a.parseJSON(b),d=document.getElementById(c["replace-id"]),e=document.createElement("div"),f=document.createElement("div");if(!c.markup||!d)return;f.innerHTML=c.markup?c.markup:"";d.parentNode.insertBefore(e,d);e.parentNode.removeChild(d);e.parentNode.insertBefore(f,e);e.parentNode.removeChild(e)});return!1}}})},initTabManager:function(){var c=a(".nav-tabs-wrapper"),d=c.children(".nav-tabs"),e=d.children(".nav-tab-active"),f=d.children(".nav-tab"),g=0,h,i,j,k,l,m={},n=b.isRTL?"margin-right":"margin-left",o=b.isRTL?"margin-left":"margin-right",p=2;b.refreshMenuTabs=function(a){var b=c.width(),l=0,m={};i=c.offset().left;h=i+b;a||e.makeTabVisible();if(f.last().isTabVisible()){l=c.width()-g;l=l>0?0:l;m[n]=l+"px";d.animate(m,100,"linear")}b>g?j.add(k).hide():j.add(k).show()};a.fn.extend({makeTabVisible:function(){var a=this.eq(0),c,e,f={},g=0;if(!a.length)return this;c=a.offset().left;e=c+a.outerWidth();e>h?g=h-e:c<i&&(g=i-c);if(!g)return this;f[n]="+="+b.negateIfRTL*g+"px";d.animate(f,Math.abs(g)*p,"linear");return this},isTabVisible:function(){var a=this.eq(0),b=a.offset().left,c=b+a.outerWidth();return c<=h&&b>=i?!0:!1}});f.each(function(){g+=a(this).outerWidth(!0)});m.padding=0;m[o]=-1*g+"px";d.css(m);j=a('<div class="nav-tabs-arrow nav-tabs-arrow-left"><a>&laquo;</a></div>');k=a('<div class="nav-tabs-arrow nav-tabs-arrow-right"><a>&raquo;</a></div>');c.wrap('<div class="nav-tabs-nav"/>').parent().prepend(j).append(k);b.refreshMenuTabs();a(window).resize(function(){l&&clearTimeout(l);l=setTimeout(b.refreshMenuTabs,200)});a.each([{arrow:j,next:"next",last:"first",operator:"+="},{arrow:k,next:"prev",last:"last",operator:"-="}],function(){var a=this;this.arrow.mousedown(function(){var b=Math.abs(parseInt(d.css(n))),e=b,f={};"-="==a.operator&&(e=Math.abs(g-c.width())-b);if(!e)return;f[n]=a.operator+e+"px";d.animate(f,e*p,"linear")}).mouseup(function(){var b,c;d.stop(!0);b=f[a.last]();while((c=b[a.next]())&&c.length&&!c.isTabVisible())b=c;b.makeTabVisible()})})},eventOnClickEditLink:function(b){var c,d,e=/#(.*)$/.exec(b.href);if(e&&e[1]){c=a("#"+e[1]);d=c.parent();if(0!=d.length){if(d.hasClass("menu-item-edit-inactive")){c.data("menu-item-data")||c.data("menu-item-data",c.getItemData());c.slideDown("fast");d.removeClass("menu-item-edit-inactive").addClass("menu-item-edit-active")}else{c.slideUp("fast");d.removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive")}return!1}}},eventOnClickCancelLink:function(b){var c=a(b).closest(".menu-item-settings");c.setItemData(c.data("menu-item-data"));return!1},eventOnClickMenuSave:function(c){var d="",e=a("#menu-name"),f=e.val();if(!f||f==e.attr("title")||!f.replace(/\s+/,"")){e.parent().addClass("form-invalid");return!1}a("#nav-menu-theme-locations select").each(function(){d+='<input type="hidden" name="'+this.name+'" value="'+a(this).val()+'" />'});a("#update-nav-menu").append(d);b.menuList.find(".menu-item-data-position").val(function(a){return a+1});window.onbeforeunload=null;return!0},eventOnClickMenuDelete:function(a){if(confirm(navMenuL10n.warnDeleteMenu)){window.onbeforeunload=null;return!0}return!1},eventOnClickMenuItemDelete:function(c){var d=parseInt(c.id.replace("delete-",""),10);b.removeMenuItem(a("#menu-item-"+d));b.registerChange();return!1},processQuickSearchQueryResponse:function(b,c,d){var e,f,g={},h=document.getElementById("nav-menu-meta"),i=new RegExp("menu-item\\[([^\\]]*)","g"),j=a("<div>").html(b).find("li"),k;if(!j.length){a(".categorychecklist",d).html("<li><p>"+navMenuL10n.noResultsFound+"</p></li>");a("img.waiting",d).hide();return}j.each(function(){k=a(this);e=i.exec(k.html());if(e&&e[1]){f=e[1];while(h.elements["menu-item["+f+"][menu-item-type]"]||g[f])f--;g[f]=!0;f!=e[1]&&k.html(k.html().replace(new RegExp("menu-item\\["+e[1]+"\\]","g"),"menu-item["+f+"]"))}});a(".categorychecklist",d).html(j);a("img.waiting",d).hide()},removeMenuItem:function(b){var c=b.childMenuItems();b.addClass("deleting").animate({opacity:0,height:0},350,function(){var d=a("#menu-instructions");b.remove();c.shiftDepthClass(-1).updateParentMenuItemDBId();d.siblings().length||d.removeClass("menu-instructions-inactive")})},depthToPx:function(a){return a*b.options.menuItemDepthPerLevel},pxToDepth:function(a){return Math.floor(a/b.options.menuItemDepthPerLevel)}};a(document).ready(function(){wpNavMenu.init()})})(jQuery);