(function(){function t(q){return function(){return this[q]}}
(function(q){function g(e,d,c){for(var b=0;b<d.length;b++)d[b]="weswit/"+d[b].replace(x,"");q("weswit/"+e,d,c)}var x=/^.\//;g("utility-toolkit",[],function(){return"1.0"});g("IllegalStateException",[],function(){function e(d){this.name="IllegalStateException";this.message=d}e.prototype={toString:function(){return["[",this.name,this.message,"]"].join("|")}};return e});g("Environment",["./IllegalStateException"],function(e){var d="undefined"!==typeof window&&navigator&&document,c="undefined"!==typeof importScripts,
b="object"==typeof process&&(/node(\.exe)?$/.test(process.cb)||process.hb&&process.jb);if(d&&!document.getElementById)throw new e("Not supported browser");var f={g:function(){return d},K:function(){return!b&&(d||c)},fa:function(){return!d&&b},ja:function(){return!d&&!b&&c},V:function(){if(!this.g())throw new e("Trying to load a browser-only module on non-browser environment");}};f.isBrowserDocument=f.g;f.isBrowser=f.K;f.isNodeJS=f.fa;f.isWebWorker=f.ja;f.browserDocumentOrDie=f.V;return f});g("BrowserDetection",
["./Environment"],function(e){function d(a){var b=n;return function(){null===b&&(b=-1<m.indexOf(a));return b}}function c(a){var b=n;return function(){if(null===b){b=!0;for(var f=0;f<a.length;f++)b=b&&a[f]()}return b}}function b(a,b){var f=n,c=n;return function(d,e){null===f&&(c=(f=a())?b():null);return f?d&&c?!0===e?c<=d:!1===e?c>=d:c==d:!0:!1}}function f(a){return function(){var b=a.exec(m);return b&&2<=b.length?b[1]:null}}function a(a){return function(){return!a()}}var n=e.K()?null:!1,m=e.K()?navigator.userAgent.toLowerCase():
null,k=n;e={ia:d("rekonq"),M:d("chrome/"),L:d("webkit"),Sa:d("playstation 3"),Na:function(){null===k&&(k=document.childNodes&&!document.all&&!navigator.ib&&!navigator.bb);return k},Qa:b(d("konqueror"),f(RegExp("konqueror/([0-9.]+)","g"))),ha:b(d("msie"),f(RegExp("msie\\s([0-9]+)[.;]","g"))),Pa:b(d("firefox"),f(/Firefox\/(\d+\.?\d*)/)),o:b(function(){return"undefined"!=typeof opera},function(){if(opera.version){var a=opera.version(),a=a.replace(RegExp("[^0-9.]+","g"),"");return parseInt(a)}return 7})};
e.ga=c([d("android"),e.L,a(e.M)]);e.Ra=c([e.o,d("opera mobi")]);e.Oa=c([d("safari"),function(a){var b=n;return function(){if(null===b){b=!1;for(var f=0;f<a.length;f++)b=b||a[f]()}return b}}([d("ipad"),d("iphone"),d("ipod"),c([a(e.ga),a(e.M),a(e.ia)])])]);e.isProbablyRekonq=e.ia;e.isProbablyChrome=e.M;e.isProbablyAWebkit=e.L;e.isProbablyPlaystation=e.Sa;e.isProbablyAndroidBrowser=e.ga;e.isProbablyOperaMobile=e.Ra;e.isProbablyApple=e.Oa;e.isProbablyAKhtml=e.Na;e.isProbablyKonqueror=e.Qa;e.isProbablyIE=
e.ha;e.isProbablyFX=e.Pa;e.isProbablyOldOpera=e.o;return e});g("Helpers",["./Environment"],function(e){var d=/^\s*([\s\S]*?)\s*$/,c=/,/,b=/\./,f={I:function(){return(new Date).getTime()},na:function(a){return Math.round(Math.random()*(a||1E3))},trim:function(a){return a.replace(d,"$1")},Ka:function(a,f){if(a){if(!a.replace)return a;f?(a=a.replace(b,""),a=a.replace(c,".")):a=a.replace(c,"");return new Number(a)}return 0},isArray:function(a){return a.join&&"function"==typeof a.join},i:function(a,b,
f){if(!e.g())return!1;"undefined"!=typeof a.addEventListener?a.addEventListener(b,f,!1):"undefined"!=typeof a.attachEvent&&a.attachEvent("on"+b,f);return!0}};f.getTimeStamp=f.I;f.randomG=f.na;f.trim=f.trim;f.getNumber=f.Ka;f.isArray=f.isArray;f.addEvent=f.i;return f});g("CookieManager",["./Helpers","./Environment"],function(e,d){var c=!1,b={l:function(){return c},$:function(){return this.l()?document.cookie.toString():null},sa:function(b,a){this.ta(b,a,"")},ta:function(b,a,c){this.l()&&(document.cookie=
encodeURIComponent(b)+"\x3d"+a+"; "+c+"path\x3d/;")},Q:function(b){if(!this.l())return null;b=encodeURIComponent(b)+"\x3d";for(var a=this.$(),a=a.split(";"),c=0;c<a.length;c++)if(a[c]=e.trim(a[c]),0==a[c].indexOf(b))return a[c].substring(b.length,a[c].length);return null},oa:function(b){if(this.l()){var a=new Date;a.setTime(a.getTime()-864E5);this.ta(b,"deleting","expires\x3d"+a.toGMTString()+"; ")}},za:function(){if(d.g()&&"file:"!=document.location.protocol){c=!0;var b="LS__cookie_test"+e.na();
this.sa(b,"testing");var a=this.Q(b);if("testing"==a&&(this.oa(b),a=this.Q(b),null==a))return;c=!1}}};b.za();b.areCookiesEnabled=b.l;b.getAllCookiesAsSingleString=b.$;b.writeCookie=b.sa;b.removeCookie=b.oa;b.readCookie=b.Q;return b});g("List",[],function(){function e(){this.data=[]}e.prototype={add:function(d){this.data.push(d)},remove:function(d){for(var c=0;c<this.data.length;c++)if(this.data[c]==d)return this.data.splice(c,1),!0;return!1},forEach:function(d){for(var c=0;c<this.data.length;c++)d(this.data[c])},
C:function(){return[].concat(this.data)},m:function(){this.data=[]}};e.prototype.add=e.prototype.add;e.prototype.remove=e.prototype.remove;e.prototype.forEach=e.prototype.forEach;e.prototype.asArray=e.prototype.C;e.prototype.clean=e.prototype.m;return e});g("EnvironmentStatus",["./Helpers","./BrowserDetection","./Environment","./List"],function(e,d,c,b){function f(a,b,c,f,d){return function(){a[b]||(a[c]=!0,f.forEach(function(a){try{if(a[d])a[d]();else a()}catch(b){}}),"preunloading"!=b&&f.m(),a[b]=
!0,a[c]=!1)}}function a(a,b){setTimeout(function(){if(a[b])a[b]();else a()},0)}function n(a,b,c,f){setTimeout(function(){c?f?a.apply(c,f):a.apply(c):f?a.apply(null,f):a()},b)}function m(){r=!0}var k=new b,u=new b,g=new b,r=!1,s={p:"onloadDone",la:"onloadInprogress",t:"unloaded",T:"unloading",ma:"preunloading"};b={};for(var h in s)b[s[h]]=h;h={p:!1,la:!1,t:!1,T:!1,ma:!1,eb:t("p"),fb:t("t"),gb:t("T"),wa:function(b){this.La()?u.add(b):a(b,"onloadEvent")},U:function(b){this.Ma()?k.add(b):a(b,"unloadEvent")},
va:function(b){g.add(b);this.ma&&a(b,"preUnloadEvent")},Wa:function(a){u.remove(a)},Ya:function(a){k.remove(a)},Va:function(a){g.remove(a)},La:function(){return!(this.p||this.la)},Ma:function(){return!(this.t||this.T)},xa:function(){e.i(window,"unload",this.Aa);e.i(window,"beforeunload",this.ya);if(document&&"undefined"!=typeof document.readyState){if("COMPLETE"==document.readyState.toUpperCase()){this.u();return}n(this.X,1E3,this)}else if(this.ea()){this.u();return}if(!e.i(window,"load",this.w))this.u();
else if(d.o()){var a=!1;d.o(9,!1)&&(a=!0,e.i(document,"DOMContentLoaded",m));n(this.W,1E3,this,[a])}},u:function(){n(this.w,0)},X:function(){this.p||("COMPLETE"==document.readyState.toUpperCase()?this.w():n(this.X,1E3,this))},W:function(a){this.p||(r||!a&&this.ea()?this.w():n(this.W,1E3,this,[a]))},ea:function(){return"undefined"!=typeof document.getElementsByTagName&&"undefined"!=typeof document.getElementById&&(null!=document.getElementsByTagName("body")[0]||null!=document.body)}};h.w=f(h,b.onloadDone,
b.onloadInprogress,u,"onloadEvent");h.Aa=f(h,b.unloaded,b.unloading,k,"unloadEvent");h.ya=f(h,b.preunloading,b.preunloading,g,"preUnloadEvent");c.g()?h.xa():h.u();h.addOnloadHandler=h.wa;h.addUnloadHandler=h.U;h.addBeforeUnloadHandler=h.va;h.removeOnloadHandler=h.Wa;h.removeUnloadHandler=h.Ya;h.removeBeforeUnloadHandler=h.Va;return h});g("Executor",["./Helpers","./EnvironmentStatus","./Environment"],function(e,d,c){function b(){}function f(a,b){return a.time===b.time?a.P-b.P:a.time-b.time}function a(){w=
!1;m()}function n(){h?clearInterval(h):c.g()&&"undefined"!=typeof postMessage?(b=function(){window.postMessage("Lightstreamer.run",v)},e.i(window,"message",function(b){("Lightstreamer.run"==b.data&&"*"==v||b.origin==v)&&a()},!0)):c.fa()&&("undefined"!=typeof process&&process.Ta)&&(b=function(){process.Ta(a)});h=setInterval(m,k)}function m(){if(d.t)clearInterval(h);else{r=e.I();if(0<p.length){g&&(p.sort(f),g=!1);for(var a;0<p.length&&p[0].time<=r&&!d.t;)a=p.shift(),a.b&&(l.n(a),a.step&&s.push(a))}for(0>=
p.length&&(q=0);0<s.length;)a=s.shift(),a.P=q++,l.c(a,a.step,!0)}}var k=50,g=!1,p=[],r=e.I(),s=[],h=null,q=0,v=c.g()&&"file:"!=document.location.protocol?document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:""):"*",w=!1,l={toString:function(){return["[|Executor",k,p.length,"]"].join("|")},H:function(){return p.length},q:function(a,b,c){return{b:a,e:b||null,h:c||null,P:q++}},c:function(a,b,c){a.step=c?b:null;a.time=r+parseInt(b);if(isNaN(a.time))throw"Executor error time: "+
a.time;p.push(a);g=!0},B:function(a,b,c,f){return this.d(a,b,c,f,!0)},R:function(a){a&&(a.b=null,a.step=null)},d:function(a,c,f,d,e){a=this.q(a,f,d);this.c(a,c,e);0!=c||w||(w=!0,b());return a},O:function(a,b,c){a.h[b]=c},N:function(a,b){a.h=b},F:function(a,b){a.time+=b;g=!0},n:function(a,b){try{var c=b||a.h;a.e?c?a.b.apply(a.e,c):a.b.apply(a.e):c?a.b.apply(null,c):a.b()}catch(f){}}};c.ja()?setTimeout(n,1):n();l.getQueueLength=l.H;l.packTask=l.q;l.addPackedTimedTask=l.c;l.addRepetitiveTask=l.B;l.stopRepetitiveTask=
l.R;l.addTimedTask=l.d;l.modifyTaskParam=l.O;l.modifyAllTaskParams=l.N;l.delayTask=l.F;l.executeTask=l.n;return l});g("Dismissable",["./Executor"],function(e){function d(){this.da()}d.prototype={m:function(){},da:function(c){this.S=this.k=0;this.timeout=c||5E3},ab:function(c){c==this.S&&0>=this.k&&this.m()},Ca:function(){this.k--;0>=this.k&&e.d(this.ab,this.timeout,this,[this.S])},Za:function(){this.S++;0>this.k&&(this.k=0);this.k++}};d.prototype.touch=d.prototype.Za;d.prototype.dismiss=d.prototype.Ca;
d.prototype.clean=d.prototype.m;d.prototype.initTouches=d.prototype.da;return d});g("Inheritance",["./IllegalStateException"],function(e){function d(b,c,a){if(c)return a?c.apply(b,a):c.apply(b)}var c={ua:function(b,f,a,d){for(var m in f.prototype)if(!b.prototype[m])b.prototype[m]=f.prototype[m];else if(d){var k;a:{k=f.prototype;var g=void 0;for(g in k)if(k[m]==k[g]&&m!=g){k=g;break a}k=null}if(k){if(b.prototype[k]&&b.prototype[k]!==b.prototype[m]&&f.prototype[k]!==f.prototype[k])throw new e("Can't solve alias collision, try to minify the classes again ("+
k+", "+m+")");b.prototype[k]=b.prototype[m]}}a||(b.prototype._super_=f,b.prototype._callSuperConstructor=c._callSuperConstructor,b.prototype._callSuperMethod=c._callSuperMethod)},_callSuperMethod:function(b,c,a){return d(this,b.prototype._super_.prototype[c],a)},_callSuperConstructor:function(b,c){d(this,b.prototype._super_,c)}};return c.ua});g("Matrix",[],function(){function e(d){this.a=d||{}}e.prototype={J:function(d,c,b){this.a[c]||(this.a[c]={});this.a[c][b]=d},get:function(d,c){return this.a[d]&&
"undefined"!=typeof this.a[d][c]?this.a[d][c]:null},v:function(d,c){if(this.a[d]){this.a[d][c]&&delete this.a[d][c];for(var b in this.a[d])return;delete this.a[d]}},insertRow:function(d,c){this.a[c]=d},ba:function(d){return this.a[d]?this.a[d]:null},D:function(d){this.a[d]&&delete this.a[d]},Ha:t("a")};e.prototype.insert=e.prototype.J;e.prototype.get=e.prototype.get;e.prototype.del=e.prototype.v;e.prototype.insertRow=e.prototype.insertRow;e.prototype.getRow=e.prototype.ba;e.prototype.delRow=e.prototype.D;
e.prototype.getEntireMatrix=e.prototype.Ha;return e});g("DoubleKeyMatrix",["./Inheritance","./Matrix"],function(e,d){function c(){this._callSuperConstructor(c);this.r={}}c.prototype={J:function(b,f,a){"undefined"==typeof this.r[a]&&(this.r[a]=f,this._callSuperMethod(c,"insert",[b,f,a]))},v:function(b,f){this._callSuperMethod(c,"del",[b,f]);delete this.r[f]},Ba:function(b){var c=this.r[b];"undefined"!=typeof c&&this.v(c,b)},D:function(b){var d=this.ba(b),a;for(a in d)delete this.r[a];this._callSuperMethod(c,
"delRow",[b])}};c.prototype.insert=c.prototype.J;c.prototype.del=c.prototype.v;c.prototype.delReverse=c.prototype.Ba;c.prototype.delRow=c.prototype.D;e(c,d);return c});g("IllegalArgumentException",[],function(){function e(d){this.name="IllegalArgumentException";this.message=d}e.prototype={toString:function(){return["[",this.name,this.message,"]"].join("|")}};return e});g("DoubleKeyMap",["./IllegalArgumentException"],function(e){function d(){this.map={};this.s={}}function c(a){return null!==a&&"undefined"!=
typeof a}function b(a,b,d){var f=a[d];c(f)&&(delete a[d],delete b[f])}function f(a,b){for(var c in a)b(c,a[c])}d.prototype={set:function(a,b){var d=this.map,f=this.s;if(!c(a)||!c(b))throw new e("values can't be null nor missing");var g=d[a],p=f[b];c(g)?g!==b&&(c(p)?(d[p]=g,d[a]=b,f[b]=a,f[g]=p):(delete f[d[a]],d[a]=b,f[b]=a)):c(p)?(delete d[f[b]],f[b]=a,d[a]=b):(d[a]=b,f[b]=a)},remove:function(a){b(this.map,this.s,a)},Xa:function(a){b(this.s,this.map,a)},get:function(a){return this.map[a]},aa:function(a){return this.s[a]},
Ea:function(a){return"undefined"!=typeof this.get(a)},Fa:function(a){return"undefined"!=typeof this.aa(a)},forEach:function(a){f(this.map,a)},Ga:function(a){f(this.s,a)}};d.prototype.set=d.prototype.set;d.prototype.remove=d.prototype.remove;d.prototype.removeReverse=d.prototype.Xa;d.prototype.get=d.prototype.get;d.prototype.getReverse=d.prototype.aa;d.prototype.exist=d.prototype.Ea;d.prototype.existReverse=d.prototype.Fa;d.prototype.forEach=d.prototype.forEach;d.prototype.forEachReverse=d.prototype.Ga;
return d});g("EventDispatcher",["./Executor","./List","./Inheritance"],function(e,d,c){function b(){this._callSuperConstructor(b)}function f(){this.ca()}f.prototype={ca:function(){this.A=new b;this.ra=!1},addListener:function(a){a&&(a={f:a,ka:!0},this.A.add(a),this.G("onListenStart",[this],a,!0))},removeListener:function(a){a&&(a=this.A.remove(a))&&this.G("onListenEnd",[this],a,!0)},Ja:function(){return this.A.C()},$a:function(a){this.ra=!0===a},G:function(a,b,c,d){this.ra?this.Z(a,b,c,!0):e.d(this.Z,
0,this,[a,b,c,d])},Z:function(a,b,c,d){if(c&&c.f[a]&&(d||c.ka))try{b?c.f[a].apply(c.f,b):c.f[a].apply(c.f)}catch(f){}},dispatchEvent:function(a,b){var c=this;this.A.forEach(function(d){c.G(a,b,d,!1)})}};f.prototype.initDispatcher=f.prototype.ca;f.prototype.addListener=f.prototype.addListener;f.prototype.removeListener=f.prototype.removeListener;f.prototype.getListeners=f.prototype.Ja;f.prototype.useSynchEvents=f.prototype.$a;f.prototype.dispatchEvent=f.prototype.dispatchEvent;b.prototype={remove:function(a){for(var b=
0;b<this.data.length;b++)if(this.data[b].f==a)return a=this.data[b],a.ka=!1,this.data.splice(b,1),a;return!1},C:function(){var a=[];this.forEach(function(b){a.push(b.f)});return a}};c(b,d);return f});g("ExecutorSimple",[],function(){function e(b){return function(){b.j?(b.time=b.j,b.j=0,c.c(b,b.time,!1)):(c.n(b),b.qa||d--)}}var d=0,c={toString:function(){return"[|ExecutorSimple|]"},H:function(){return d},q:function(b,c,a){return{b:b,e:c||null,h:a||null}},c:function(b,c,a){b.time=c;if(isNaN(b.time))throw"ExecutorSimple error time: "+
b.time;b.qa=a;d++;b.Ua=a?setInterval(e(b),b.time):setTimeout(e(b),b.time)},B:function(b,c,a,d){return this.d(b,c,a,d,!0)},R:function(b){b&&(clearInterval(b.Ua),d--)},d:function(b,c,a,d,e){b=this.q(b,a,d);this.c(b,c,e);return b},O:function(b,c,a){b.h[c]=a},N:function(b,c){b.h=c},F:function(b,c){if(b.qa)throw"Can't delay repetitive tasks";b.j||(b.j=0);b.j+=c},n:function(b,c){try{var a=c||b.h;b.e?a?b.b.apply(b.e,a):b.b.apply(b.e):a?b.b.apply(null,a):b.b()}catch(d){}}};c.getQueueLength=c.H;c.packTask=
c.q;c.addPackedTimedTask=c.c;c.addRepetitiveTask=c.B;c.stopRepetitiveTask=c.R;c.addTimedTask=c.d;c.modifyTaskParam=c.O;c.modifyAllTaskParams=c.N;c.delayTask=c.F;c.executeTask=c.n;return c});g("IFrameHandler",["./BrowserDetection","./EnvironmentStatus","./Environment"],function(e,d,c){c.V();var b=e.L()?null:"about:blank",f={};c={Y:function(a,c){var d=document.getElementsByTagName("BODY")[0];if(!d)return null;c=c||b;var g=document.createElement("iframe");g.style.visibility="hidden";g.style.height="0px";
g.style.width="0px";g.style.display="none";g.name=a;g.id=a;e.ha()||e.o()?(g.src=c,d.appendChild(g)):(d.appendChild(g),g.src=c);try{if(g.contentWindow){try{g.contentWindow.name=a}catch(q){}f[a]=g.contentWindow;return f[a]}return document.frames&&document.frames[a]?(f[a]=document.frames[a],f[a]):null}catch(p){return null}},Ia:function(a,b,c){b&&!f[a]&&this.Y(a,c);return f[a]||null},Da:function(a){if(f[a]){try{document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))}catch(b){}delete f[a]}},
pa:function(){for(var a in f)try{document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(a))}catch(b){}f={}}};c.createFrame=c.Y;c.getFrameWindow=c.Ia;c.disposeFrame=c.Da;c.removeFrames=c.pa;d.U(c.pa);return c});g("Setter",["./IllegalArgumentException"],function(e){function d(){}d.prototype.checkPositiveNumber=function(c,b,d){var a=new Number(c);if(isNaN(a))throw new e("The given value is not valid. Use a number");if(!d&&a!=Math.round(a))throw new e("The given value is not valid. Use an integer");
if(b){if(0>c)throw new e("The given value is not valid. Use a positive number or 0");}else if(0>=c)throw new e("The given value is not valid. Use a positive number");return a};d.prototype.checkBool=function(c,b){if(!0===c||!1===c||b&&!c)return!0===c;throw new e("The given value is not valid. Use true or false");};return d})})(define);}());
//# sourceMappingURL=utility-toolkit.js.map