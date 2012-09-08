(function($){$.scheduler=function(){this.bucket={};return};$.scheduler.prototype={schedule:function(){function _isfn(a){return!!a&&typeof a!="string"&&typeof a[0]=="undefined"&&RegExp("function","i").test(a+"")}var ctx={id:null,time:1e3,repeat:!1,protect:!1,obj:null,func:function(){},args:[]},i=0,override=!1;if(typeof arguments[i]=="object"&&arguments.length>1){override=!0;i++}if(typeof arguments[i]=="object"){for(var option in arguments[i])typeof ctx[option]!="undefined"&&(ctx[option]=arguments[i][option]);i++}if(typeof arguments[i]=="number"||typeof arguments[i]=="string"&&arguments[i].match(RegExp("^[0-9]+[smhdw]$")))ctx.time=arguments[i++];typeof arguments[i]=="boolean"&&(ctx.repeat=arguments[i++]);typeof arguments[i]=="boolean"&&(ctx.protect=arguments[i++]);if(typeof arguments[i]=="object"&&typeof arguments[i+1]=="string"&&_isfn(arguments[i][arguments[i+1]])){ctx.obj=arguments[i++];ctx.func=arguments[i++]}else typeof arguments[i]!="undefined"&&(_isfn(arguments[i])||typeof arguments[i]=="string")&&(ctx.func=arguments[i++]);while(typeof arguments[i]!="undefined")ctx.args.push(arguments[i++]);if(override){if(typeof arguments[1]=="object")for(var option in arguments[0])typeof ctx[option]!="undefined"&&typeof arguments[1][option]=="undefined"&&(ctx[option]=arguments[0][option]);else for(var option in arguments[0])typeof ctx[option]!="undefined"&&(ctx[option]=arguments[0][option]);i++}ctx._scheduler=this;ctx._handle=null;var match=String(ctx.time).match(RegExp("^([0-9]+)([smhdw])$"));match&&match[0]!="undefined"&&match[1]!="undefined"&&(ctx.time=String(parseInt(match[1])*{s:1e3,m:6e4,h:36e5,d:864e5,w:6048e5}[match[2]]));ctx["id"]==null&&(ctx.id=String(ctx.repeat)+":"+String(ctx.protect)+":"+String(ctx.time)+":"+String(ctx.obj)+":"+String(ctx.func)+":"+String(ctx.args));if(ctx.protect&&typeof this.bucket[ctx["id"]]!="undefined")return this.bucket[ctx.id];_isfn(ctx.func)||(ctx["obj"]!=null&&typeof ctx["obj"]=="object"&&typeof ctx["func"]=="string"&&_isfn(ctx.obj[ctx.func])?ctx.func=ctx.obj[ctx.func]:ctx.func=eval("function () { "+ctx.func+" }"));ctx._handle=this._schedule(ctx);this.bucket[ctx.id]=ctx;return ctx},reschedule:function(a){typeof a=="string"&&(a=this.bucket[a]);a._handle=this._schedule(a);return a},_schedule:function(a){var b=function(){var b=a["obj"]!=null?a.obj:a;a.func.apply(b,a.args);typeof a["_scheduler"].bucket[a["id"]]!="undefined"&&a.repeat?a._scheduler._schedule(a):delete a._scheduler.bucket[a.id]};return setTimeout(b,a.time)},cancel:function(a){typeof a=="string"&&(a=this.bucket[a]);if(typeof a=="object"){clearTimeout(a._handle);delete this.bucket[a.id]}}};$.extend({scheduler$:new $.scheduler,schedule:function(){return $.scheduler$.schedule.apply($.scheduler$,arguments)},reschedule:function(){return $.scheduler$.reschedule.apply($.scheduler$,arguments)},cancel:function(){return $.scheduler$.cancel.apply($.scheduler$,arguments)}});$.fn.extend({schedule:function(){var a=[{}];for(var b=0;b<arguments.length;b++)a.push(arguments[b]);return this.each(function(){a[0]={id:this,obj:this};return $.schedule.apply($,a)})}})})(jQuery);