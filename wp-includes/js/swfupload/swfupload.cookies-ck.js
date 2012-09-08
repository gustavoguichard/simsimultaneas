/*
	Cookie Plug-in
	
	This plug in automatically gets all the cookies for this site and adds them to the post_params.
	Cookies are loaded only on initialization.  The refreshCookies function can be called to update the post_params.
	The cookies will override any other post params with the same name.
*/var SWFUpload;if(typeof SWFUpload=="function"){SWFUpload.prototype.initSettings=function(a){return function(){typeof a=="function"&&a.call(this);this.refreshCookies(!1)}}(SWFUpload.prototype.initSettings);SWFUpload.prototype.refreshCookies=function(a){a===undefined&&(a=!0);a=!!a;var b=this.settings.post_params,c,d=document.cookie.split(";"),e=d.length,f,g,h,i;for(c=0;c<e;c++){f=d[c];while(f.charAt(0)===" ")f=f.substring(1,f.length);g=f.indexOf("=");if(g>0){h=f.substring(0,g);i=f.substring(g+1);b[h]=i}}a&&this.setPostParams(b)}};