import{E as je,e as f,M as L,T as D,Q as ce,f as le,V as u}from"./three.module.00e15d00.js";const ue={type:"change"},z={type:"start"},pe={type:"end"};class Se extends je{constructor(U,he){super(),this.object=U,this.domElement=he,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new f,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:L.ROTATE,MIDDLE:L.DOLLY,RIGHT:L.PAN},this.touches={ONE:D.ROTATE,TWO:D.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",oe),this._domElementKeyEvents=t},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(ue),e.update(),i=a.NONE},this.update=function(){const t=new f,n=new ce().setFromUnitVectors(U.up,new f(0,1,0)),r=n.clone().invert(),c=new f,l=new ce,w=2*Math.PI;return function(){const re=e.object.position;t.copy(re).sub(e.target),t.applyQuaternion(n),s.setFromVector3(t),e.autoRotate&&i===a.NONE&&I(me()),e.enableDamping?(s.theta+=p.theta*e.dampingFactor,s.phi+=p.phi*e.dampingFactor):(s.theta+=p.theta,s.phi+=p.phi);let h=e.minAzimuthAngle,m=e.maxAzimuthAngle;return isFinite(h)&&isFinite(m)&&(h<-Math.PI?h+=w:h>Math.PI&&(h-=w),m<-Math.PI?m+=w:m>Math.PI&&(m-=w),h<=m?s.theta=Math.max(h,Math.min(m,s.theta)):s.theta=s.theta>(h+m)/2?Math.max(h,s.theta):Math.min(m,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=j,s.radius=Math.max(e.minDistance,Math.min(e.maxDistance,s.radius)),e.enableDamping===!0?e.target.addScaledVector(y,e.dampingFactor):e.target.add(y),t.setFromSpherical(s),t.applyQuaternion(r),re.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(p.theta*=1-e.dampingFactor,p.phi*=1-e.dampingFactor,y.multiplyScalar(1-e.dampingFactor)):(p.set(0,0,0),y.set(0,0,0)),j=1,R||c.distanceToSquared(e.object.position)>Z||8*(1-l.dot(e.object.quaternion))>Z?(e.dispatchEvent(ue),c.copy(e.object.position),l.copy(e.object.quaternion),R=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",ae),e.domElement.removeEventListener("pointerdown",ee),e.domElement.removeEventListener("pointercancel",te),e.domElement.removeEventListener("wheel",ne),e.domElement.removeEventListener("pointermove",C),e.domElement.removeEventListener("pointerup",_),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",oe)};const e=this,a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let i=a.NONE;const Z=1e-6,s=new le,p=new le;let j=1;const y=new f;let R=!1;const d=new u,b=new u,P=new u,E=new u,g=new u,T=new u,O=new u,M=new u,N=new u,o=[],x={};function me(){return 2*Math.PI/60/60*e.autoRotateSpeed}function S(){return Math.pow(.95,e.zoomSpeed)}function I(t){p.theta-=t}function v(t){p.phi-=t}const F=function(){const t=new f;return function(r,c){t.setFromMatrixColumn(c,0),t.multiplyScalar(-r),y.add(t)}}(),X=function(){const t=new f;return function(r,c){e.screenSpacePanning===!0?t.setFromMatrixColumn(c,1):(t.setFromMatrixColumn(c,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(r),y.add(t)}}(),A=function(){const t=new f;return function(r,c){const l=e.domElement;if(e.object.isPerspectiveCamera){const w=e.object.position;t.copy(w).sub(e.target);let k=t.length();k*=Math.tan(e.object.fov/2*Math.PI/180),F(2*r*k/l.clientHeight,e.object.matrix),X(2*c*k/l.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(F(r*(e.object.right-e.object.left)/e.object.zoom/l.clientWidth,e.object.matrix),X(c*(e.object.top-e.object.bottom)/e.object.zoom/l.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function Y(t){e.object.isPerspectiveCamera?j/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),R=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function K(t){e.object.isPerspectiveCamera?j*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),R=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function V(t){d.set(t.clientX,t.clientY)}function fe(t){O.set(t.clientX,t.clientY)}function W(t){E.set(t.clientX,t.clientY)}function de(t){b.set(t.clientX,t.clientY),P.subVectors(b,d).multiplyScalar(e.rotateSpeed);const n=e.domElement;I(2*Math.PI*P.x/n.clientHeight),v(2*Math.PI*P.y/n.clientHeight),d.copy(b),e.update()}function be(t){M.set(t.clientX,t.clientY),N.subVectors(M,O),N.y>0?Y(S()):N.y<0&&K(S()),O.copy(M),e.update()}function Ee(t){g.set(t.clientX,t.clientY),T.subVectors(g,E).multiplyScalar(e.panSpeed),A(T.x,T.y),E.copy(g),e.update()}function ge(t){t.deltaY<0?K(S()):t.deltaY>0&&Y(S()),e.update()}function ye(t){let n=!1;switch(t.code){case e.keys.UP:A(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:A(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:A(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:A(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function q(){if(o.length===1)d.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);d.set(t,n)}}function G(){if(o.length===1)E.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);E.set(t,n)}}function B(){const t=o[0].pageX-o[1].pageX,n=o[0].pageY-o[1].pageY,r=Math.sqrt(t*t+n*n);O.set(0,r)}function Pe(){e.enableZoom&&B(),e.enablePan&&G()}function Te(){e.enableZoom&&B(),e.enableRotate&&q()}function Q(t){if(o.length==1)b.set(t.pageX,t.pageY);else{const r=H(t),c=.5*(t.pageX+r.x),l=.5*(t.pageY+r.y);b.set(c,l)}P.subVectors(b,d).multiplyScalar(e.rotateSpeed);const n=e.domElement;I(2*Math.PI*P.x/n.clientHeight),v(2*Math.PI*P.y/n.clientHeight),d.copy(b)}function J(t){if(o.length===1)g.set(t.pageX,t.pageY);else{const n=H(t),r=.5*(t.pageX+n.x),c=.5*(t.pageY+n.y);g.set(r,c)}T.subVectors(g,E).multiplyScalar(e.panSpeed),A(T.x,T.y),E.copy(g)}function $(t){const n=H(t),r=t.pageX-n.x,c=t.pageY-n.y,l=Math.sqrt(r*r+c*c);M.set(0,l),N.set(0,Math.pow(M.y/O.y,e.zoomSpeed)),Y(N.y),O.copy(M)}function Oe(t){e.enableZoom&&$(t),e.enablePan&&J(t)}function Me(t){e.enableZoom&&$(t),e.enableRotate&&Q(t)}function ee(t){e.enabled!==!1&&(o.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",C),e.domElement.addEventListener("pointerup",_)),Ne(t),t.pointerType==="touch"?Le(t):Ae(t))}function C(t){e.enabled!==!1&&(t.pointerType==="touch"?De(t):we(t))}function _(t){ie(t),o.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",C),e.domElement.removeEventListener("pointerup",_)),e.dispatchEvent(pe),i=a.NONE}function te(t){ie(t)}function Ae(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case L.DOLLY:if(e.enableZoom===!1)return;fe(t),i=a.DOLLY;break;case L.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;W(t),i=a.PAN}else{if(e.enableRotate===!1)return;V(t),i=a.ROTATE}break;case L.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;V(t),i=a.ROTATE}else{if(e.enablePan===!1)return;W(t),i=a.PAN}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(z)}function we(t){switch(i){case a.ROTATE:if(e.enableRotate===!1)return;de(t);break;case a.DOLLY:if(e.enableZoom===!1)return;be(t);break;case a.PAN:if(e.enablePan===!1)return;Ee(t);break}}function ne(t){e.enabled===!1||e.enableZoom===!1||i!==a.NONE||(t.preventDefault(),e.dispatchEvent(z),ge(t),e.dispatchEvent(pe))}function oe(t){e.enabled===!1||e.enablePan===!1||ye(t)}function Le(t){switch(se(t),o.length){case 1:switch(e.touches.ONE){case D.ROTATE:if(e.enableRotate===!1)return;q(),i=a.TOUCH_ROTATE;break;case D.PAN:if(e.enablePan===!1)return;G(),i=a.TOUCH_PAN;break;default:i=a.NONE}break;case 2:switch(e.touches.TWO){case D.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Pe(),i=a.TOUCH_DOLLY_PAN;break;case D.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Te(),i=a.TOUCH_DOLLY_ROTATE;break;default:i=a.NONE}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(z)}function De(t){switch(se(t),i){case a.TOUCH_ROTATE:if(e.enableRotate===!1)return;Q(t),e.update();break;case a.TOUCH_PAN:if(e.enablePan===!1)return;J(t),e.update();break;case a.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Oe(t),e.update();break;case a.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Me(t),e.update();break;default:i=a.NONE}}function ae(t){e.enabled!==!1&&t.preventDefault()}function Ne(t){o.push(t)}function ie(t){delete x[t.pointerId];for(let n=0;n<o.length;n++)if(o[n].pointerId==t.pointerId){o.splice(n,1);return}}function se(t){let n=x[t.pointerId];n===void 0&&(n=new u,x[t.pointerId]=n),n.set(t.pageX,t.pageY)}function H(t){const n=t.pointerId===o[0].pointerId?o[1]:o[0];return x[n.pointerId]}e.domElement.addEventListener("contextmenu",ae),e.domElement.addEventListener("pointerdown",ee),e.domElement.addEventListener("pointercancel",te),e.domElement.addEventListener("wheel",ne,{passive:!1}),this.update()}}export{Se as O};
