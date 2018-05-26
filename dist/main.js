!function(t){var n={};function i(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=n,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=0)}([function(t,n,i){"use strict";i.r(n);class e{constructor(t,n,i){this.x=t,this.y=n,this.z=i}_plus(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z)}_minus(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z)}_times(t){return new e(this.x*t.x,this.y*t.y,this.z*t.z)}_dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}_scale(t){return new e(t*this.x,t*this.y,t*this.z)}_linearInterpolation(t,n){return this._scale(1-n)._plus(t._scale(n))}asColor(){return new r(this.x,this.y,this.z)}length(){return Math.sqrt(Math.abs(this.x*this.x+this.y*this.y+this.z*this.z))}normalized(){let t=this.length();return new e(this.x/t,this.y/t,this.z/t)}}var s=e;class a{constructor(t,n,i){this.r=t,this.g=n,this.b=i}asVector3(){return new s(this.r,this.g,this.b)}rescale(t=0,n=255,i=0,e=255,s=0,r=255){let h=n-t,o=e-i,l=r-s,c=parseInt((this.r-t)/h*255),m=parseInt((this.g-i)/o*255),u=parseInt((this.b-s)/l*255);return new a(c,m,u)}clamped(){let t=this.r,n=this.g,i=this.b;return t<0?t=0:t>1&&(t=1),n<0?n=0:n>1&&(n=1),i<0?i=0:i>1&&(i=1),new a(t,n,i)}normalized(){return this.rescale(0,1,0,1,0,1)}}var r=a;var h=class{constructor(t=null,n=null,i=null,e=20,s=.5){let a=new r(.5,.5,.5);this.ambientConstant=null===t?a:t,this.diffuseConstant=null===n?a:n,this.specularConstant=null===i?a:i,this.reflectiveConstant=this.diffuseConstant.asVector3()._scale(s).asColor(),this.diffuseConstant=this.diffuseConstant.asVector3()._minus(this.reflectiveConstant.asVector3()).asColor(),this.shininess=e}};var o=class{constructor(t,n){this.origin=t,this.direction=n}};var l=class{constructor(t,n,i=null){this.center=t,this.radius=n,this.material=null===i?new h:i}intersection(t){let n=t.origin._minus(this.center),i=t.direction.length()*t.direction.length(),e=2*n._dot(t.direction),s=e*e-4*i*(n.length()*n.length()-this.radius*this.radius);if(s<0)return null;let a=(0-e+Math.sqrt(s))/(2*i),r=(0-e-Math.sqrt(s))/(2*i);if(a<=0&&r<=0)return null;let h=a;return r<a&&(h=r),h}colorAndIntersection(t,n,i=0){if(i>3)return null;var e=this.intersection(t);if(null===e)return null;this.colorAtIntersection(e,t,n);for(let t=0;t<n.objects.length;++t)n.objects[t]!=this&&(e=null)}colorAtIntersection(t,n,i=null,e=0){if(null===i)return this.color;let a=n.origin._plus(n.direction._scale(t)),r=a._minus(this.center).normalized(),h=i.ambientLightIntensity.asVector3()._times(this.material.ambientConstant.asVector3()),l=new s(0,0,0)._plus(h);for(var c=0;c<i.lights.length;++c){let t=i.lights[c],e=t.location._minus(a).normalized(),s=r._dot(e);if(s<0)continue;let h=!1;for(let n=0;n<i.objects.length;++n){let e=i.objects[n];if(e==this)continue;let s=new o(a,t.location._minus(a));if(e.intersection(s)){h=!0;break}}if(h)continue;let m=t.diffuseIntensity.asVector3()._times(this.material.diffuseConstant.asVector3())._scale(s),u=r._scale(2*s)._minus(e),d=a._minus(n.origin).normalized(),g=t.specularIntensity.asVector3()._times(this.material.specularConstant.asVector3())._scale(Math.pow(Math.abs(d._dot(u)),this.material.shininess));l=l._plus(m)._plus(g),isNaN(l.x)&&console.log(l,d,a._minus(n.origin))}return{color:l,pointOfIntersection:a,surfaceNormal:r}}};var c=class extends l{constructor(t){super(t.location,.4),this.light=t}intersection(t,n=!1){return n?super.intersection(t):null}colorAtIntersection(t,n,i,e=0,a=!1){return a?{color:new s(1,1,.5)}:null}};var m=class{constructor(t,n=null,i=null){this.location=t,this.diffuseIntensity=null===n?new r(0,0,0):n,this.specularIntensity=null===i?new r(0,0,0):i}};var u=class{constructor(t=-2,n=2,i=-1,e=1,a=0,h=5){this.xmin=t,this.xmax=n,this.ymin=i,this.ymax=e,this.zmin=a,this.zmax=h,this.lights=[],this.objects=[],this._view=null,this.backgroundColor=new s(0,0,0),this.ambientLightIntensity=new r(.2,.2,.2)}getObjects(){return this.objects}randomizeAmbientLight(){this.ambientLightIntensity=new r(Math.random(),Math.random(),Math.random())}generateRandomLights(t=2){for(let n=0;n<t;++n){let t=new s(Math.random()*(this.xmax-this.xmin)+this.xmin,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),n=new r(Math.random(),Math.random(),Math.random()),i=new r(Math.random(),Math.random(),Math.random()),e=new m(t,n,i);this.lights.push(e)}}generateBrightLights(t=2){for(let n=0;n<t;++n){let t=new s(Math.random()*(this.xmax-this.xmin)+this.xmin,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),n=new r(.9,.9,.9),i=new r(.9,.9,.9),e=new m(t,n,i);this.lights.push(e),this.objects.push(new c(e))}}generateColoredLights(t=2,n=.9,i=.9,e=.9){for(let a=0;a<t;++a){let t=new s(this.xmin,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),a=new r(n,i,e),h=new r(.8,.8,.8),o=new m(t,a,h);this.lights.push(o)}}generateSideLights(){let t=new s(this.xmin,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),n=new r(Math.random(),Math.random(),Math.random()),i=new r(.8,.8,.8),e=new m(t,n,i);this.lights.push(e);let a=new s(this.xmax,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),h=new r(Math.random(),Math.random(),Math.random()),o=new r(.8,.8,.8),l=new m(a,h,o);this.lights.push(l)}generateRandomSpheres(t=5){for(var n=0;n<t;++n){let t=new s(Math.random()*(this.xmax-this.xmin)+this.xmin,Math.random()*(this.ymax-this.ymin)+this.ymin,Math.random()*(this.zmax-this.zmin)+this.zmin),n=.9*Math.random()+.1,i=(Math.random(),Math.random(),Math.random(),new r(Math.random(),Math.random(),Math.random())),e=new r(Math.random(),Math.random(),Math.random()),a=new r(Math.random(),Math.random(),Math.random()),o=30*Math.random(),c=Math.random(),m=new h(i,e,a,o,c),u=new l(t,n,m);this.objects.push(u)}}};var d=class{constructor(t,n){this.w=t,this.h=n,this.canvas=this._createCanvas()}_createCanvas(){const t=document.createElement("canvas");t.setAttribute("width",this.w),t.setAttribute("height",this.h);const n=t.getContext("2d"),i=n.getImageData(0,0,this.w,this.h);return{canvas:t,context:n,imageData:i,pixels:i.data}}putPixel(t,n,i){const e=4*(n*this.w+t);this.canvas.pixels[e]=0|i.r,this.canvas.pixels[e+1]=0|i.g,this.canvas.pixels[e+2]=0|i.b,this.canvas.pixels[e+3]=255}renderInto(t){this.canvas.context.putImageData(this.canvas.imageData,0,0),t.appendChild(this.canvas.canvas)}};var g=class{constructor(t,n,i,e){this.x1=t,this.x2=n,this.x3=i,this.x4=e}};class x{constructor(t,n,i,e){this.camera=t,this.imagePlane=n,this.H=e,this.W=i}static createDefaultView(){const t=new g(new s(-1,.75,0),new s(1,.75,0),new s(-1,-.75,0),new s(1,-.75,0)),n=new s(0,0,-1);return new x(n,t,256,192)}_bilinearInterpolation(t,n){let i=t/this.W,e=(this.H-n-1)/this.H,s=(t+.5)/this.W,a=(this.H-(n+.5)-1)/this.H,r=this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,i),h=this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,i),l=h._linearInterpolation(r,e),c=this.imagePlane.x1._linearInterpolation(this.imagePlane.x2,s),m=this.imagePlane.x3._linearInterpolation(this.imagePlane.x4,s),u=m._linearInterpolation(c,e),d=h._linearInterpolation(r,a),g=m._linearInterpolation(c,a);return[{point:l,ray:new o(l,l._minus(this.camera))},{point:u,ray:new o(u,u._minus(this.camera))},{point:d,ray:new o(d,d._minus(this.camera))},{point:g,ray:new o(g,g._minus(this.camera))}]}colorSnapshot(){const t=new d(this.W,this.H);for(let n=0;n<this.H;n++)for(let i=0;i<this.W;i++){let e=this._bilinearInterpolation(i,n)[0];t.putPixel(i,n,e.ray.direction.asColor().rescale(-1,1,-.75,.75))}return console.log(.5,.5,.5,.5),t}getColor(t,n,i=0,e=null){if(i>3)return null;let s=!1;0==i&&(s=!0);let a=n.getObjects(),r=null,h=null,l=null;for(let n=0;n<a.length;++n){let i=a[n];if(e==i)continue;let r=i.intersection(t,s);null!==r&&(null===h?(h=r,l=i):r<h&&(h=r,l=i))}if(null!==l){let e=l.colorAtIntersection(h,t,n,i,s);if(r=e.color,!l.light){let s=t.direction._scale(-1),a=e.surfaceNormal._scale(2)._scale(e.surfaceNormal._dot(s))._minus(s),h=new o(e.pointOfIntersection,a),c=this.getColor(h,n,i+1,l);null!==c&&(r=c._times(l.material.reflectiveConstant.asVector3())._plus(r))}}return null===r?null:r}viewScene(t){const n=new d(this.W,this.H);t._view=this;for(let i=0;i<this.H;i++)for(let e=0;e<this.W;e++){let s=this._bilinearInterpolation(e,i),a=this.getColor(s[0].ray,t,0)||t.backgroundColor,r=this.getColor(s[1].ray,t,0)||t.backgroundColor,h=this.getColor(s[2].ray,t,0)||t.backgroundColor,o=this.getColor(s[3].ray,t,0)||t.backgroundColor,l=a._plus(r)._plus(h)._plus(o)._scale(.25);l=l.asColor().clamped().normalized(),n.putPixel(e,i,l)}return n}}var w=x;(function(){const t=w.createDefaultView();let n=new u(-2,2,-2,2,1,6);n.generateBrightLights(2),n.generateRandomSpheres(5),t.viewScene(n).renderInto(document.querySelector("body"))})()}]);