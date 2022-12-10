import{u as k,_ as R,w as $e,a as G,E as O,b as te,r as pe,h as Ge,T as Ke,c as be,i as ne,t as ue,d as Ue,e as Je,f as Be,g as Ae,j as we,k as _e,m as Ze,l as Qe,n as Xe,o as Ye,p as et,q as tt,s as nt}from"./el-popper.b287d1f1.js";import{i as me,a as Se,d as y,o as w,c as ye,w as f,r as T,m as Pe,t as ot,u as S,T as Ne,b as st,e as d,f as z,n as L,g as Me,h as re,j as $,k as Ce,l as oe,p as ge,q as xe,s as Oe,v as C,x as Z,y as at,z as lt,F as Ie,A as Ee,B as ut,C as rt,D as it,E as ct,G as ze,H as q,I as N,J as dt,K as _,L as pt,M as mt,N as vt,_ as ft}from"./index.08fa0935.js";const se=function(e,o,...n){let t;o.includes("mouse")||o.includes("click")?t="MouseEvents":o.includes("key")?t="KeyboardEvent":t="HTMLEvents";const s=document.createEvent(t);return s.initEvent(o,...n),e.dispatchEvent(s),e},ae=e=>{const o=me(e)?e:[e],n=[];return o.forEach(t=>{var s;me(t)?n.push(...ae(t)):Se(t)&&me(t.children)?n.push(...ae(t.children)):(n.push(t),Se(t)&&((s=t.component)==null?void 0:s.subTree)&&n.push(...ae(t.component.subTree)))}),n},ht=y({name:"ElCollapseTransition"}),_t=y({...ht,setup(e){const o=k("collapse-transition"),n={beforeEnter(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0},enter(t){t.dataset.oldOverflow=t.style.overflow,t.scrollHeight!==0?(t.style.maxHeight=`${t.scrollHeight}px`,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.maxHeight=0,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow},beforeLeave(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.maxHeight=`${t.scrollHeight}px`,t.style.overflow="hidden"},leave(t){t.scrollHeight!==0&&(t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};return(t,s)=>(w(),ye(Ne,Pe({name:S(o).b()},ot(n)),{default:f(()=>[T(t.$slots,"default")]),_:3},16,["name"]))}});var le=R(_t,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);le.install=e=>{e.component(le.name,le)};const gt=le,bt=y({name:"ElContainer"}),yt=y({...bt,props:{direction:{type:String}},setup(e){const o=e,n=st(),t=k("container"),s=d(()=>o.direction==="vertical"?!0:o.direction==="horizontal"?!1:n&&n.default?n.default().some(c=>{const m=c.type.name;return m==="ElHeader"||m==="ElFooter"}):!1);return(i,c)=>(w(),z("section",{class:L([S(t).b(),S(t).is("vertical",S(s))])},[T(i.$slots,"default")],2))}});var Mt=R(yt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);const Ct=y({name:"ElAside"}),xt=y({...Ct,props:{width:{type:String,default:null}},setup(e){const o=e,n=k("aside"),t=d(()=>o.width?n.cssVarBlock({width:o.width}):{});return(s,i)=>(w(),z("aside",{class:L(S(n).b()),style:Me(S(t))},[T(s.$slots,"default")],6))}});var He=R(xt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);const It=y({name:"ElFooter"}),Et=y({...It,props:{height:{type:String,default:null}},setup(e){const o=e,n=k("footer"),t=d(()=>o.height?n.cssVarBlock({height:o.height}):{});return(s,i)=>(w(),z("footer",{class:L(S(n).b()),style:Me(S(t))},[T(s.$slots,"default")],6))}});var De=R(Et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);const kt=y({name:"ElHeader"}),Tt=y({...kt,props:{height:{type:String,default:null}},setup(e){const o=e,n=k("header"),t=d(()=>o.height?n.cssVarBlock({height:o.height}):{});return(s,i)=>(w(),z("header",{class:L(S(n).b()),style:Me(S(t))},[T(s.$slots,"default")],6))}});var Le=R(Tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);const wt=y({name:"ElMain"}),St=y({...wt,setup(e){const o=k("main");return(n,t)=>(w(),z("main",{class:L(S(o).b())},[T(n.$slots,"default")],2))}});var Re=R(St,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);const $t=$e(Mt,{Aside:He,Footer:De,Header:Le,Main:Re}),Bt=G(He);G(De);const At=G(Le),Pt=G(Re);class Nt{constructor(o,n){this.parent=o,this.domNode=n,this.subIndex=0,this.subIndex=0,this.init()}init(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()}gotoSubIndex(o){o===this.subMenuItems.length?o=0:o<0&&(o=this.subMenuItems.length-1),this.subMenuItems[o].focus(),this.subIndex=o}addListeners(){const o=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,n=>{n.addEventListener("keydown",t=>{let s=!1;switch(t.code){case O.down:{this.gotoSubIndex(this.subIndex+1),s=!0;break}case O.up:{this.gotoSubIndex(this.subIndex-1),s=!0;break}case O.tab:{se(o,"mouseleave");break}case O.enter:case O.space:{s=!0,t.currentTarget.click();break}}return s&&(t.preventDefault(),t.stopPropagation()),!1})})}}class Ot{constructor(o,n){this.domNode=o,this.submenu=null,this.submenu=null,this.init(n)}init(o){this.domNode.setAttribute("tabindex","0");const n=this.domNode.querySelector(`.${o}-menu`);n&&(this.submenu=new Nt(this,n)),this.addListeners()}addListeners(){this.domNode.addEventListener("keydown",o=>{let n=!1;switch(o.code){case O.down:{se(o.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(0),n=!0;break}case O.up:{se(o.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(this.submenu.subMenuItems.length-1),n=!0;break}case O.tab:{se(o.currentTarget,"mouseleave");break}case O.enter:case O.space:{n=!0,o.currentTarget.click();break}}n&&o.preventDefault()})}}class zt{constructor(o,n){this.domNode=o,this.init(n)}init(o){const n=this.domNode.childNodes;Array.from(n).forEach(t=>{t.nodeType===1&&new Ot(t,o)})}}const Ht=y({name:"ElMenuCollapseTransition",setup(){const e=k("menu");return{listeners:{onBeforeEnter:n=>n.style.opacity="0.2",onEnter(n,t){te(n,`${e.namespace.value}-opacity-transition`),n.style.opacity="1",t()},onAfterEnter(n){pe(n,`${e.namespace.value}-opacity-transition`),n.style.opacity=""},onBeforeLeave(n){n.dataset||(n.dataset={}),Ge(n,e.m("collapse"))?(pe(n,e.m("collapse")),n.dataset.oldOverflow=n.style.overflow,n.dataset.scrollWidth=n.clientWidth.toString(),te(n,e.m("collapse"))):(te(n,e.m("collapse")),n.dataset.oldOverflow=n.style.overflow,n.dataset.scrollWidth=n.clientWidth.toString(),pe(n,e.m("collapse"))),n.style.width=`${n.scrollWidth}px`,n.style.overflow="hidden"},onLeave(n){te(n,"horizontal-collapse-transition"),n.style.width=`${n.dataset.scrollWidth}px`}}}}});function Dt(e,o,n,t,s,i){return w(),ye(Ne,Pe({mode:"out-in"},e.listeners),{default:f(()=>[T(e.$slots,"default")]),_:3},16)}var Lt=R(Ht,[["render",Dt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);function Ve(e,o){const n=d(()=>{let s=e.parent;const i=[o.value];for(;s.type.name!=="ElMenu";)s.props.index&&i.unshift(s.props.index),s=s.parent;return i});return{parentMenu:d(()=>{let s=e.parent;for(;s&&!["ElMenu","ElSubMenu"].includes(s.type.name);)s=s.parent;return s}),indexPath:n}}function Rt(e){return d(()=>{const n=e.backgroundColor;return n?new Ke(n).shade(20).toString():""})}const Fe=(e,o)=>{const n=k("menu");return d(()=>n.cssVarBlock({"text-color":e.textColor||"","hover-text-color":e.textColor||"","bg-color":e.backgroundColor||"","hover-bg-color":Rt(e).value||"","active-color":e.activeTextColor||"",level:`${o}`}))},Vt=be({index:{type:String,required:!0},showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300},popperClass:String,disabled:Boolean,popperAppendToBody:{type:Boolean,default:void 0},popperOffset:{type:Number,default:6},expandCloseIcon:{type:ne},expandOpenIcon:{type:ne},collapseCloseIcon:{type:ne},collapseOpenIcon:{type:ne}}),ve="ElSubMenu";var ke=y({name:ve,props:Vt,setup(e,{slots:o,expose:n}){const t=Ee(),{indexPath:s,parentMenu:i}=Ve(t,d(()=>e.index)),c=k("menu"),m=k("sub-menu"),u=re("rootMenu");u||ue(ve,"can not inject root menu");const v=re(`subMenu:${i.value.uid}`);v||ue(ve,"can not inject sub menu");const h=$({}),g=$({});let x;const A=$(!1),K=$(),Q=$(null),j=d(()=>l.value==="horizontal"&&U.value?"bottom-start":"right-start"),W=d(()=>l.value==="horizontal"&&U.value||l.value==="vertical"&&!u.props.collapse?e.expandCloseIcon&&e.expandOpenIcon?P.value?e.expandOpenIcon:e.expandCloseIcon:Ue:e.collapseCloseIcon&&e.collapseOpenIcon?P.value?e.collapseOpenIcon:e.collapseCloseIcon:Je),U=d(()=>v.level===0),X=d(()=>e.popperAppendToBody===void 0?U.value:Boolean(e.popperAppendToBody)),ie=d(()=>u.props.collapse?`${c.namespace.value}-zoom-in-left`:`${c.namespace.value}-zoom-in-top`),ce=d(()=>l.value==="horizontal"&&U.value?["bottom-start","bottom-end","top-start","top-end","right-start","left-start"]:["right-start","left-start","bottom-start","bottom-end","top-start","top-end"]),P=d(()=>u.openedMenus.includes(e.index)),V=d(()=>{let p=!1;return Object.values(h.value).forEach(b=>{b.active&&(p=!0)}),Object.values(g.value).forEach(b=>{b.active&&(p=!0)}),p}),Y=d(()=>u.props.backgroundColor||""),J=d(()=>u.props.activeTextColor||""),a=d(()=>u.props.textColor||""),l=d(()=>u.props.mode),r=Ce({index:e.index,indexPath:s,active:V}),I=d(()=>l.value!=="horizontal"?{color:a.value}:{borderBottomColor:V.value?u.props.activeTextColor?J.value:"":"transparent",color:V.value?J.value:a.value}),M=()=>{var p,b,E;return(E=(b=(p=Q.value)==null?void 0:p.popperRef)==null?void 0:b.popperInstanceRef)==null?void 0:E.destroy()},H=p=>{p||M()},F=()=>{u.props.menuTrigger==="hover"&&u.props.mode==="horizontal"||u.props.collapse&&u.props.mode==="vertical"||e.disabled||u.handleSubMenuClick({index:e.index,indexPath:s.value,active:V.value})},D=(p,b=e.showTimeout)=>{var E;p.type!=="focus"&&(u.props.menuTrigger==="click"&&u.props.mode==="horizontal"||!u.props.collapse&&u.props.mode==="vertical"||e.disabled||(v.mouseInChild.value=!0,x==null||x(),{stop:x}=we(()=>{u.openMenu(e.index,s.value)},b),X.value&&((E=i.value.vnode.el)==null||E.dispatchEvent(new MouseEvent("mouseenter")))))},B=(p=!1)=>{var b,E;u.props.menuTrigger==="click"&&u.props.mode==="horizontal"||!u.props.collapse&&u.props.mode==="vertical"||(x==null||x(),v.mouseInChild.value=!1,{stop:x}=we(()=>!A.value&&u.closeMenu(e.index,s.value),e.hideTimeout),X.value&&p&&((b=t.parent)==null?void 0:b.type.name)==="ElSubMenu"&&((E=v.handleMouseleave)==null||E.call(v,!0)))};oe(()=>u.props.collapse,p=>H(Boolean(p)));{const p=E=>{g.value[E.index]=E},b=E=>{delete g.value[E.index]};ge(`subMenu:${t.uid}`,{addSubMenu:p,removeSubMenu:b,handleMouseleave:B,mouseInChild:A,level:v.level+1})}return n({opened:P}),xe(()=>{u.addSubMenu(r),v.addSubMenu(r)}),Oe(()=>{v.removeSubMenu(r),u.removeSubMenu(r)}),()=>{var p;const b=[(p=o.title)==null?void 0:p.call(o),C(Be,{class:m.e("icon-arrow"),style:{transform:P.value?e.expandCloseIcon&&e.expandOpenIcon||e.collapseCloseIcon&&e.collapseOpenIcon&&u.props.collapse?"none":"rotateZ(180deg)":"none"}},{default:()=>Z(W.value)?C(t.appContext.components[W.value]):C(W.value)})],E=Fe(u.props,v.level+1),qe=u.isMenuPopup?C(Ae,{ref:Q,visible:P.value,effect:"light",pure:!0,offset:e.popperOffset,showArrow:!1,persistent:!0,popperClass:e.popperClass,placement:j.value,teleported:X.value,fallbackPlacements:ce.value,transition:ie.value,gpuAcceleration:!1},{content:()=>{var ee;return C("div",{class:[c.m(l.value),c.m("popup-container"),e.popperClass],onMouseenter:de=>D(de,100),onMouseleave:()=>B(!0),onFocus:de=>D(de,100)},[C("ul",{class:[c.b(),c.m("popup"),c.m(`popup-${j.value}`)],style:E.value},[(ee=o.default)==null?void 0:ee.call(o)])])},default:()=>C("div",{class:m.e("title"),style:[I.value,{backgroundColor:Y.value}],onClick:F},b)}):C(Ie,{},[C("div",{class:m.e("title"),style:[I.value,{backgroundColor:Y.value}],ref:K,onClick:F},b),C(gt,{},{default:()=>{var ee;return at(C("ul",{role:"menu",class:[c.b(),c.m("inline")],style:E.value},[(ee=o.default)==null?void 0:ee.call(o)]),[[lt,P.value]])}})]);return C("li",{class:[m.b(),m.is("active",V.value),m.is("opened",P.value),m.is("disabled",e.disabled)],role:"menuitem",ariaHaspopup:!0,ariaExpanded:P.value,onMouseenter:D,onMouseleave:()=>B(!0),onFocus:D},[qe])}}});const Ft=be({mode:{type:String,values:["horizontal","vertical"],default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:{type:_e(Array),default:()=>Ze([])},uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,values:["hover","click"],default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,collapseTransition:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0}}),fe=e=>Array.isArray(e)&&e.every(o=>Z(o)),jt={close:(e,o)=>Z(e)&&fe(o),open:(e,o)=>Z(e)&&fe(o),select:(e,o,n,t)=>Z(e)&&fe(o)&&rt(n)&&(t===void 0||t instanceof Promise)};var Wt=y({name:"ElMenu",props:Ft,emits:jt,setup(e,{emit:o,slots:n,expose:t}){const s=Ee(),i=s.appContext.config.globalProperties.$router,c=$(),m=k("menu"),u=k("sub-menu"),v=$(-1),h=$(e.defaultOpeneds&&!e.collapse?e.defaultOpeneds.slice(0):[]),g=$(e.defaultActive),x=$({}),A=$({}),K=d(()=>e.mode==="horizontal"||e.mode==="vertical"&&e.collapse),Q=()=>{const a=g.value&&x.value[g.value];if(!a||e.mode==="horizontal"||e.collapse)return;a.indexPath.forEach(r=>{const I=A.value[r];I&&j(r,I.indexPath)})},j=(a,l)=>{h.value.includes(a)||(e.uniqueOpened&&(h.value=h.value.filter(r=>l.includes(r))),h.value.push(a),o("open",a,l))},W=(a,l)=>{const r=h.value.indexOf(a);r!==-1&&h.value.splice(r,1),o("close",a,l)},U=({index:a,indexPath:l})=>{h.value.includes(a)?W(a,l):j(a,l)},X=a=>{(e.mode==="horizontal"||e.collapse)&&(h.value=[]);const{index:l,indexPath:r}=a;if(!(l===void 0||r===void 0))if(e.router&&i){const I=a.route||l,M=i.push(I).then(H=>(H||(g.value=l),H));o("select",l,r,{index:l,indexPath:r,route:I},M)}else g.value=l,o("select",l,r,{index:l,indexPath:r})},ie=a=>{const l=x.value,r=l[a]||g.value&&l[g.value]||l[e.defaultActive];r?g.value=r.index:g.value=a},ce=()=>{var a,l;if(!c.value)return-1;const r=Array.from((l=(a=c.value)==null?void 0:a.childNodes)!=null?l:[]).filter(p=>p.nodeName!=="#text"||p.nodeValue),I=64,M=Number.parseInt(getComputedStyle(c.value).paddingLeft,10),H=Number.parseInt(getComputedStyle(c.value).paddingRight,10),F=c.value.clientWidth-M-H;let D=0,B=0;return r.forEach((p,b)=>{D+=p.offsetWidth||0,D<=F-I&&(B=b+1)}),B===r.length?-1:B},P=(a,l=33.34)=>{let r;return()=>{r&&clearTimeout(r),r=setTimeout(()=>{a()},l)}};let V=!0;const Y=()=>{const a=()=>{v.value=-1,it(()=>{v.value=ce()})};V?a():P(a)(),V=!1};oe(()=>e.defaultActive,a=>{x.value[a]||(g.value=""),ie(a)}),oe(()=>e.collapse,a=>{a&&(h.value=[])}),oe(x.value,Q);let J;ut(()=>{e.mode==="horizontal"&&e.ellipsis?J=Qe(c,Y).stop:J==null||J()});{const a=M=>{A.value[M.index]=M},l=M=>{delete A.value[M.index]};ge("rootMenu",Ce({props:e,openedMenus:h,items:x,subMenus:A,activeIndex:g,isMenuPopup:K,addMenuItem:M=>{x.value[M.index]=M},removeMenuItem:M=>{delete x.value[M.index]},addSubMenu:a,removeSubMenu:l,openMenu:j,closeMenu:W,handleMenuItemClick:X,handleSubMenuClick:U})),ge(`subMenu:${s.uid}`,{addSubMenu:a,removeSubMenu:l,mouseInChild:$(!1),level:0})}return xe(()=>{e.mode==="horizontal"&&new zt(s.vnode.el,m.namespace.value)}),t({open:l=>{const{indexPath:r}=A.value[l];r.forEach(I=>j(I,r))},close:W,handleResize:Y}),()=>{var a,l;let r=(l=(a=n.default)==null?void 0:a.call(n))!=null?l:[];const I=[];if(e.mode==="horizontal"&&c.value){const F=ae(r),D=v.value===-1?F:F.slice(0,v.value),B=v.value===-1?[]:F.slice(v.value);(B==null?void 0:B.length)&&e.ellipsis&&(r=D,I.push(C(ke,{index:"sub-menu-more",class:u.e("hide-arrow")},{title:()=>C(Be,{class:u.e("icon-more")},{default:()=>C(Xe)}),default:()=>B})))}const M=Fe(e,0),H=C("ul",{key:String(e.collapse),role:"menubar",ref:c,style:M.value,class:{[m.b()]:!0,[m.m(e.mode)]:!0,[m.m("collapse")]:e.collapse}},[...r,...I]);return e.collapseTransition&&e.mode==="vertical"?C(Lt,()=>H):H}}});const qt=be({index:{type:_e([String,null]),default:null},route:{type:_e([String,Object])},disabled:Boolean}),Gt={click:e=>Z(e.index)&&Array.isArray(e.indexPath)},he="ElMenuItem",Kt=y({name:he,components:{ElTooltip:Ae},props:qt,emits:Gt,setup(e,{emit:o}){const n=Ee(),t=re("rootMenu"),s=k("menu"),i=k("menu-item");t||ue(he,"can not inject root menu");const{parentMenu:c,indexPath:m}=Ve(n,ct(e,"index")),u=re(`subMenu:${c.value.uid}`);u||ue(he,"can not inject sub menu");const v=d(()=>e.index===t.activeIndex),h=Ce({index:e.index,indexPath:m,active:v}),g=()=>{e.disabled||(t.handleMenuItemClick({index:e.index,indexPath:m.value,route:e.route}),o("click",h))};return xe(()=>{u.addSubMenu(h),t.addMenuItem(h)}),Oe(()=>{u.removeSubMenu(h),t.removeMenuItem(h)}),{Effect:Ye,parentMenu:c,rootMenu:t,active:v,nsMenu:s,nsMenuItem:i,handleClick:g}}});function Ut(e,o,n,t,s,i){const c=ze("el-tooltip");return w(),z("li",{class:L([e.nsMenuItem.b(),e.nsMenuItem.is("active",e.active),e.nsMenuItem.is("disabled",e.disabled)]),role:"menuitem",tabindex:"-1",onClick:o[0]||(o[0]=(...m)=>e.handleClick&&e.handleClick(...m))},[e.parentMenu.type.name==="ElMenu"&&e.rootMenu.props.collapse&&e.$slots.title?(w(),ye(c,{key:0,effect:e.Effect.DARK,placement:"right","fallback-placements":["left"],persistent:""},{content:f(()=>[T(e.$slots,"title")]),default:f(()=>[q("div",{class:L(e.nsMenu.be("tooltip","trigger"))},[T(e.$slots,"default")],2)]),_:3},8,["effect"])):(w(),z(Ie,{key:1},[T(e.$slots,"default"),T(e.$slots,"title")],64))],2)}var je=R(Kt,[["render",Ut],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);const Jt={title:String},Zt="ElMenuItemGroup",Qt=y({name:Zt,props:Jt,setup(){return{ns:k("menu-item-group")}}});function Xt(e,o,n,t,s,i){return w(),z("li",{class:L(e.ns.b())},[q("div",{class:L(e.ns.e("title"))},[e.$slots.title?T(e.$slots,"title",{key:1}):(w(),z(Ie,{key:0},[N(dt(e.title),1)],64))],2),q("ul",null,[T(e.$slots,"default")])],2)}var We=R(Qt,[["render",Xt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);const Yt=$e(Wt,{MenuItem:je,MenuItemGroup:We,SubMenu:ke}),en=G(je),tn=G(We),nn=G(ke);const on=""+new URL("vue.5532db34.svg",import.meta.url).href,sn=et(),an=tt(sn),Te=e=>(mt("data-v-f09dd58c"),e=e(),vt(),e),ln={class:"common-layout"},un=Te(()=>q("div",{class:"title"},[q("img",{src:on})],-1)),rn=Te(()=>q("i",{class:"iconfont icon-3d menu-icon"},null,-1)),cn=Te(()=>q("span",null,"THREE",-1)),dn=y({__name:"home",setup(e){let o=pt();const n=d(()=>o.currentRoute.value.path);return(t,s)=>{const i=en,c=tn,m=nn,u=Yt,v=Bt,h=nt,g=At,x=ze("RouterView"),A=Pt,K=$t;return w(),z("div",ln,[_(K,{class:"el-container"},{default:f(()=>[_(v,{width:"200px"},{default:f(()=>[un,_(u,{"default-active":S(n),class:"el-menu-vertical-demo",router:""},{default:f(()=>[_(m,{index:"/three"},{title:f(()=>[rn,cn]),default:f(()=>[_(c,null,{default:f(()=>[_(i,{index:"/three/pcdLoad"},{default:f(()=>[N("pcdLoad")]),_:1}),_(i,{index:"/three/firstThree"},{default:f(()=>[N("firstThree")]),_:1}),_(i,{index:"/three/vertexAndStructure"},{default:f(()=>[N("\u9876\u70B9\u548C\u7ED3\u6784")]),_:1}),_(i,{index:"/three/hierarchyAndTree"},{default:f(()=>[N("Group\u548C\u6570\u7ED3\u6784")]),_:1}),_(i,{index:"/three/textureMap"},{default:f(()=>[N("\u7EB9\u7406\u8D34\u56FE")]),_:1}),_(i,{index:"/three/camera"},{default:f(()=>[N("\u76F8\u673A")]),_:1}),_(i,{index:"/three/sprite"},{default:f(()=>[N("\u7CBE\u7075\u6A21\u578B")]),_:1}),_(i,{index:"/three/animation"},{default:f(()=>[N("\u52A8\u753B\u6A21\u5757")]),_:1}),_(i,{index:"/three/bonesAnimation"},{default:f(()=>[N("\u9AA8\u9ABC\u52A8\u753B")]),_:1})]),_:1})]),_:1})]),_:1},8,["default-active"])]),_:1}),_(K,null,{default:f(()=>[_(g,null,{default:f(()=>[_(h,{onClick:s[0]||(s[0]=Q=>S(an)()),type:"primary"})]),_:1}),_(A,{class:"el-main"},{default:f(()=>[_(x)]),_:1})]),_:1})]),_:1})])}}});const vn=ft(dn,[["__scopeId","data-v-f09dd58c"]]);export{vn as default};
