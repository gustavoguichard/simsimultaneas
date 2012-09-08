/**
 * validate.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 *//**
	// String validation:

	if (!Validator.isEmail('myemail'))
		alert('Invalid email.');

	// Form validation:

	var f = document.forms['myform'];

	if (!Validator.isEmail(f.myemail))
		alert('Invalid email.');
*/var Validator={isEmail:function(a){return this.test(a,"^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$")},isAbsUrl:function(a){return this.test(a,"^(news|telnet|nttp|file|http|ftp|https)://[-A-Za-z0-9\\.]+\\/?.*$")},isSize:function(a){return this.test(a,"^[0-9.]+(%|in|cm|mm|em|ex|pt|pc|px)?$")},isId:function(a){return this.test(a,"^[A-Za-z_]([A-Za-z0-9_])*$")},isEmpty:function(a){var b,c;if(a.nodeName=="SELECT"&&a.selectedIndex<1)return!0;if(a.type=="checkbox"&&!a.checked)return!0;if(a.type=="radio"){for(c=0,b=a.form.elements;c<b.length;c++)if(b[c].type=="radio"&&b[c].name==a.name&&b[c].checked)return!1;return!0}return(new RegExp("^\\s*$")).test(a.nodeType==1?a.value:a)},isNumber:function(a,b){return!isNaN(a.nodeType==1?a.value:a)&&(!b||!this.test(a,"^-?[0-9]*\\.[0-9]*$"))},test:function(a,b){a=a.nodeType==1?a.value:a;return a==""||(new RegExp(b)).test(a)}},AutoValidator={settings:{id_cls:"id",int_cls:"int",url_cls:"url",number_cls:"number",email_cls:"email",size_cls:"size",required_cls:"required",invalid_cls:"invalid",min_cls:"min",max_cls:"max"},init:function(a){var b;for(b in a)this.settings[b]=a[b]},validate:function(a){var b,c,d=this.settings,e=0;c=this.tags(a,"label");for(b=0;b<c.length;b++){this.removeClass(c[b],d.invalid_cls);c[b].setAttribute("aria-invalid",!1)}e+=this.validateElms(a,"input");e+=this.validateElms(a,"select");e+=this.validateElms(a,"textarea");return e==3},invalidate:function(a){this.mark(a.form,a)},getErrorMessages:function(a){var b,c,d=this.settings,e,f,g,h=[],i=tinyMCEPopup.editor;b=this.tags(a,"label");for(c=0;c<b.length;c++)if(this.hasClass(b[c],d.invalid_cls)){e=document.getElementById(b[c].getAttribute("for"));g={field:b[c].textContent};if(this.hasClass(e,d.min_cls,!0)){message=i.getLang("invalid_data_min");g.min=this.getNum(e,d.min_cls)}else this.hasClass(e,d.number_cls)?message=i.getLang("invalid_data_number"):this.hasClass(e,d.size_cls)?message=i.getLang("invalid_data_size"):message=i.getLang("invalid_data");message=message.replace(/{\#([^}]+)\}/g,function(a,b){return g[b]||"{#"+b+"}"});h.push(message)}return h},reset:function(a){var b=["label","input","select","textarea"],c,d,e,f=this.settings;if(a==null)return;for(c=0;c<b.length;c++){e=this.tags(a.form?a.form:a,b[c]);for(d=0;d<e.length;d++){this.removeClass(e[d],f.invalid_cls);e[d].setAttribute("aria-invalid",!1)}}},validateElms:function(a,b){var c,d,e,f=this.settings,g=!0,h=Validator,i;c=this.tags(a,b);for(d=0;d<c.length;d++){e=c[d];this.removeClass(e,f.invalid_cls);this.hasClass(e,f.required_cls)&&h.isEmpty(e)&&(g=this.mark(a,e));this.hasClass(e,f.number_cls)&&!h.isNumber(e)&&(g=this.mark(a,e));this.hasClass(e,f.int_cls)&&!h.isNumber(e,!0)&&(g=this.mark(a,e));this.hasClass(e,f.url_cls)&&!h.isAbsUrl(e)&&(g=this.mark(a,e));this.hasClass(e,f.email_cls)&&!h.isEmail(e)&&(g=this.mark(a,e));this.hasClass(e,f.size_cls)&&!h.isSize(e)&&(g=this.mark(a,e));this.hasClass(e,f.id_cls)&&!h.isId(e)&&(g=this.mark(a,e));if(this.hasClass(e,f.min_cls,!0)){i=this.getNum(e,f.min_cls);if(isNaN(i)||parseInt(e.value)<parseInt(i))g=this.mark(a,e)}if(this.hasClass(e,f.max_cls,!0)){i=this.getNum(e,f.max_cls);if(isNaN(i)||parseInt(e.value)>parseInt(i))g=this.mark(a,e)}}return g},hasClass:function(a,b,c){return(new RegExp("\\b"+b+(c?"[0-9]+":"")+"\\b","g")).test(a.className)},getNum:function(a,b){b=a.className.match(new RegExp("\\b"+b+"([0-9]+)\\b","g"))[0];b=b.replace(/[^0-9]/g,"");return b},addClass:function(a,b,c){var d=this.removeClass(a,b);a.className=c?b+(d!=""?" "+d:""):(d!=""?d+" ":"")+b},removeClass:function(a,b){b=a.className.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ");return a.className=b!=" "?b:""},tags:function(a,b){return a.getElementsByTagName(b)},mark:function(a,b){var c=this.settings;this.addClass(b,c.invalid_cls);b.setAttribute("aria-invalid","true");this.markLabels(a,b,c.invalid_cls);return!1},markLabels:function(a,b,c){var d,e;d=this.tags(a,"label");for(e=0;e<d.length;e++)(d[e].getAttribute("for")==b.id||d[e].htmlFor==b.id)&&this.addClass(d[e],c);return null}};