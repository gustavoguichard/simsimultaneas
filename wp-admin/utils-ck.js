function getUserSetting(a,b){var c=getAllUserSettings();return c.hasOwnProperty(a)?c[a]:typeof b!="undefined"?b:""}function setUserSetting(a,b,c){if("object"!=typeof userSettings)return!1;var d="wp-settings-"+userSettings.uid,e=wpCookies.getHash(d)||{},f=userSettings.url,g=a.toString().replace(/[^A-Za-z0-9_]/,""),h=b.toString().replace(/[^A-Za-z0-9_]/,"");c?delete e[g]:e[g]=h;wpCookies.setHash(d,e,31536e3,f);wpCookies.set("wp-settings-time-"+userSettings.uid,userSettings.time,31536e3,f);return a}function deleteUserSetting(a){return setUserSetting(a,"",1)}function getAllUserSettings(){return"object"!=typeof userSettings?{}:wpCookies.getHash("wp-settings-"+userSettings.uid)||{}}var wpCookies={each:function(a,b,c){var d,e;if(!a)return 0;c=c||a;if(typeof a.length!="undefined"){for(d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a)===!1)return 0}else for(d in a)if(a.hasOwnProperty(d)&&b.call(c,a[d],d,a)===!1)return 0;return 1},getHash:function(a){var b=this.get(a),c;b&&this.each(b.split("&"),function(a){a=a.split("=");c=c||{};c[a[0]]=a[1]});return c},setHash:function(a,b,c,d,e,f){var g="";this.each(b,function(a,b){g+=(g?"&":"")+b+"="+a});this.set(a,g,c,d,e,f)},get:function(a){var b=document.cookie,c,d=a+"=",e;if(!b)return;e=b.indexOf("; "+d);if(e==-1){e=b.indexOf(d);if(e!=0)return null}else e+=2;c=b.indexOf(";",e);c==-1&&(c=b.length);return decodeURIComponent(b.substring(e+d.length,c))},set:function(a,b,c,d,e,f){var g=new Date;if(typeof c=="object"&&c.toGMTString)c=c.toGMTString();else if(parseInt(c,10)){g.setTime(g.getTime()+parseInt(c,10)*1e3);c=g.toGMTString()}else c="";document.cookie=a+"="+encodeURIComponent(b)+(c?"; expires="+c:"")+(d?"; path="+d:"")+(e?"; domain="+e:"")+(f?"; secure":"")},remove:function(a,b){this.set(a,"",-1e3,b)}};