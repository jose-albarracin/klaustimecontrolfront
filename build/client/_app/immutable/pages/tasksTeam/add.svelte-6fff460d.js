import{S as qe,i as xe,s as Se,T as G,U as J,l as f,w as x,a as S,r as ye,m as c,n as m,x as j,h as u,c as A,u as we,p as o,b as je,O as r,y as O,I as Ae,V as Oe,W as P,f as B,t as C,B as H,K as Be,o as Ce}from"../../chunks/index-213b7a90.js";import{u as He}from"../../chunks/login-3638f510.js";import{c as Le}from"../../chunks/tasks-74bddac6.js";import{I as Ee}from"../../chunks/inline-svg-eb4ea3fd.js";import{g as Me}from"../../chunks/navigation-75a744b1.js";import{I as Q}from"../../chunks/inputs-abead974.js";import{b as Ue}from"../../chunks/hours-62e4a776.js";import"../../chunks/index-01a17379.js";import"../../chunks/singletons-eca981c1.js";function Fe(s){let _,n,h,a,k,b,g,$,V,i,I,v,N,R,t,p,Y,Z,L,y,ee,te,M,w,se,ne,U,E,ae,re,F,T,D,ie,X,le,ue;a=new Ee({props:{class:"w-[20px] h-[20px]",src:"/icons/arrow-left-solid.svg"}});function Ve(e){s[4](e)}let pe={class:"mb-4",minLength:"3",label:"Title",name:"title",type:"text"};s[0].title!==void 0&&(pe.value=s[0].title),v=new Q({props:pe}),G.push(()=>J(v,"value",Ve));function Ie(e){s[5](e)}let de={class:"mb-4",textarea:!0,label:"Description",name:"description",rows:"6",required:!0};s[0].description!==void 0&&(de.value=s[0].description),p=new Q({props:de}),G.push(()=>J(p,"value",Ie));function Te(e){s[6](e)}let fe={class:"mb-4",label:"Employee in charge",select:!0,multiselect:null,options:s[2]};s[1]!==void 0&&(fe.selectedValues=s[1]),y=new Q({props:fe}),G.push(()=>J(y,"selectedValues",Te));function ke(e){s[7](e)}let ce={class:"mb-4",label:"Start",name:"start",type:"date",required:!0};s[0].start!==void 0&&(ce.value=s[0].start),w=new Q({props:ce}),G.push(()=>J(w,"value",ke));function De(e){s[8](e)}let me={class:"mb-4",label:"End",name:"end",type:"date",required:!0};return s[0].end!==void 0&&(me.value=s[0].end),E=new Q({props:me}),G.push(()=>J(E,"value",De)),D=new Ee({props:{class:"text-white w-[15px] h-fit mr-3",src:"/icons/floppy-disk-solid.svg"}}),{c(){_=f("div"),n=f("div"),h=f("a"),x(a.$$.fragment),k=S(),b=f("h1"),g=ye("Add Task"),$=S(),V=f("div"),i=f("form"),I=f("div"),x(v.$$.fragment),R=S(),t=f("div"),x(p.$$.fragment),Z=S(),L=f("div"),x(y.$$.fragment),te=S(),M=f("div"),x(w.$$.fragment),ne=S(),U=f("div"),x(E.$$.fragment),re=S(),F=f("div"),T=f("button"),x(D.$$.fragment),ie=ye("Save"),this.h()},l(e){_=c(e,"DIV",{class:!0});var d=m(_);n=c(d,"DIV",{class:!0});var q=m(n);h=c(q,"A",{href:!0,class:!0});var W=m(h);j(a.$$.fragment,W),W.forEach(u),k=A(q),b=c(q,"H1",{class:!0});var K=m(b);g=we(K,"Add Task"),K.forEach(u),q.forEach(u),$=A(d),V=c(d,"DIV",{class:!0});var z=m(V);i=c(z,"FORM",{class:!0});var l=m(i);I=c(l,"DIV",{class:!0});var _e=m(I);j(v.$$.fragment,_e),_e.forEach(u),R=A(l),t=c(l,"DIV",{class:!0});var ge=m(t);j(p.$$.fragment,ge),ge.forEach(u),Z=A(l),L=c(l,"DIV",{class:!0});var ve=m(L);j(y.$$.fragment,ve),ve.forEach(u),te=A(l),M=c(l,"DIV",{class:!0});var he=m(M);j(w.$$.fragment,he),he.forEach(u),ne=A(l),U=c(l,"DIV",{class:!0});var be=m(U);j(E.$$.fragment,be),be.forEach(u),re=A(l),F=c(l,"DIV",{class:!0});var $e=m(F);T=c($e,"BUTTON",{class:!0,type:!0});var oe=m(T);j(D.$$.fragment,oe),ie=we(oe,"Save"),oe.forEach(u),$e.forEach(u),l.forEach(u),z.forEach(u),d.forEach(u),this.h()},h(){o(h,"href","/tasksTeam"),o(h,"class","flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"),o(b,"class","text-secondary text-3xl font-bold ml-6"),o(n,"class","flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"),o(I,"class","col-span-1 md:col-span-12"),o(t,"class","col-span-1 md:col-span-12"),o(L,"class","col-span-1 md:col-span-12 mb-4"),o(M,"class","col-span-1 md:col-span-6"),o(U,"class","col-span-1 md:col-span-6"),o(T,"class","bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"),o(T,"type","submit"),o(F,"class","col-span-1 md:col-span-12 flex justify-center"),o(i,"class","grid grid-cols-1 md:grid-cols-12 gap-x-8"),o(V,"class","w-full bg-white rounded-xl p-6 shadow-sm"),o(_,"class","container md:max-w-5xl px-4 mx-auto")},m(e,d){je(e,_,d),r(_,n),r(n,h),O(a,h,null),r(n,k),r(n,b),r(b,g),r(_,$),r(_,V),r(V,i),r(i,I),O(v,I,null),r(i,R),r(i,t),O(p,t,null),r(i,Z),r(i,L),O(y,L,null),r(i,te),r(i,M),O(w,M,null),r(i,ne),r(i,U),O(E,U,null),r(i,re),r(i,F),r(F,T),O(D,T,null),r(T,ie),X=!0,le||(ue=Ae(i,"submit",Oe(s[9])),le=!0)},p(e,[d]){const q={};!N&&d&1&&(N=!0,q.value=e[0].title,P(()=>N=!1)),v.$set(q);const W={};!Y&&d&1&&(Y=!0,W.value=e[0].description,P(()=>Y=!1)),p.$set(W);const K={};d&4&&(K.options=e[2]),!ee&&d&2&&(ee=!0,K.selectedValues=e[1],P(()=>ee=!1)),y.$set(K);const z={};!se&&d&1&&(se=!0,z.value=e[0].start,P(()=>se=!1)),w.$set(z);const l={};!ae&&d&1&&(ae=!0,l.value=e[0].end,P(()=>ae=!1)),E.$set(l)},i(e){X||(B(a.$$.fragment,e),B(v.$$.fragment,e),B(p.$$.fragment,e),B(y.$$.fragment,e),B(w.$$.fragment,e),B(E.$$.fragment,e),B(D.$$.fragment,e),X=!0)},o(e){C(a.$$.fragment,e),C(v.$$.fragment,e),C(p.$$.fragment,e),C(y.$$.fragment,e),C(w.$$.fragment,e),C(E.$$.fragment,e),C(D.$$.fragment,e),X=!1},d(e){e&&u(_),H(a),H(v),H(p),H(y),H(w),H(E),H(D),le=!1,ue()}}}function Ke(s,_,n){let h=Be(He),a={},k=[],b=[],g={},$={title:void 0,description:void 0,team:h.body.teamAdmin,start:void 0,end:void 0};Ce(async()=>{let t;t=await Ue(),n(3,k=await t.employeesTeam)});function V(t){s.$$.not_equal(a.title,t)&&(a.title=t,n(0,a),n(1,g),n(11,$))}function i(t){s.$$.not_equal(a.description,t)&&(a.description=t,n(0,a),n(1,g),n(11,$))}function I(t){g=t,n(1,g)}function v(t){s.$$.not_equal(a.start,t)&&(a.start=t,n(0,a),n(1,g),n(11,$))}function N(t){s.$$.not_equal(a.end,t)&&(a.end=t,n(0,a),n(1,g),n(11,$))}const R=async()=>{await Le(a),await Me("/tasksTeam")};return s.$$.update=()=>{s.$$.dirty&3&&n(0,a=Object.assign(a,{inCharge:g[0]})),s.$$.dirty&8&&n(2,b=k.map(function(t){let p={};return p.label=`${t.first_name} ${t.last_name}`,p.value=t._id,p}))},n(0,a=$),[a,g,b,k,V,i,I,v,N,R]}class Ye extends qe{constructor(_){super(),xe(this,_,Ke,Fe,Se,{})}}export{Ye as default};