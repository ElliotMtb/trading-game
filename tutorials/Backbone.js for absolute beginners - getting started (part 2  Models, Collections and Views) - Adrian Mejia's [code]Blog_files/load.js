(function(){function x(){}function y(a,b){return 0==ha.call(a).indexOf("[object "+b)}function t(a){return a&&"/"==a.charAt(a.length-1)?a.substr(0,a.length-1):a}function B(a,b){var c,e,d,f;c=1;e=a;b&&(e=e.replace(ia,function(a,b,e,d){e&&c++;f=k;return d||""}));if(f){d=b.split("/");if(c>d)throw Error("attempt to access module beyond root of package: "+a);d.splice(d.length-c,c);return d.concat(e||[]).join("/")}return e}function l(a){var b=a.indexOf("!");return{M:a.substr(b+1),i:0<=b&&a.substr(0,b)}}
function N(){}function q(a,b){N.prototype=a||O;var c=new N;N.prototype=O;for(var e in b)c[e]=b[e];return c}function n(){function a(a,b,d){e.push([a,b,d])}function b(a,b){for(var d,c=0;d=e[c++];)(d=d[a])&&d(b)}var c,e,d;c=this;e=[];d=function(f,c){a=f?function(a){a&&a(c)}:function(a,b){b&&b(c)};d=x;b(f?0:1,c);b=x;e=p};this.t=function(b,d,e){a(b,d,e)};this.f=function(a){c.s=a;d(k,a)};this.d=function(a){c.ga=a;d(z,a)};this.p=function(a){b(2,a)}}function u(a,b,c,e){a instanceof n?a.t(b,c,e):b(a)}function D(a,
b,c){var e;return function(){0<=--a&&b&&(e=b.apply(p,arguments));0==a&&c&&c(e);return e}}function E(){function a(b,d,c,g){var i;i=h.g(j,p,[].concat(b));this.then=b=function(a,b){u(i,function(b){a&&a.apply(p,b)},function(a){if(b)b(a);else throw a;});return this};this.next=function(b,d,e){return new a(b,d,e,i)};d&&b(d,c);u(g,function(){h.h(i)})}var b=[].slice.call(arguments),c;y(b[0],"Object")&&(c=b.shift(),j=h.b(c,j),h.v(c));return new a(b[0],b[1],b[2])}function T(a){var b=a.id;if(b==p)if(F!==p)F=
{C:"Multiple anonymous defines in url"};else if(!(b=h.$()))F=a;if(b!=p){var c=o[b];b in o||(c=h.j(b,j).b,c=o[b]=h.z(c,b));if(!(c instanceof n))throw Error("duplicate define: "+b);c.fa=z;h.A(c,a)}}function ja(a){try{return eval(a)}catch(b){}}function U(){var a;a=v[ka]("link");a.rel="stylesheet";a.type="text/css";return a}function la(a,b,c){V.push({url:a,P:b,S:function(){c(Error(W))}});a=X.shift();!a&&Y.length<ma&&(a=v.createElement("style"),Y.push(a),I.appendChild(a));a&&P(a)}function P(a){var b;(b=
V.shift())?(a.onload=function(){b.P();P(a)},a.onerror=function(){b.S();P(a)},a.styleSheet.addImport(b.url)):(a.onload=a.onerror=C,X.push(a))}function Z(a,b,c){if(!G.load){var e,d,f;if(!a.href||v.readyState&&"complete"!=v.readyState)e=z;else{e=z;try{if(d=a.sheet)f=d.cssRules,e=null===f,!e&&"length"in f&&(d.insertRule("-curl-css-test {}",0),d.deleteRule(0),e=k)}catch(g){e=/security|denied/i.test(g.message)}}e?c():a.onload==C||!a.onload||aa(function(){Z(a,b,c)},b)}}function na(a,b,c,e){function d(){if(f.onload!=
C&&f.onload){f.onload=f.onerror=C;var a=function(){!v.readyState||"complete"==v.readyState?b():aa(a,10)};a()}}var f;f=U();f.onload=function(){G.load=G.load||k;d()};Z(f,e,d);f.onerror=function(){G.error=G.error||k;f.onload!=C&&f.onload&&(f.onload=f.onerror=C,c(Error(W)))};f.href=a;I.appendChild(f)}function C(){}var k=!0,z=!1,w=this.window||global,j,J,Q,K=w.document,R=K&&(K.head||K.getElementsByTagName("head")[0]),oa=R&&R.getElementsByTagName("base")[0]||null,ba={},ca={},L={},pa="addEventListener"in
w?{}:{loaded:1,complete:1},O={},ha=O.toString,p,o={},M=z,F,qa=/\?/,da=/^\/|^[^:]+:\/\//,ia=/(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g,ra=/\/\*[\s\S]*?\*\/|(?:[^\\])\/\/.*?[\n\r]/g,sa=/require\s*\(\s*["']([^"']+)["']\s*\)|(?:[^\\]?)(["'])/g,S,h;h={O:function(a,b){return h.m(B(a,b))},m:function(a,b){return b.c&&a in b.c&&b.c[a].ba||a},n:function(a,b){a&&b.K&&0>a.indexOf("/")&&(a=t(b.K)+"/"+a);return a},g:function(a,b,c,e){function d(b){return h.m(B(b,g.id),a)}function f(b,c,f){var m,ea;m=c&&function(a){c.apply(p,
a)};if(y(b,"String")){b=d(b);f=o[b];ea=f instanceof n&&f.a;if(!(b in o))throw Error("Module not resolved: "+b);if(m)throw Error("require(id, callback) not allowed");return ea||f}u(h.h(h.g(a,g.id,b,e)),m,f)}var g;g=new n;g.id=b||"";g.aa=e;g.B=c;g.b=a;g.q=f;f.toUrl=function(b){return h.j(d(b),a).url};g.O=d;return g},z:function(a,b,c){var e,d,f;e=h.g(a,b,p,c);d=e.f;f=D(1,function(a){e.l=a;try{return h.T(e)}catch(b){e.d(b)}});e.f=function(a){u(c||M,function(){d(o[e.id]=f(a))})};e.D=function(a){u(c||M,
function(){e.a&&(f(a),e.p(ca))})};return e},Q:function(a,b,c,e){return h.g(a,c,p,e)},Z:function(a){return a.q},F:function(a){return a.a||(a.a={})},Y:function(a){var b=a.o;b||(b=a.o={id:a.id,uri:h.G(a),exports:h.F(a),config:function(){return a.b}},b.a=b.exports);return b},G:function(a){return a.url||(a.url=h.w(a.q.toUrl(a.id)),a.b)},b:function(a){var b,c,e,d,f,g;b=!a;a&&(h.b=h.J);a||(a={});e=a.apiName||"curl";d=a.apiContext||w;f=a.defineName||"define";g=a.defineContext||w;c=a.overwriteApi;!b&&J&&(w.curl=
J,J=z);if(!b&&!c&&d[e]&&d[e]!=E)throw Error(e+" already exists");d[e]=E;if(!b||!w.define){if(!b&&!c&&f in g&&g[f]!=Q)throw Error(f+" already exists");g[f]=Q=function(){var a=h.X(arguments);T(a)};Q.amd={plugins:k,jQuery:k,curl:"0.7.0"}}return h.J(a)},J:function(a,b){function c(a,b){var e,c,g,A,i;for(i in a){g=a[i];g.name=g.id||g.name||i;A=d;c=l(t(g.name||i));e=c.M;if(c=h.n(c.i,d))(A=f[c])||(A=f[c]=q(d),A.c=q(d.c),A.e=[]),delete a[i];if(b){c=g;var H=void 0;c.path=t(c.path||c.location||"");H=t(c.main)||
"main";"."!=H.charAt(0)&&(H="./"+H);c.ba=B(H,c.name+"/");c.b=c.config;c.b&&(c.b=q(d,c.b))}else c={path:t(g)};c.N=e.split("/").length;e?(A.c[e]=c,A.e.push(e)):A.u=h.L(g,d)}}function e(a){var b=a.c;a.da=RegExp("^("+a.e.sort(function(a,c){return b[c].N-b[a].N}).join("|").replace(/\/|\./g,"\\$&")+")(?=\\/|$)");delete a.e}var d,f,g;b||(b={});d=q(b,a);d.u=d.baseUrl||"";d.K=d.pluginPath||"curl/plugin";d.R=RegExp(d.dontAddFileExt||qa);d.c=q(b.c);f=a.plugins||{};d.plugins=q(b.plugins);for(g in f)d.plugins[h.n(g,
d)]=f[g];f=d.plugins;d.e=[];c(a.paths,z);c(a.packages,k);for(g in f){f[g]=q(d,f[g]);var i=f[g].e;i&&(f[g].e=i.concat(d.e),e(f[g]))}e(d);return d},v:function(a){var b;(b=a&&a.preloads)&&0<b.length&&u(M,function(){M=h.h(h.g(j,p,b,k))})},j:function(a,b){var c,e,d,f;c=b.c;d=da.test(a)?a:a.replace(b.da,function(a){e=c[a]||{};f=e.b;return e.path||""});return{b:f||j,url:h.L(d,b)}},L:function(a,b){var c=b.u;return c&&!da.test(a)?t(c)+"/"+a:a},w:function(a,b){return a+((b||j).R.test(a)?"":".js")},H:function(a,
b,c){var e=K.createElement("script");e.onload=e.onreadystatechange=function(c){c=c||w.event;if("load"==c.type||pa[e.readyState])delete L[a.id],e.onload=e.onreadystatechange=e.onerror="",b()};e.onerror=function(){c(Error("Syntax or http error: "+a.url))};e.type=a.I||"text/javascript";e.charset="utf-8";e.async=!a.ca;e.src=a.url;L[a.id]=e;R.insertBefore(e,oa);return e},U:function(a){var b=[],c;("string"==typeof a?a:a.toSource?a.toSource():a.toString()).replace(ra,"").replace(sa,function(a,d,f){f?c=c==
f?p:c:c||b.push(d);return""});return b},X:function(a){var b,c,e,d,f,g;f=a.length;e=a[f-1];d=y(e,"Function")?e.length:-1;2==f?y(a[0],"Array")?c=a[0]:b=a[0]:3==f&&(b=a[0],c=a[1]);!c&&0<d&&(g=k,c=["require","exports","module"].slice(0,d).concat(h.U(e)));return{id:b,l:c||[],r:0<=d?e:function(){return e},k:g}},T:function(a){var b;b=a.r.apply(a.k?a.a:p,a.l);b===p&&a.a&&(b=a.o?a.a=a.o.a:a.a);return b},A:function(a,b){a.r=b.r;a.k=b.k;a.B=b.l;h.h(a)},h:function(a){function b(a,b,c){g[b]=a;c&&s(a,b)}function c(b,
c){var e,d,f,g;e=D(1,function(a){d(a);m(a,c)});d=D(1,function(a){s(a,c)});f=h.V(b,a);(g=f instanceof n&&f.a)&&d(g);u(f,e,a.d,a.a&&function(a){f.a&&(a==ba?d(f.a):a==ca&&e(f.a))})}function e(){a.f(g)}var d,f,g,i,r,s,m;g=[];f=a.B;i=f.length;0==f.length&&e();s=D(i,b,function(){a.D&&a.D(g)});m=D(i,b,e);for(d=0;d<i;d++)r=f[d],r in S?(m(S[r](a),d,k),a.a&&a.p(ba)):r?c(r,d):m(p,d,k);return a},W:function(a){h.G(a);h.H(a,function(){var b=F;F=p;a.fa!==z&&(!b||b.C?a.d(Error(b&&b.C||"define() missing or duplicated: "+
a.url)):h.A(a,b))},a.d);return a},V:function(a,b){var c,e,d,f,g,i,r,s,m,k;c=b.O;e=b.aa;m=b.b||j;d=l(a);i=d.M;f=d.i?h.m(h.n(B(d.i,b.id),m),m):c(i);r=h.j(f,m);if(d.i)g=f;else if(g=r.b.moduleLoader)i=f,f=g,r=h.j(g,m);d=o[f];f in o||(d=o[f]=h.z(r.b,f,e),d.url=h.w(r.url,d.b),h.W(d));f==g&&(s=new n,k=m.plugins[g]||m,u(d,function(a){var b,d,f;f=a.dynamic;i="normalize"in a?a.normalize(i,c,k)||"":c(i);d=g+"!"+i;b=o[d];if(!(d in o)){b=h.Q(k,d,i,e);f||(o[d]=b);var r=function(a){b.f(a);f||(o[d]=a)};r.resolve=
r;r.reject=r.error=b.d;a.load(i,b.q,r,k)}s!=b&&u(b,s.f,s.d,s.p)},s.d));return s||d},$:function(){var a;if(!y(w.opera,"Opera"))for(var b in L)if("interactive"==L[b].readyState){a=b;break}return a}};S={require:h.Z,exports:h.F,module:h.Y};E.version="0.7.0";j=w.curl;"function"==typeof j?(J=j,j=z):w.curl=p;j=h.b(j);h.v(j);o.curl=E;o["curl/_privileged"]={core:h,cache:o,config:function(){return j},_define:T,_curl:E,Promise:n};var fa=this.document;define("curl/plugin/js",["curl/_privileged"],function(a){function b(b,
c,d){function e(){g||(f<new Date?d():setTimeout(e,10))}var f,g,h;f=(new Date).valueOf()+(b.ea||3E5);d&&b.a&&setTimeout(e,10);h=a.core.H(b,function(){g=k;b.a&&(b.s=ja(b.a));!b.a||b.s?c(h):d()},function(a){g=k;d(a)})}function c(a,e){b(a,function(){var b=d.shift();h=0<d.length;b&&c.apply(null,b);e.f(a.s||k)},function(a){e.d(a)})}var e={},d=[],f=fa&&fa.createElement("script").async==k,g,h;g=a.Promise;return{dynamic:k,load:function(a,s,m,l){function p(a){(m.error||function(a){throw a;})(a)}var j,o,q,u,
n;j=0<a.indexOf("!order");o=a.indexOf("!exports=");q=0<o&&a.substr(o+9);u="prefetch"in l?l.prefetch:k;a=j||0<o?a.substr(0,a.indexOf("!")):a;n=s.toUrl(a.lastIndexOf(".")<=a.lastIndexOf("/")?a+".js":a);n in e?e[n]instanceof g?e[n].t(m,p):m(e[n]):(a={name:a,url:n,ca:j,a:q,ea:l.timeout},e[n]=s=new g,s.t(function(a){e[n]=a;m(a)},p),j&&!f&&h?(d.push([a,s]),u&&(a.I="text/cache",b(a,function(a){a&&a.parentNode.removeChild(a)},function(){}),a.I="")):(h=h||j,c(a,s)))}}});var ka="createElement",aa=this.setTimeout,
v=this.document,I,ta=v&&v.createStyleSheet&&!(10<=v.documentMode),Y=[],X=[],V=[],ma=12,ga,W="HTTP or network error.",G={};v&&(I=v.head||v.getElementsByTagName("head")[0],ga=ta?la:na);define("curl/plugin/css",{normalize:function(a,b){var c,e;if(!a)return a;c=a.split(",");e=[];for(var d=0,f=c.length;d<f;d++)e.push(b(c[d]));return e.join(",")},load:function(a,b,c,e){function d(){0==--k&&c()}function f(a){(c.d||function(a){throw a;})(a)}var g,h,k,j;g=(a||"").split(",");h=e.cssWatchPeriod||50;e=e.cssNoWait;
k=g.length;for(j=0;j<g.length;j++){var a=g[j],m,a=b.toUrl(a.lastIndexOf(".")<=a.lastIndexOf("/")?a+".css":a);e?(m=U(),m.href=a,I.appendChild(m),d()):ga(a,d,f,h)}},"plugin-builder":"./builder/css",pluginBuilder:"./builder/css"})}).call(this);
(function(x){var y=x.document,t=function(l){for(var t={},l=l.substr(1).split("&"),q=l.length-1;q>=0;q--){var n=l[q].split("=");t[n[0]]=decodeURIComponent((n[1]||"").replace(/\+/g,"%20"))}return t}(location.search);if(t.n_s)y.documentElement.className+=" not-supported type-"+t.n_s;else{x.jsonData=function(){var l=y.getElementById("disqus-jsonData");return l.textContent||l.innerHTML}();var B=function(){var l=[],t=!1;if(DISQUS.config&&DISQUS.config.switches)for(var q=0,n=DISQUS.config.switches.length;q<
n;q++)if(DISQUS.config.switches[q]=="next_use_jquery"){t=!0;break}t||x.name.indexOf("hiro_fixture")>-1?l.push("js!build/next/lib.js!order"):l.push("js!build/next/lib.ender.js!order");l.push("js!build/next/lounge/client.js!order");l.push("css!build/next/styles/lounge.css");l.push("js!build/next/templates/lounge.js!order");curl(l).then(function(){var l=JSON.parse(x.jsonData);l.code?($("#postCompatContainer").hide(),$("#error").show(),DISQUS.Bus.sendHostMessage("fail",l)):(new DISQUS.next.views.Lounge({jsonData:l,
el:y.body}),DISQUS.next.lounge.tracking.init(DISQUS.next.views.Lounge.getInstance()))})};x.onload=function(){curl({baseUrl:x.location.protocol=="https:"?"https://securecdn.disqus.com/1374861922":"http://mediacdn.disqus.com/1374861922"});curl(["js!/next/config.js?forum="+t.f+"!order"]).then(B)}}})(window);