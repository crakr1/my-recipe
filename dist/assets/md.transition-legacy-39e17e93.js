System.register(["./index-legacy-d4d84fa1.js"],(function(e,n){"use strict";var t,i;return{setters:[e=>{t=e.y,i=e.x}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
e("mdTransitionAnimation",((e,n)=>{var o,r,a;const s="40px",l="back"===n.direction,d=n.enteringEl,c=n.leavingEl,u=t(d),m=u.querySelector("ion-toolbar"),f=i();if(f.addElement(u).fill("both").beforeRemoveClass("ion-page-invisible"),l?f.duration((null!==(o=n.duration)&&void 0!==o?o:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):f.duration((null!==(r=n.duration)&&void 0!==r?r:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform",`translateY(${s})`,"translateY(0px)").fromTo("opacity",.01,1),m){const e=i();e.addElement(m),f.addAnimation(e)}if(c&&l){f.duration((null!==(a=n.duration)&&void 0!==a?a:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const e=i();e.addElement(t(c)).onFinish((n=>{1===n&&e.elements.length>0&&e.elements[0].style.setProperty("display","none")})).fromTo("transform","translateY(0px)",`translateY(${s})`).fromTo("opacity",1,0),f.addAnimation(e)}return f}))}}}));
