function passwordStrength(a,b,c){var d=1,e=2,f=3,g=4,h=5,i=0,j,k;if(a!=c&&c.length>0)return h;if(a.length<4)return d;if(a.toLowerCase()==b.toLowerCase())return e;a.match(/[0-9]/)&&(i+=10);a.match(/[a-z]/)&&(i+=26);a.match(/[A-Z]/)&&(i+=26);a.match(/[^a-zA-Z0-9]/)&&(i+=31);j=Math.log(Math.pow(i,a.length));k=j/Math.LN2;return k<40?e:k<56?f:g};