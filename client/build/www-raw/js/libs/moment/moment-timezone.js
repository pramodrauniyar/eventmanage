//! moment-timezone.js
//! version : 0.3.1
//! author : Tim Wood
//! license : MIT
//! github.com/moment/moment-timezone

(function(e,t){typeof define=="function"&&define.amd?define(["moment"],t):typeof exports=="object"?module.exports=t(require("moment")):t(e.moment)})(this,function(e){function u(e){return e>96?e-87:e>64?e-29:e-48}function a(e){var t=0,n=e.split("."),r=n[0],i=n[1]||"",s=1,o,a=0,f=1;e.charCodeAt(0)===45&&(t=1,f=-1);for(t;t<r.length;t++)o=u(r.charCodeAt(t)),a=60*a+o;for(t=0;t<i.length;t++)s/=60,o=u(i.charCodeAt(t)),a+=o*s;return a*f}function f(e){for(var t=0;t<e.length;t++)e[t]=a(e[t])}function l(e,t){for(var n=0;n<t;n++)e[n]=Math.round((e[n-1]||0)+e[n]*6e4);e[t-1]=Infinity}function c(e,t){var n=[],r;for(r=0;r<t.length;r++)n[r]=e[t[r]];return n}function h(e){var t=e.split("|"),n=t[2].split(" "),r=t[3].split(""),i=t[4].split(" ");return f(n),f(r),f(i),l(i,r.length),{name:t[0],abbrs:c(t[1].split(" "),r),offsets:c(n,r),untils:i}}function p(e){e&&this._set(h(e))}function d(e){return(e||"").toLowerCase().replace(/\//g,"_")}function v(e){var t,r,i;typeof e=="string"&&(e=[e]);for(t=0;t<e.length;t++)r=new p(e[t]),i=d(r.name),n[i]=r,b(i)}function m(e){return n[d(e)]||null}function g(){var e,t=[];for(e in n)n.hasOwnProperty(e)&&n[e]&&t.push(n[e].name);return t.sort()}function y(e){var t,n;typeof e=="string"&&(e=[e]);for(t=0;t<e.length;t++)n=e[t].split("|"),E(n[0],n[1]),E(n[1],n[0])}function b(e){if(!r[e])return;var t,i=n[e],s=r[e];for(t=0;t<s.length;t++)w(i,s[t]);r[e]=null}function w(e,t){var r=n[d(t)]=new p;r._set(e),r.name=t}function E(e,t){e=d(e),n[e]?w(n[e],t):(r[e]=r[e]||[],r[e].push(t))}function S(e){v(e.zones),y(e.links),C.dataVersion=e.version}function x(e){return x.didShowError||(x.didShowError=!0,N("moment.tz.zoneExists('"+e+"') has been deprecated in favor of !moment.tz.zone('"+e+"')")),!!m(e)}function T(e){return!!e._a&&e._tzm===undefined}function N(e){typeof console!="undefined"&&typeof console.error=="function"&&console.error(e)}function C(t){var n=Array.prototype.slice.call(arguments,0,-1),r=arguments[arguments.length-1],i=m(r),s=e.utc.apply(null,n);return i&&!e.isMoment(t)&&T(s)&&s.add(i.parse(s),"minutes"),s.tz(r),s}function L(e){return function(){return this._z?this._z.abbr(this):e.call(this)}}function A(e){return function(){return this._z=null,e.apply(this,arguments)}}if(e.tz!==undefined)return e;var t="0.3.1",n={},r={},i=e.version.split("."),s=+i[0],o=+i[1];(s<2||s===2&&o<6)&&N("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js "+e.version+". See momentjs.com"),p.prototype={_set:function(e){this.name=e.name,this.abbrs=e.abbrs,this.untils=e.untils,this.offsets=e.offsets},_index:function(e){var t=+e,n=this.untils,r;for(r=0;r<n.length;r++)if(t<n[r])return r},parse:function(e){var t=+e,n=this.offsets,r=this.untils,i=r.length-1,s,o,u,a;for(a=0;a<i;a++){s=n[a],o=n[a+1],u=n[a?a-1:a],s<o&&C.moveAmbiguousForward?s=o:s>u&&C.moveInvalidForward&&(s=u);if(t<r[a]-s*6e4)return n[a]}return n[i]},abbr:function(e){return this.abbrs[this._index(e)]},offset:function(e){return this.offsets[this._index(e)]}},C.version=t,C.dataVersion="",C._zones=n,C._links=r,C.add=v,C.link=y,C.load=S,C.zone=m,C.zoneExists=x,C.names=g,C.Zone=p,C.unpack=h,C.unpackBase60=a,C.needsOffset=T,C.moveInvalidForward=!0,C.moveAmbiguousForward=!1;var k=e.fn;e.tz=C,e.defaultZone=null,e.updateOffset=function(t,n){var r;t._z===undefined&&(t._z=e.defaultZone),t._z&&(r=t._z.offset(t),Math.abs(r)<16&&(r/=60),t.utcOffset!==undefined?t.utcOffset(-r,n):t.zone(r,n))},k.tz=function(t){if(t)return this._z=m(t),this._z?e.updateOffset(this):N("Moment Timezone has no data for "+t+". See http://momentjs.com/timezone/docs/#/data-loading/."),this;if(this._z)return this._z.name},k.zoneName=L(k.zoneName),k.zoneAbbr=L(k.zoneAbbr),k.utc=A(k.utc),e.tz.setDefault=function(t){return(s<2||s===2&&o<9)&&N("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js "+e.version+"."),e.defaultZone=t?m(t):null,e};var O=e.momentProperties;return Object.prototype.toString.call(O)==="[object Array]"?(O.push("_z"),O.push("_a")):O&&(O._z=null),e});