(function(a){var b=function(){var a=document.getElementById("post-revisions"),b=a?a.getElementsByTagName("input"):[];a.onclick=function(){var a,d=0,e;for(a=0;a<b.length;a++){d+=b[a].checked?1:0;e=b[a].getAttribute("name");if(!b[a].checked&&("left"==e&&1>d||"right"==e&&1<d&&(!b[a-1]||!b[a-1].checked))&&(!b[a+1]||!b[a+1].checked||"right"!=b[a+1].getAttribute("name")))b[a].style.visibility="hidden";else if("left"==e||"right"==e)b[a].style.visibility="visible"}};a.onclick()};a&&a.addEventListener?a.addEventListener("load",b,!1):a&&a.attachEvent&&a.attachEvent("onload",b)})(window);