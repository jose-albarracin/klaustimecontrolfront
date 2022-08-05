import{K as Ge,S as He,i as Ke,s as We,T as R,U,e as f,w as V,k as j,t as Me,c,a as _,x as S,d as u,m as T,h as Ae,b as o,g as xe,M as i,y as k,I as Je,V as Qe,W as C,q as B,o as M,B as A,v as Xe}from"../../../chunks/index-19f775f8.js";import{a as Fe,u as Ye}from"../../../chunks/login-868b565c.js";import{I as P}from"../../../chunks/inputs-cc0c41a8.js";import{I as Le}from"../../../chunks/inline-svg-44d6d57a.js";import{u as Ze}from"../../../chunks/employees-cfd8ebbd.js";import{f as et}from"../../../chunks/teams-7b63fc38.js";import"../../../chunks/index-3cd74ee4.js";function tt(t){let p,l,m,n,b,g,z,w,$,a,v,h,X,Y,F,s,ae,ie,G,y,le,re,H,E,oe,ue,K,I,pe,me,W,q,de,fe,x,D,ce,_e,J,L,N,ge,ne,ve,$e;n=new Le({props:{class:" w-[20px] h-[20px]",src:"/icons/arrow-left-solid.svg"}});function Ne(e){t[5](e)}let be={class:"mb-4",label:"First Name",name:"first_name",type:"text",required:!0};t[1].first_name!==void 0&&(be.value=t[1].first_name),h=new P({props:be}),R.push(()=>U(h,"value",Ne));function Oe(e){t[6](e)}let we={label:"Last Name",name:"last_name",type:"text",required:!0};t[1].last_name!==void 0&&(we.value=t[1].last_name),s=new P({props:we}),R.push(()=>U(s,"value",Oe));function Re(e){t[7](e)}let ye={class:"mb-4",label:"Phone",name:"phone",type:"number",minLength:"1",required:!0};t[1].phone!==void 0&&(ye.value=t[1].phone),y=new P({props:ye}),R.push(()=>U(y,"value",Re));function Ue(e){t[8](e)}let Ee={label:"Team",select:!0,multiselect:!0,options:t[2]};t[1].team!==void 0&&(Ee.selected=t[1].team),E=new P({props:Ee}),R.push(()=>U(E,"selected",Ue));function Ce(e){t[9](e)}let Ie={class:"mb-4",label:"Roles",select:!0,multiselect:!0,options:t[3]};t[1].roles!==void 0&&(Ie.selected=t[1].roles),I=new P({props:Ie}),R.push(()=>U(I,"selected",Ce));function Pe(e){t[10](e)}let qe={class:"mb-4",label:"Email",name:"email",type:"email",required:!0};t[1].email!==void 0&&(qe.value=t[1].email),q=new P({props:qe}),R.push(()=>U(q,"value",Pe));function ze(e){t[11](e)}let De={class:"mb-4",label:"Password",name:"password",type:"password",required:!0};return t[1].password!==void 0&&(De.value=t[1].password),D=new P({props:De}),R.push(()=>U(D,"value",ze)),N=new Le({props:{class:"text-white w-[15px] h-fit mr-3",src:"/icons/floppy-disk-solid.svg"}}),{c(){p=f("div"),l=f("div"),m=f("a"),V(n.$$.fragment),b=j(),g=f("h1"),z=Me("Edit Employee"),w=j(),$=f("div"),a=f("form"),v=f("div"),V(h.$$.fragment),Y=j(),F=f("div"),V(s.$$.fragment),ie=j(),G=f("div"),V(y.$$.fragment),re=j(),H=f("div"),V(E.$$.fragment),ue=j(),K=f("div"),V(I.$$.fragment),me=j(),W=f("div"),V(q.$$.fragment),fe=j(),x=f("div"),V(D.$$.fragment),_e=j(),J=f("div"),L=f("button"),V(N.$$.fragment),ge=Me("Save"),this.h()},l(e){p=c(e,"DIV",{class:!0});var d=_(p);l=c(d,"DIV",{class:!0});var O=_(l);m=c(O,"A",{href:!0,class:!0});var Z=_(m);S(n.$$.fragment,Z),Z.forEach(u),b=T(O),g=c(O,"H1",{class:!0});var ee=_(g);z=Ae(ee,"Edit Employee"),ee.forEach(u),O.forEach(u),w=T(d),$=c(d,"DIV",{class:!0});var Q=_($);a=c(Q,"FORM",{class:!0});var r=_(a);v=c(r,"DIV",{class:!0});var te=_(v);S(h.$$.fragment,te),te.forEach(u),Y=T(r),F=c(r,"DIV",{class:!0});var se=_(F);S(s.$$.fragment,se),se.forEach(u),ie=T(r),G=c(r,"DIV",{class:!0});var Ve=_(G);S(y.$$.fragment,Ve),Ve.forEach(u),re=T(r),H=c(r,"DIV",{class:!0});var je=_(H);S(E.$$.fragment,je),je.forEach(u),ue=T(r),K=c(r,"DIV",{class:!0});var Se=_(K);S(I.$$.fragment,Se),Se.forEach(u),me=T(r),W=c(r,"DIV",{class:!0});var Te=_(W);S(q.$$.fragment,Te),Te.forEach(u),fe=T(r),x=c(r,"DIV",{class:!0});var ke=_(x);S(D.$$.fragment,ke),ke.forEach(u),_e=T(r),J=c(r,"DIV",{class:!0});var Be=_(J);L=c(Be,"BUTTON",{class:!0,type:!0});var he=_(L);S(N.$$.fragment,he),ge=Ae(he,"Save"),he.forEach(u),Be.forEach(u),r.forEach(u),Q.forEach(u),d.forEach(u),this.h()},h(){o(m,"href","/employees"),o(m,"class","flex items-center justify-center cursor-pointer text-white bg-primary px-3 py-3 rounded-full shadow-sm"),o(g,"class","text-secondary text-3xl font-bold ml-6"),o(l,"class","flex justify-start items-center my-12 pb-6 border-b-[1px] border-tertiary/30"),o(v,"class","col-span-1 md:col-span-6"),o(F,"class","col-span-1 md:col-span-6"),o(G,"class","col-span-1 md:col-span-12"),o(H,"class","col-span-1 md:col-span-6 mb-4"),o(K,"class","col-span-1 md:col-span-6 mb-4"),o(W,"class","col-span-1 md:col-span-6"),o(x,"class","col-span-1 md:col-span-6"),o(L,"class","bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"),o(L,"type","submit"),o(J,"class","col-span-1 md:col-span-12 flex justify-center"),o(a,"class","grid grid-cols-1 md:grid-cols-12 gap-x-8"),o($,"class","w-full bg-white rounded-xl p-6 shadow-lg mb-6"),o(p,"class","container md:max-w-5xl h-max px-6 mx-auto")},m(e,d){xe(e,p,d),i(p,l),i(l,m),k(n,m,null),i(l,b),i(l,g),i(g,z),i(p,w),i(p,$),i($,a),i(a,v),k(h,v,null),i(a,Y),i(a,F),k(s,F,null),i(a,ie),i(a,G),k(y,G,null),i(a,re),i(a,H),k(E,H,null),i(a,ue),i(a,K),k(I,K,null),i(a,me),i(a,W),k(q,W,null),i(a,fe),i(a,x),k(D,x,null),i(a,_e),i(a,J),i(J,L),k(N,L,null),i(L,ge),ne=!0,ve||($e=Je(a,"submit",Qe(t[12])),ve=!0)},p(e,[d]){const O={};!X&&d&2&&(X=!0,O.value=e[1].first_name,C(()=>X=!1)),h.$set(O);const Z={};!ae&&d&2&&(ae=!0,Z.value=e[1].last_name,C(()=>ae=!1)),s.$set(Z);const ee={};!le&&d&2&&(le=!0,ee.value=e[1].phone,C(()=>le=!1)),y.$set(ee);const Q={};d&4&&(Q.options=e[2]),!oe&&d&2&&(oe=!0,Q.selected=e[1].team,C(()=>oe=!1)),E.$set(Q);const r={};!pe&&d&2&&(pe=!0,r.selected=e[1].roles,C(()=>pe=!1)),I.$set(r);const te={};!de&&d&2&&(de=!0,te.value=e[1].email,C(()=>de=!1)),q.$set(te);const se={};!ce&&d&2&&(ce=!0,se.value=e[1].password,C(()=>ce=!1)),D.$set(se)},i(e){ne||(B(n.$$.fragment,e),B(h.$$.fragment,e),B(s.$$.fragment,e),B(y.$$.fragment,e),B(E.$$.fragment,e),B(I.$$.fragment,e),B(q.$$.fragment,e),B(D.$$.fragment,e),B(N.$$.fragment,e),ne=!0)},o(e){M(n.$$.fragment,e),M(h.$$.fragment,e),M(s.$$.fragment,e),M(y.$$.fragment,e),M(E.$$.fragment,e),M(I.$$.fragment,e),M(q.$$.fragment,e),M(D.$$.fragment,e),M(N.$$.fragment,e),ne=!1},d(e){e&&u(p),A(n),A(h),A(s),A(y),A(E),A(I),A(q),A(D),A(N),ve=!1,$e()}}}async function pt({fetch:t,params:p}){Fe.set(!0);let l=p.id,m=Ge(Ye),n={method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${m.token}`}};console.log("userStore",m);const b=`${apiBackend}/api/employees/${l}`,g=await t(b,n);let w=(await g.json()).Employee,$={team:w.team.map(v=>v.title),roles:w.roles.map(v=>v.name)},a=Object.assign(w,$);if(g.ok)return Fe.set(!1),{props:{results:a}}}function st(t,p,l){let{results:m}=p;Xe(async()=>{l(4,b=await et())});let n={},b=[],g=[],z=["user","admin"];n=m;function w(s){t.$$.not_equal(n.first_name,s)&&(n.first_name=s,l(1,n))}function $(s){t.$$.not_equal(n.last_name,s)&&(n.last_name=s,l(1,n))}function a(s){t.$$.not_equal(n.phone,s)&&(n.phone=s,l(1,n))}function v(s){t.$$.not_equal(n.team,s)&&(n.team=s,l(1,n))}function h(s){t.$$.not_equal(n.roles,s)&&(n.roles=s,l(1,n))}function X(s){t.$$.not_equal(n.email,s)&&(n.email=s,l(1,n))}function Y(s){t.$$.not_equal(n.password,s)&&(n.password=s,l(1,n))}const F=async()=>{await Ze(n,m._id)};return t.$$set=s=>{"results"in s&&l(0,m=s.results)},t.$$.update=()=>{t.$$.dirty&16&&l(2,g=b.map(s=>s.title))},[m,n,g,z,b,w,$,a,v,h,X,Y,F]}class mt extends He{constructor(p){super(),Ke(this,p,st,tt,We,{results:0})}}export{mt as default,pt as load};
