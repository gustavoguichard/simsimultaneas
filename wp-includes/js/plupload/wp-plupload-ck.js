if(typeof wp=="undefined")var wp={};(function(e,t){var n;if(typeof _wpPluploadSettings=="undefined")return;n=function(e){var r=this,i={container:"container",browser:"browse_button",dropzone:"drop_element"},s;this.supports={upload:n.browser.supported};this.supported=this.supports.upload;if(!this.supported)return;this.plupload=t.extend(!0,{multipart_params:{}},n.defaults);this.container=document.body;t.extend(!0,this,e);for(s in this)t.isFunction(this[s])&&(this[s]=t.proxy(this[s],this));for(s in i){if(!this[s])continue;this[s]=t(this[s]).first();if(!this[s].length){delete this[s];continue}this[s].prop("id")||this[s].prop("id","__wp-uploader-id-"+n.uuid++);this.plupload[i[s]]=this[s].prop("id")}if((!this.browser||!this.browser.length)&&(!this.dropzone||!this.dropzone.length))return;this.uploader=new plupload.Uploader(this.plupload);delete this.plupload;this.param(this.params||{});delete this.params;this.uploader.init();this.supports.dragdrop=this.uploader.features.dragdrop&&!n.browser.mobile;(function(e,t){var n=50,r;if(!e)return;e.toggleClass("supports-drag-drop",!!t);if(!t)return e.unbind(".wp-uploader");e.bind("dragover.wp-uploader",function(){if(r)return;e.addClass("drag-over");r=!0});e.bind("dragleave.wp-uploader, drop.wp-uploader",function(){r=!1;e.removeClass("drag-over")})})(this.dropzone,this.supports.dragdrop);if(this.browser)this.browser.on("mouseenter",this.refresh);else{this.uploader.disableBrowse(!0);t("#"+this.uploader.id+"_html5_container").hide()}this.uploader.bind("UploadProgress",this.progress);this.uploader.bind("FileUploaded",function(e,t,n){try{n=JSON.parse(n.response)}catch(i){return r.error(pluploadL10n.default_error,i)}if(!n||!n.type||!n.data)return r.error(pluploadL10n.default_error);if("error"===n.type)return r.error(n.data.message,n.data);if("success"===n.type)return r.success(n.data)});this.uploader.bind("Error",function(e,t){var i=pluploadL10n.default_error,s;for(s in n.errorMap)if(t.code===plupload[s]){i=n.errorMap[s];break}r.error(i,t);e.refresh()});this.uploader.bind("FilesAdded",function(e,n){t.each(n,function(){r.added(this)});e.refresh();e.start()});this.init()};t.extend(n,_wpPluploadSettings);n.uuid=0;n.errorMap={FAILED:pluploadL10n.upload_failed,FILE_EXTENSION_ERROR:pluploadL10n.invalid_filetype,IMAGE_FORMAT_ERROR:pluploadL10n.not_an_image,IMAGE_MEMORY_ERROR:pluploadL10n.image_memory_exceeded,IMAGE_DIMENSIONS_ERROR:pluploadL10n.image_dimensions_exceeded,GENERIC_ERROR:pluploadL10n.upload_failed,IO_ERROR:pluploadL10n.io_error,HTTP_ERROR:pluploadL10n.http_error,SECURITY_ERROR:pluploadL10n.security_error};t.extend(n.prototype,{param:function(e,n){if(arguments.length===1&&typeof e=="string")return this.uploader.settings.multipart_params[e];arguments.length>1?this.uploader.settings.multipart_params[e]=n:t.extend(this.uploader.settings.multipart_params,e)},init:function(){},error:function(){},success:function(){},added:function(){},progress:function(){},complete:function(){},refresh:function(){this.uploader.refresh()}});e.Uploader=n})(wp,jQuery);