(function(a){var b=0,c=9999;a.widget("wp.pointer",{options:{pointerClass:"wp-pointer",pointerWidth:320,content:function(b,c,d){return a(this).text()},buttons:function(b,c){var d=wpPointerL10n?wpPointerL10n.dismiss:"Dismiss",e=a('<a class="close" href="#">'+d+"</a>");return e.bind("click.pointer",function(a){a.preventDefault();c.element.pointer("close")})},position:"top",show:function(a,b){b.pointer.show();b.opened()},hide:function(a,b){b.pointer.hide();b.closed()},document:document},_create:function(){var c,d;this.content=a('<div class="wp-pointer-content"></div>');this.arrow=a('<div class="wp-pointer-arrow"><div class="wp-pointer-arrow-inner"></div></div>');d=this.element.parents().add(this.element);c="absolute";d.filter(function(){return"fixed"===a(this).css("position")}).length&&(c="fixed");this.pointer=a("<div />").append(this.content).append(this.arrow).attr("id","wp-pointer-"+b++).addClass(this.options.pointerClass).css({position:c,width:this.options.pointerWidth+"px",display:"none"}).appendTo(this.options.document.body)},_setOption:function(b,c){var d=this.options,e=this.pointer;b==="document"&&c!==d.document?e.detach().appendTo(c.body):b==="pointerClass"&&e.removeClass(d.pointerClass).addClass(c);a.Widget.prototype._setOption.apply(this,arguments);b==="position"?this.reposition():b==="content"&&this.active&&this.update()},destroy:function(){this.pointer.remove();a.Widget.prototype.destroy.call(this)},widget:function(){return this.pointer},update:function(b){var c=this,d=this.options,e=a.Deferred(),f;if(d.disabled)return;e.done(function(a){c._update(b,a)});typeof d.content=="string"?f=d.content:f=d.content.call(this.element[0],e.resolve,b,this._handoff());f&&e.resolve(f);return e.promise()},_update:function(a,b){var c,d=this.options;if(!b)return;this.pointer.stop();this.content.html(b);c=d.buttons.call(this.element[0],a,this._handoff());c&&c.wrap('<div class="wp-pointer-buttons" />').parent().appendTo(this.content);this.reposition()},reposition:function(){var b;if(this.options.disabled)return;b=this._processPosition(this.options.position);this.pointer.css({top:0,left:0,zIndex:c++}).show().position(a.extend({of:this.element,collision:"fit none"},b));this.repoint()},repoint:function(){var a=this.options,b;if(a.disabled)return;b=typeof a.position=="string"?a.position:a.position.edge;this.pointer[0].className=this.pointer[0].className.replace(/wp-pointer-[^\s'"]*/,"");this.pointer.addClass("wp-pointer-"+b)},_processPosition:function(b){var c={top:"bottom",bottom:"top",left:"right",right:"left"},d;typeof b=="string"?d={edge:b+""}:d=a.extend({},b);if(!d.edge)return d;if(d.edge=="top"||d.edge=="bottom"){d.align=d.align||"left";d.at=d.at||d.align+" "+c[d.edge];d.my=d.my||d.align+" "+d.edge}else{d.align=d.align||"top";d.at=d.at||c[d.edge]+" "+d.align;d.my=d.my||d.edge+" "+d.align}return d},open:function(a){var b=this,c=this.options;if(this.active||c.disabled||this.element.is(":hidden"))return;this.update().done(function(){b._open(a)})},_open:function(a){var b=this,c=this.options;if(this.active||c.disabled||this.element.is(":hidden"))return;this.active=!0;this._trigger("open",a,this._handoff());this._trigger("show",a,this._handoff({opened:function(){b._trigger("opened",a,b._handoff())}}))},close:function(a){if(!this.active||this.options.disabled)return;var b=this;this.active=!1;this._trigger("close",a,this._handoff());this._trigger("hide",a,this._handoff({closed:function(){b._trigger("closed",a,b._handoff())}}))},sendToTop:function(a){this.active&&this.pointer.css("z-index",c++)},toggle:function(a){this.pointer.is(":hidden")?this.open(a):this.close(a)},_handoff:function(b){return a.extend({pointer:this.pointer,element:this.element},b)}})})(jQuery);