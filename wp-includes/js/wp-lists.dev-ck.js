(function(e){var t={add:"ajaxAdd",del:"ajaxDel",dim:"ajaxDim",process:"process",recolor:"recolor"},n;n={settings:{url:ajaxurl,type:"POST",response:"ajax-response",what:"",alt:"alternate",altOffset:0,addColor:null,delColor:null,dimAddColor:null,dimDelColor:null,confirm:null,addBefore:null,addAfter:null,delBefore:null,delAfter:null,dimBefore:null,dimAfter:null},nonce:function(t,n){var r=wpAjax.unserialize(t.attr("href"));return n.nonce||r._ajax_nonce||e("#"+n.element+' input[name="_ajax_nonce"]').val()||r._wpnonce||e("#"+n.element+' input[name="_wpnonce"]').val()||0},parseClass:function(t,n){var r=[],i;try{i=e(t).attr("class")||"";i=i.match(new RegExp(n+":[\\S]+"));i&&(r=i[0].split(":"))}catch(s){}return r},pre:function(t,n,r){var i,s;n=e.extend({},this.wpList.settings,{element:null,nonce:0,target:t.get(0)},n||{});if(e.isFunction(n.confirm)){if("add"!=r){i=e("#"+n.element).css("backgroundColor");e("#"+n.element).css("backgroundColor","#FF9966")}s=n.confirm.call(this,t,n,r,i);"add"!=r&&e("#"+n.element).css("backgroundColor",i);if(!s)return!1}return n},ajaxAdd:function(t,r){t=e(t);r=r||{};var i=this,s=n.parseClass(t,"add"),o,u,a,f,l;r=n.pre.call(i,t,r,"add");r.element=s[2]||t.attr("id")||r.element||null;s[3]?r.addColor="#"+s[3]:r.addColor=r.addColor||"#FFFF33";if(!r)return!1;if(!t.is('[id="'+r.what+'-add-submit"]'))return!n.add.call(i,t,r);if(!r.element)return!0;r.action="add-"+r.what;r.nonce=n.nonce(t,r);o=e("#"+r.element+" :input").not('[name="_ajax_nonce"], [name="_wpnonce"], [name="action"]');u=wpAjax.validateForm("#"+r.element);if(!u)return!1;r.data=e.param(e.extend({_ajax_nonce:r.nonce,action:r.action},wpAjax.unserialize(s[4]||"")));a=e.isFunction(o.fieldSerialize)?o.fieldSerialize():o.serialize();a&&(r.data+="&"+a);if(e.isFunction(r.addBefore)){r=r.addBefore(r);if(!r)return!0}if(!r.data.match(/_ajax_nonce=[a-f0-9]+/))return!0;r.success=function(t){f=wpAjax.parseAjaxResponse(t,r.response,r.element);l=t;if(!f||f.errors)return!1;if(!0===f)return!0;jQuery.each(f.responses,function(){n.add.call(i,this.data,e.extend({},r,{pos:this.position||0,id:this.id||0,oldId:this.oldId||null}))});i.wpList.recolor();e(i).trigger("wpListAddEnd",[r,i.wpList]);n.clear.call(i,"#"+r.element)};r.complete=function(t,n){if(e.isFunction(r.addAfter)){var i=e.extend({xml:t,status:n,parsed:f},r);r.addAfter(l,i)}};e.ajax(r);return!1},ajaxDel:function(t,r){t=e(t);r=r||{};var i=this,s=n.parseClass(t,"delete"),o,u,a;r=n.pre.call(i,t,r,"delete");r.element=s[2]||r.element||null;s[3]?r.delColor="#"+s[3]:r.delColor=r.delColor||"#faa";if(!r||!r.element)return!1;r.action="delete-"+r.what;r.nonce=n.nonce(t,r);r.data=e.extend({action:r.action,id:r.element.split("-").pop(),_ajax_nonce:r.nonce},wpAjax.unserialize(s[4]||""));if(e.isFunction(r.delBefore)){r=r.delBefore(r,i);if(!r)return!0}if(!r.data._ajax_nonce)return!0;o=e("#"+r.element);if("none"!=r.delColor)o.css("backgroundColor",r.delColor).fadeOut(350,function(){i.wpList.recolor();e(i).trigger("wpListDelEnd",[r,i.wpList])});else{i.wpList.recolor();e(i).trigger("wpListDelEnd",[r,i.wpList])}r.success=function(t){u=wpAjax.parseAjaxResponse(t,r.response,r.element);a=t;if(!u||u.errors){o.stop().stop().css("backgroundColor","#faa").show().queue(function(){i.wpList.recolor();e(this).dequeue()});return!1}};r.complete=function(t,n){e.isFunction(r.delAfter)&&o.queue(function(){var i=e.extend({xml:t,status:n,parsed:u},r);r.delAfter(a,i)}).dequeue()};e.ajax(r);return!1},ajaxDim:function(t,r){if(e(t).parent().css("display")=="none")return!1;t=e(t);r=r||{};var i=this,s=n.parseClass(t,"dim"),o,u,a,f,l,c;r=n.pre.call(i,t,r,"dim");r.element=s[2]||r.element||null;r.dimClass=s[3]||r.dimClass||null;s[4]?r.dimAddColor="#"+s[4]:r.dimAddColor=r.dimAddColor||"#FFFF33";s[5]?r.dimDelColor="#"+s[5]:r.dimDelColor=r.dimDelColor||"#FF3333";if(!r||!r.element||!r.dimClass)return!0;r.action="dim-"+r.what;r.nonce=n.nonce(t,r);r.data=e.extend({action:r.action,id:r.element.split("-").pop(),dimClass:r.dimClass,_ajax_nonce:r.nonce},wpAjax.unserialize(s[6]||""));if(e.isFunction(r.dimBefore)){r=r.dimBefore(r);if(!r)return!0}o=e("#"+r.element);u=o.toggleClass(r.dimClass).is("."+r.dimClass);a=n.getColor(o);o.toggleClass(r.dimClass);f=u?r.dimAddColor:r.dimDelColor;"none"!=f?o.animate({backgroundColor:f},"fast").queue(function(){o.toggleClass(r.dimClass);e(this).dequeue()}).animate({backgroundColor:a},{complete:function(){e(this).css("backgroundColor","");e(i).trigger("wpListDimEnd",[r,i.wpList])}}):e(i).trigger("wpListDimEnd",[r,i.wpList]);if(!r.data._ajax_nonce)return!0;r.success=function(t){l=wpAjax.parseAjaxResponse(t,r.response,r.element);c=t;if(!l||l.errors){o.stop().stop().css("backgroundColor","#FF3333")[u?"removeClass":"addClass"](r.dimClass).show().queue(function(){i.wpList.recolor();e(this).dequeue()});return!1}};r.complete=function(t,n){e.isFunction(r.dimAfter)&&o.queue(function(){var i=e.extend({xml:t,status:n,parsed:l},r);r.dimAfter(c,i)}).dequeue()};e.ajax(r);return!1},getColor:function(e){var t=jQuery(e).css("backgroundColor");return t||"#ffffff"},add:function(t,r){t=e(t);var i=e(this),s=!1,o={pos:0,id:0,oldId:null},u,a,f;"string"==typeof r&&(r={what:r});r=e.extend(o,this.wpList.settings,r);if(!t.size()||!r.what)return!1;r.oldId&&(s=e("#"+r.what+"-"+r.oldId));r.id&&(r.id!=r.oldId||!s||!s.size())&&e("#"+r.what+"-"+r.id).remove();if(s&&s.size()){s.before(t);s.remove()}else if(isNaN(r.pos)){u="after";if("-"==r.pos.substr(0,1)){r.pos=r.pos.substr(1);u="before"}a=i.find("#"+r.pos);1===a.size()?a[u](t):i.append(t)}else if("comment"!=r.what||0===e("#"+r.element).length)r.pos<0?i.prepend(t):i.append(t);r.alt&&((i.children(":visible").index(t[0])+r.altOffset)%2?t.removeClass(r.alt):t.addClass(r.alt));if("none"!=r.addColor){f=n.getColor(t);t.css("backgroundColor",r.addColor).animate({backgroundColor:f},{complete:function(){e(this).css("backgroundColor","")}})}i.each(function(){this.wpList.process(t)});return t},clear:function(t){var n=this,r,i;t=e(t);if(n.wpList&&t.parents("#"+n.id).size())return;t.find(":input").each(function(){if(e(this).parents(".form-no-clear").size())return;r=this.type.toLowerCase();i=this.tagName.toLowerCase();"text"==r||"password"==r||"textarea"==i?this.value="":"checkbox"==r||"radio"==r?this.checked=!1:"select"==i&&(this.selectedIndex=null)})},process:function(t){var n=this,r=e(t||document);r.delegate('form[class^="add:'+n.id+':"]',"submit",function(){return n.wpList.add(this)});r.delegate('a[class^="add:'+n.id+':"], input[class^="add:'+n.id+':"]',"click",function(){return n.wpList.add(this)});r.delegate('[class^="delete:'+n.id+':"]',"click",function(){return n.wpList.del(this)});r.delegate('[class^="dim:'+n.id+':"]',"click",function(){return n.wpList.dim(this)})},recolor:function(){var t=this,n,r;if(!t.wpList.settings.alt)return;n=e(".list-item:visible",t);n.size()||(n=e(t).children(":visible"));r=[":even",":odd"];t.wpList.settings.altOffset%2&&r.reverse();n.filter(r[0]).addClass(t.wpList.settings.alt).end().filter(r[1]).removeClass(t.wpList.settings.alt)},init:function(){var e=this;e.wpList.process=function(t){e.each(function(){this.wpList.process(t)})};e.wpList.recolor=function(){e.each(function(){this.wpList.recolor()})}}};e.fn.wpList=function(r){this.each(function(){var i=this;this.wpList={settings:e.extend({},n.settings,{what:n.parseClass(this,"list")[1]||""},r)};e.each(t,function(e,t){i.wpList[e]=function(e,r){return n[t].call(i,e,r)}})});n.init.call(this);this.wpList.process();return this}})(jQuery);