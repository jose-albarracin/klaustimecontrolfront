import{I as L,a1 as T,S as q,i as C,s as D,C as _,L as G,M as I,n as P,h as b,a2 as E,H as V,b as X,a3 as x,z,E as S,X as A,a4 as k,a5 as B,a6 as F,o as O,D as R,a7 as J}from"./index-213b7a90.js";const K=["focus","blur","fullscreenchange","fullscreenerror","scroll","cut","copy","paste","keydown","keypress","keyup","auxclick","click","contextmenu","dblclick","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseout","mouseup","pointerlockchange","pointerlockerror","select","wheel","drag","dragend","dragenter","dragstart","dragleave","dragover","drop","touchcancel","touchend","touchmove","touchstart","pointerover","pointerenter","pointerdown","pointermove","pointerup","pointercancel","pointerout","pointerleave","gotpointercapture","lostpointercapture"];function N(n,e=[]){const s=[...K,...e];function u(l){T(n,l)}return l=>{const a=[];for(let t=0;t<s.length;t++)a.push(L(l,s[t],u));return{destroy:()=>{for(let t=0;t<a.length;t++)a[t]()}}}}function Q(n){let e,s,u,l=[{xmlns:"http://www.w3.org/2000/svg"},n[0],n[3],{contenteditable:"true"}],a={};for(let t=0;t<l.length;t+=1)a=_(a,l[t]);return{c(){e=G("svg"),this.h()},l(t){e=I(t,"svg",{xmlns:!0,contenteditable:!0}),P(e).forEach(b),this.h()},h(){E(e,a),n[1]===void 0&&V(()=>n[6].call(e))},m(t,i){X(t,e,i),n[1]!==void 0&&(e.innerHTML=n[1]),s||(u=[x(n[2].call(null,e)),L(e,"input",n[6])],s=!0)},p(t,[i]){E(e,a=z(l,[{xmlns:"http://www.w3.org/2000/svg"},i&1&&t[0],i&8&&t[3],{contenteditable:"true"}])),i&2&&t[1]!==e.innerHTML&&(e.innerHTML=t[1])},i:S,o:S,d(t){t&&b(e),s=!1,A(u)}}}function U(n,e,s){const u=["src","transformSrc"];let l=k(e,u);const a=B(),t=N(F());let{src:i}=e,{transformSrc:p=r=>r}=e;O(()=>{y(i)});let f={},h=!1,v={},g;function M(r){return new Promise((d,c)=>{const o=new XMLHttpRequest;o.open("GET",r,!0),o.onload=()=>{if(o.status>=200&&o.status<400)try{let m=new DOMParser().parseFromString(o.responseText,"text/xml").querySelector("svg");m?(m=p(m),d(m)):c(new Error('Loaded file is not valid SVG"'))}catch(w){c(w)}else c(new Error("Error loading SVG"))},o.onerror=c,o.send()})}function y(r){f[r]||(h&&(h=!1,a("unloaded")),f[r]=M(r)),f[r].then(async d=>{const c=d.attributes;for(let o=c.length-1;o>=0;o--)s(0,v[c[o].name]=c[o].value,v);s(1,g=d.innerHTML),await R(),h=!0,a("loaded")}).catch(d=>{delete f[r],console.error(d)})}function H(){g=this.innerHTML,s(1,g)}return n.$$set=r=>{e=_(_({},e),J(r)),s(3,l=k(e,u)),"src"in r&&s(4,i=r.src),"transformSrc"in r&&s(5,p=r.transformSrc)},[v,g,t,l,i,p,H]}class Z extends q{constructor(e){super(),C(this,e,U,Q,D,{src:4,transformSrc:5})}}export{Z as I};