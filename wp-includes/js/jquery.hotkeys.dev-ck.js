/******************************************************************************************************************************

 * @ Original idea by by Binny V A, Original version: 2.00.A 
 * @ http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * @ Original License : BSD
 
 * @ jQuery Plugin by Tzury Bar Yochay 
        mail: tzury.by@gmail.com
        blog: evalinux.wordpress.com
        face: facebook.com/profile.php?id=513676303
        
        (c) Copyrights 2007
        
 * @ jQuery Plugin version Beta (0.0.2)
 * @ License: jQuery-License.
 
TODO:
    add queue support (as in gmail) e.g. 'x' then 'y', etc.
    add mouse + mouse wheel events.

USAGE:
    $.hotkeys.add('Ctrl+c', function(){ alert('copy anyone?');});
    $.hotkeys.add('Ctrl+c', {target:'div#editor', type:'keyup', propagate: true},function(){ alert('copy anyone?');});>
    $.hotkeys.remove('Ctrl+c'); 
    $.hotkeys.remove('Ctrl+c', {target:'div#editor', type:'keypress'}); 
    
******************************************************************************************************************************/(function(a){this.version="(beta)(0.0.3)";this.all={};this.special_keys={27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12"};this.shift_nums={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"};this.add=function(b,c,d){if(a.isFunction(c)){d=c;c={}}var e={},f={type:"keydown",propagate:!1,disableInInput:!1,target:a("html")[0]},g=this;e=a.extend(e,f,c||{});b=b.toLowerCase();var h=function(b){var c=b.target;if(e.disableInInput){var d=a(c);if(d.is("input")||d.is("textarea"))return}var f=b.which,h=b.type,i=String.fromCharCode(f).toLowerCase(),j=g.special_keys[f],k=b.shiftKey,l=b.ctrlKey,m=b.altKey,n=b.metaKey,o=!0,p=null;while(!g.all[c]&&c.parentNode)c=c.parentNode;var q=g.all[c].events[h].callbackMap;if(!k&&!l&&!m&&!n)p=q[j]||q[i];else{var r="";m&&(r+="alt+");l&&(r+="ctrl+");k&&(r+="shift+");n&&(r+="meta+");p=q[r+j]||q[r+i]||q[r+g.shift_nums[i]]}if(p){p.cb(b);if(!p.propagate){b.stopPropagation();b.preventDefault();return!1}}};this.all[e.target]||(this.all[e.target]={events:{}});if(!this.all[e.target].events[e.type]){this.all[e.target].events[e.type]={callbackMap:{}};a.event.add(e.target,e.type,h)}this.all[e.target].events[e.type].callbackMap[b]={cb:d,propagate:e.propagate};return a};this.remove=function(b,c){c=c||{};target=c.target||a("html")[0];type=c.type||"keydown";b=b.toLowerCase();delete this.all[target].events[type].callbackMap[b];return a};a.hotkeys=this;return a})(jQuery);