if(typeof jQuery!="undefined"){typeof jQuery.fn.hoverIntent=="undefined"&&function(a){a.fn.hoverIntent=function(c,d){var e={sensitivity:7,interval:100,timeout:0};e=a.extend(e,d?{over:c,out:d}:c);var f,g,h,i,j=function(a){f=a.pageX;g=a.pageY},k=function(c,d){d.hoverIntent_t=clearTimeout(d.hoverIntent_t);if(Math.abs(h-f)+Math.abs(i-g)<e.sensitivity){a(d).unbind("mousemove",j);d.hoverIntent_s=1;return e.over.apply(d,[c])}h=f;i=g;d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval)},l=function(a,b){b.hoverIntent_t=clearTimeout(b.hoverIntent_t);b.hoverIntent_s=0;return e.out.apply(b,[a])},m=function(c){var d=this,e=(c.type=="mouseover"?c.fromElement:c.toElement)||c.relatedTarget;while(e&&e!=this)try{e=e.parentNode}catch(c){e=this}if(e==this){a.browser.mozilla&&(c.type=="mouseout"?d.mtout=setTimeout(function(){n(c,d)},30):d.mtout&&(d.mtout=clearTimeout(d.mtout)));return}d.mtout&&(d.mtout=clearTimeout(d.mtout));n(c,d)},n=function(c,d){var f=jQuery.extend({},c);d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t));if(c.type=="mouseover"){h=f.pageX;i=f.pageY;a(d).bind("mousemove",j);d.hoverIntent_s!=1&&(d.hoverIntent_t=setTimeout(function(){k(f,d)},e.interval))}else{a(d).unbind("mousemove",j);d.hoverIntent_s==1&&(d.hoverIntent_t=setTimeout(function(){l(f,d)},e.timeout))}};return this.mouseover(m).mouseout(m)}}(jQuery);jQuery(document).ready(function(a){var b=function(b,c){var d=a(c),e=d.attr("tabindex");e&&d.attr("tabindex","0").attr("tabindex",e)};a("#wpadminbar").removeClass("nojq").removeClass("nojs").find("li.menupop").hoverIntent({over:function(b){a(this).addClass("hover")},out:function(b){a(this).removeClass("hover")},timeout:180,sensitivity:7,interval:100});a("#wp-admin-bar-get-shortlink").click(function(b){b.preventDefault();a(this).addClass("selected").children(".shortlink-input").blur(function(){a(this).parents("#wp-admin-bar-get-shortlink").removeClass("selected")}).focus().select()});a("#wpadminbar li.menupop > .ab-item").bind("keydown.adminbar",function(c){if(c.which!=13)return;var d=a(c.target),e=d.closest("ab-sub-wrapper");c.stopPropagation();c.preventDefault();e.length||(e=a("#wpadminbar .quicklinks"));e.find(".menupop").removeClass("hover");d.parent().toggleClass("hover");d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)}).each(b);a("#wpadminbar .ab-item").bind("keydown.adminbar",function(c){if(c.which!=27)return;var d=a(c.target);c.stopPropagation();c.preventDefault();d.closest(".hover").removeClass("hover").children(".ab-item").focus();d.siblings(".ab-sub-wrapper").find(".ab-item").each(b)});a("#wpadminbar").click(function(b){if(b.target.id!="wpadminbar"&&b.target.id!="wp-admin-bar-top-secondary")return;b.preventDefault();a("html, body").animate({scrollTop:0},"fast")})})}else(function(a,b){var c=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){return c.call(a,window.event)})},d,e=new RegExp("\\bhover\\b","g"),f=[],g=new RegExp("\\bselected\\b","g"),h=function(a){var b=f.length;while(b--)if(f[b]&&a==f[b][1])return f[b][0];return!1},i=function(b){var c,i,j,k,l,m,n=[],o=0;while(b&&b!=d&&b!=a){if("LI"==b.nodeName.toUpperCase()){n[n.length]=b;i=h(b);i&&clearTimeout(i);b.className=b.className?b.className.replace(e,"")+" hover":"hover";k=b}b=b.parentNode}if(k&&k.parentNode){l=k.parentNode;if(l&&"UL"==l.nodeName.toUpperCase()){c=l.childNodes.length;while(c--){m=l.childNodes[c];m!=k&&(m.className=m.className?m.className.replace(g,""):"")}}}c=f.length;while(c--){j=!1;o=n.length;while(o--)n[o]==f[c][1]&&(j=!0);j||(f[c][1].className=f[c][1].className?f[c][1].className.replace(e,""):"")}},j=function(b){while(b&&b!=d&&b!=a){"LI"==b.nodeName.toUpperCase()&&function(a){var b=setTimeout(function(){a.className=a.className?a.className.replace(e,""):""},500);f[f.length]=[b,a]}(b);b=b.parentNode}},k=function(b){var c,e,f,h=b.target||b.srcElement;for(;;){if(!h||h==a||h==d)return;if(h.id&&h.id=="wp-admin-bar-get-shortlink")break;h=h.parentNode}b.preventDefault&&b.preventDefault();b.returnValue=!1;-1==h.className.indexOf("selected")&&(h.className+=" selected");for(c=0,e=h.childNodes.length;c<e;c++){f=h.childNodes[c];if(f.className&&-1!=f.className.indexOf("shortlink-input")){f.focus();f.select();f.onblur=function(){h.className=h.className?h.className.replace(g,""):""};break}}return!1},l=function(a){var b,c,d,e,f,g;if(a.id!="wpadminbar"&&a.id!="wp-admin-bar-top-secondary")return;b=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;if(b<1)return;g=b>800?130:100;c=Math.min(12,Math.round(b/g));d=b>800?Math.round(b/30):Math.round(b/20);e=[];f=0;while(b){b-=d;b<0&&(b=0);e.push(b);setTimeout(function(){window.scrollTo(0,e.shift())},f*c);f++}};c(b,"load",function(){d=a.getElementById("wpadminbar");if(a.body&&d){a.body.appendChild(d);d.className&&(d.className=d.className.replace(/nojs/,""));c(d,"mouseover",function(a){i(a.target||a.srcElement)});c(d,"mouseout",function(a){j(a.target||a.srcElement)});c(d,"click",k);c(d,"click",function(a){l(a.target||a.srcElement)})}b.location.hash&&b.scrollBy(0,-32)})})(document,window);