addComment={moveForm:function(a,b,c,d){var e=this,f,g=e.I(a),h=e.I(c),i=e.I("cancel-comment-reply-link"),j=e.I("comment_parent"),k=e.I("comment_post_ID");if(!g||!h||!i||!j)return;e.respondId=c;d=d||!1;if(!e.I("wp-temp-form-div")){f=document.createElement("div");f.id="wp-temp-form-div";f.style.display="none";h.parentNode.insertBefore(f,h)}g.parentNode.insertBefore(h,g.nextSibling);k&&d&&(k.value=d);j.value=b;i.style.display="";i.onclick=function(){var a=addComment,b=a.I("wp-temp-form-div"),c=a.I(a.respondId);if(!b||!c)return;a.I("comment_parent").value="0";b.parentNode.insertBefore(c,b);b.parentNode.removeChild(b);this.style.display="none";this.onclick=null;return!1};try{e.I("comment").focus()}catch(l){}return!1},I:function(a){return document.getElementById(a)}};