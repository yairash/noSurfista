!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";const t=33554432;async function e(e,n){if(n.includeBOM&&(e.content="\ufeff"+e.content),n.includeInfobar&&(e.content+=await infobar.getScript()),n.backgroundSave||n.openEditor||n.saveToGDrive||n.saveToGitHub||n.saveWithCompanion||n.saveWithWebDAV)for(let o=0;o*t<e.content.length;o++){const r={method:"downloads.download",taskId:n.taskId,confirmFilename:n.confirmFilename,filenameConflictAction:n.filenameConflictAction,filename:e.filename,saveToClipboard:n.saveToClipboard,saveToGDrive:n.saveToGDrive,saveWithWebDAV:n.saveWithWebDAV,webDAVURL:n.webDAVURL,webDAVUser:n.webDAVUser,webDAVPassword:n.webDAVPassword,saveToGitHub:n.saveToGitHub,githubToken:n.githubToken,githubUser:n.githubUser,githubRepository:n.githubRepository,githubBranch:n.githubBranch,saveWithCompanion:n.saveWithCompanion,forceWebAuthFlow:n.forceWebAuthFlow,filenameReplacementCharacter:n.filenameReplacementCharacter,openEditor:n.openEditor,openSavedPage:n.openSavedPage,compressHTML:n.compressHTML,backgroundSave:n.backgroundSave,bookmarkId:n.bookmarkId,replaceBookmarkURL:n.replaceBookmarkURL,applySystemTheme:n.applySystemTheme,defaultEditorMode:n.defaultEditorMode,includeInfobar:n.includeInfobar,warnUnsavedPage:n.warnUnsavedPage};r.truncated=e.content.length>t,r.truncated?(r.finished=(o+1)*t>e.content.length,r.content=e.content.substring(o*t,(o+1)*t)):r.content=e.content,await browser.runtime.sendMessage(r)}else n.saveToClipboard?function(t){const e="copy";function n(e){e.clipboardData.setData("text/html",t.content),e.clipboardData.setData("text/plain",t.content),e.preventDefault()}document.addEventListener(e,n),document.execCommand(e),document.removeEventListener(e,n)}(e):await async function(t){if(t.filename&&t.filename.length){const e=document.createElement("a");e.download=t.filename,e.href=URL.createObjectURL(new Blob([t.content],{type:"text/html"})),e.dispatchEvent(new MouseEvent("click")),setTimeout((()=>URL.revokeObjectURL(e.href)),1e3)}return new Promise((t=>setTimeout(t,1)))}(e),n.openSavedPage&&open(URL.createObjectURL(new Blob([e.content],{type:"text/html"}))),browser.runtime.sendMessage({method:"ui.processEnd"});await browser.runtime.sendMessage({method:"downloads.end",taskId:n.taskId,hash:e.hash,woleetKey:n.woleetKey})}const n="single-file-request-fetch",o="single-file-ack-fetch",r="single-file-response-fetch",a="Host fetch error (SingleFile)",i=2500,s=Boolean(window.wrappedJSObject),l=(t,e,n)=>window.addEventListener(t,e,n),c=t=>window.dispatchEvent(t),d=(t,e,n)=>window.removeEventListener(t,e,n),p=(t,e)=>window.fetch(t,e);let u=0,m=new Map;async function f(t){const e=await browser.runtime.sendMessage(t);if(!e||e.error)throw new Error(e&&e.error&&e.error.toString());return e}browser.runtime.onMessage.addListener((t=>"singlefile.fetchFrame"==t.method&&window.frameId&&window.frameId==t.frameId?async function(t){try{const e=await p(t.url,{cache:"force-cache",headers:t.headers});return{status:e.status,headers:[...e.headers],array:Array.from(new Uint8Array(await e.arrayBuffer()))}}catch(t){return{error:t&&t.toString()}}}(t):"singlefile.fetchResponse"==t.method?async function(t){const e=m.get(t.requestId);e&&(t.error?(e.reject(new Error(t.error)),m.delete(t.requestId)):(t.truncated&&(e.array?e.array=e.array.concat(t.array):(e.array=t.array,m.set(t.requestId,e)),t.finished&&(t.array=e.array)),t.truncated&&!t.finished||(e.resolve({status:t.status,headers:{get:e=>t.headers&&t.headers[e]},arrayBuffer:async()=>new Uint8Array(t.array).buffer}),m.delete(t.requestId))));return{}}(t):void 0));const h=globalThis.singlefile,g=h.helper.SELECTED_CONTENT_ATTRIBUTE_NAME,y="singlefile-mask",w="singlefile-mask-content",b="singlefile-progress-bar",A="singlefile-progress-bar-content",E="single-file-selection-zone",v="singlefile-logs-window",S="singlefile-logs",C="singlefile-logs-line",x="singlefile-logs-line-text",I="singlefile-logs-line-icon",T=h.helper.SINGLE_FILE_UI_ELEMENT_CLASS,L=8,R=browser.i18n.getMessage("logPanelDeferredImages"),k=browser.i18n.getMessage("logPanelFrameContents"),P=browser.i18n.getMessage("logPanelStep"),D=browser.i18n.getMessage("logPanelWidth"),N=new Set(Array.from(getComputedStyle(document.documentElement)));let B,U;function M(t,e){return prompt(t,e)}function O(t){if(!document.querySelector(y)&&(t.logsEnabled&&document.documentElement.appendChild(U),t.shadowEnabled)){const e=function(){try{let t=document.querySelector(y);if(!t){t=J(y,document.documentElement);const e=t.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=`\n\t\t\t\t@keyframes single-file-progress { \n\t\t\t\t\t0% { \n\t\t\t\t\t\tleft: -50px;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t.${b} {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 0;\n\t\t\t\t\theight: 8px;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: .5;\n\t\t\t\t\toverflow: hidden;\t\t\t\t\t\n\t\t\t\t\ttransition: width 200ms ease-in-out;\n\t\t\t\t}\n\t\t\t\t.${A} {\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tanimation: single-file-progress 3s linear infinite reverse;\n\t\t\t\t\tbackground: \n\t\t\t\t\t\twhite \n\t\t\t\t\t\tlinear-gradient(-45deg, rgba(0, 0, 0, 0.075) 25%, \n\t\t\t\t\t\t\ttransparent 25%, \n\t\t\t\t\t\t\ttransparent 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 50%, \n\t\t\t\t\t\t\trgba(0, 0, 0, 0.075) 75%, \n\t\t\t\t\t\t\ttransparent 75%, transparent)\n\t\t\t\t\t\trepeat scroll 0% 0% / 50px 50px padding-box border-box;\n\t\t\t\t\twidth: calc(100% + 50px);\n\t\t\t\t\theight: 100%;\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.${w} {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\twidth: 100%;\n\t\t\t\t\theight: 100%;\n\t\t\t\t\tz-index: 2147483646;\n\t\t\t\t\topacity: 0;\n\t\t\t\t\tbackground-color: black;\n\t\t\t\t\ttransition: opacity 250ms;\n\t\t\t\t}\n\t\t\t`,e.appendChild(n);let o=document.createElement("div");o.classList.add(w),e.appendChild(o),t.offsetWidth,o.style.setProperty("opacity",.3),t.offsetWidth}return t}catch(t){}}();t.progressBarEnabled&&function(t){try{if(!t.shadowRoot.querySelector("."+b)){let e=document.createElement("div");e.classList.add(b),t.shadowRoot.appendChild(e);const n=document.createElement("div");n.classList.add(A),e.appendChild(n)}}catch(t){}}(e)}}function W(){const t=document.querySelector(y);t&&t.remove(),U.remove(),X()}function q(t,e,n){n.shadowEnabled&&n.progressBarEnabled&&function(t,e){try{const n=document.querySelector(y);if(n){const o=n.shadowRoot.querySelector("."+b);if(o&&e){const n=Math.floor(t/e*100)+"%";o.style.getPropertyValue("width")!=n&&(o.style.setProperty("width",n),o.offsetWidth)}}}catch(t){}}(t,e)}function H(){let t;const e=[],n=getSelection();for(let o=0;o<n.rangeCount;o++){let r=n.getRangeAt(o);if(r&&r.commonAncestorContainer){const n=document.createTreeWalker(r.commonAncestorContainer);let o=!1,a=!1;for(;!a;)(o||n.currentNode==r.startContainer||n.currentNode==r.endContainer)&&(o=!0,r.startContainer==r.endContainer&&r.startOffset==r.endOffset||(t=!0,"A"==n.currentNode.tagName&&n.currentNode.href&&e.push(n.currentNode.href))),n.currentNode==r.endContainer?a=!0:n.nextNode();t&&n.currentNode==r.endContainer&&n.currentNode.querySelectorAll&&n.currentNode.querySelectorAll("*").forEach((t=>{"A"==t.tagName&&t.href&&e.push(n.currentNode.href)}))}}return Array.from(new Set(e))}async function F(t){let e=G();return e||t?e:(e=await new Promise((t=>{let e=[];function n(t){e=[],s(),t.preventDefault()}function o(t){const e=function(t){let e,n=t.target,o=n.getBoundingClientRect();for(e=Z("floor",n,t.clientX-o.left,Q(n,"left")),e==n&&(e=Z("ceil",n,o.left+o.width-t.clientX,Q(n,"right"))),e==n&&(e=Z("floor",n,t.clientY-o.top,Q(n,"top"))),e==n&&(e=Z("ceil",n,o.top+o.height-t.clientY,Q(n,"bottom"))),n=e;n&&n.clientWidth<=L&&n.clientHeight<=L;)n=n.parentElement;return n}(t);var n;e&&(B=e,n=e,requestAnimationFrame((()=>{const t=z(),e=n.getBoundingClientRect(),o=document.scrollingElement||document.documentElement;t.style.setProperty("top",o.scrollTop+e.top-10+"px"),t.style.setProperty("left",o.scrollLeft+e.left-10+"px"),t.style.setProperty("width",e.width+20+"px"),t.style.setProperty("height",e.height+20+"px")})))}function r(t){t.preventDefault(),t.stopPropagation(),0==t.button?s(B,t.ctrlKey):i()}function a(t){"Escape"==t.key&&i()}function i(){e.length&&getSelection().removeAllRanges(),e=[],c()}function s(t,e){if(t){e||d();const n=document.createRange();n.selectNodeContents(t),l(),getSelection().addRange(n),p(),e||c()}else c()}function l(){const t=getSelection();for(let e=t.rangeCount-1;e>=0;e--){const n=t.getRangeAt(e);n.startOffset==n.endOffset&&(t.removeRange(n),e--)}}function c(){z().remove(),removeEventListener("mousemove",o,!0),removeEventListener("click",r,!0),removeEventListener("keyup",a,!0),B=null,t(Boolean(e.length)),setTimeout((()=>document.removeEventListener("contextmenu",n,!0)),0)}function d(){getSelection().removeAllRanges(),e.forEach((t=>getSelection().addRange(t)))}function p(){e=[];for(let t=0;t<getSelection().rangeCount;t++){const n=getSelection().getRangeAt(t);e.push(n)}}addEventListener("mousemove",o,!0),addEventListener("click",r,!0),addEventListener("keyup",a,!0),document.addEventListener("contextmenu",n,!0),getSelection().removeAllRanges()})),e?G():void 0)}function G(){const t=getSelection();let e;for(let n=0;n<t.rangeCount;n++){let o=t.getRangeAt(n);if(o&&o.commonAncestorContainer){const t=document.createTreeWalker(o.commonAncestorContainer);let n=!1,r=!1;for(;!r;)(n||t.currentNode==o.startContainer||t.currentNode==o.endContainer)&&(n=!0,o.startContainer==o.endContainer&&o.startOffset==o.endOffset||(e=!0,_(t.currentNode))),e&&t.currentNode==o.startContainer&&V(t.currentNode),t.currentNode==o.endContainer?r=!0:t.nextNode();e&&t.currentNode==o.endContainer&&t.currentNode.querySelectorAll&&t.currentNode.querySelectorAll("*").forEach((t=>_(t)))}}return e}function _(t){(t.nodeType==Node.ELEMENT_NODE?t:t.parentElement).setAttribute(g,"")}function V(t){t.parentElement&&(_(t),V(t.parentElement))}function z(){let t=document.querySelector(E);return t||(t=J(E,document.body),t.style.setProperty("box-sizing","border-box","important"),t.style.setProperty("background-color","#3ea9d7","important"),t.style.setProperty("border","10px solid #0b4892","important"),t.style.setProperty("border-radius","2px","important"),t.style.setProperty("opacity",".25","important"),t.style.setProperty("pointer-events","none","important"),t.style.setProperty("position","absolute","important"),t.style.setProperty("transition","all 100ms","important"),t.style.setProperty("cursor","pointer","important"),t.style.setProperty("z-index","2147483647","important"),t.style.removeProperty("border-inline-end"),t.style.removeProperty("border-inline-start"),t.style.removeProperty("inline-size"),t.style.removeProperty("block-size"),t.style.removeProperty("inset-block-start"),t.style.removeProperty("inset-inline-end"),t.style.removeProperty("inset-block-end"),t.style.removeProperty("inset-inline-start")),t}function X(){try{if(U=document.querySelector(v),!U){U=J(v);const t=U.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=`\n\t\t\t\t@keyframes single-file-pulse { \n\t\t\t\t\t0% { \n\t\t\t\t\t\topacity: .25;\n\t\t\t\t\t} \n\t\t\t\t\t100% { \n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t} \n\t\t\t\t}\n\t\t\t\t.${S} {\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 24px;\n\t\t\t\t\tleft: 8px;\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t\topacity: 0.9;\n\t\t\t\t\tpadding: 4px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\tmin-width: ${D}px;\n\t\t\t\t\tmin-height: 16px;\n\t\t\t\t\ttransition: height 100ms;\n\t\t\t\t}\n\t\t\t\t.${C} {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tjustify-content: space-between;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tfont-family: arial, sans-serif;\n\t\t\t\t\tcolor: black;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t}\n\t\t\t\t.${x} {\n\t\t\t\t\tfont-size: 13px;\n\t\t\t\t\topacity: 1;\n\t\t\t\t\ttransition: opacity 200ms;\n\t\t\t\t}\n\t\t\t\t.${I} {\n\t\t\t\t\tfont-size: 11px;\n\t\t\t\t\tmin-width: 15px;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t\tposition: relative;\n\t\t\t\t\ttop: 1px;\n\t\t\t\t}\n\t\t\t`,t.appendChild(e);const n=document.createElement("div");n.classList.add(S),t.appendChild(n)}}catch(t){}}function j(t,e,n,o){try{if(o.logsEnabled){const o=U.shadowRoot.querySelector("."+S);let r=o.querySelector("[data-id='"+t+"']");if(!r){r=document.createElement("div"),r.classList.add(C),o.appendChild(r),r.setAttribute("data-id",t);const n=document.createElement("div");n.classList.add(x),r.appendChild(n),n.textContent=e;const a=document.createElement("div");a.classList.add(I),r.appendChild(a)}!function(t,e,n){const o=t.childNodes[0],r=t.childNodes[1];o.textContent=e,r.style.setProperty("color","✓"==n?"#055000":"black"),"✓"==n?(o.style.setProperty("opacity",".5"),r.style.setProperty("opacity",".5"),r.style.setProperty("animation","none")):r.style.setProperty("animation","1s ease-in-out 0s infinite alternate none running single-file-pulse");r.textContent=n}(r,e,n)}}catch(t){}}function Q(t,e){let n,o=t,r=[];do{const t=o.getBoundingClientRect();if(o.parentElement){const a=o.parentElement.getBoundingClientRect();n=Math.abs(a[e]-t[e])<=L,n&&(o.parentElement.clientWidth>L&&o.parentElement.clientHeight>L&&(o.parentElement.clientWidth-o.clientWidth>L||o.parentElement.clientHeight-o.clientHeight>L)&&r.push(o.parentElement),o=o.parentElement)}else n=!1}while(n&&o);return r}function Z(t,e,n,o){return Math[t](n/L)<=o.length&&(e=o[o.length-Math[t](n/L)-1]),e}function J(t,e){const n=document.createElement(t);return n.className=T,e&&e.appendChild(n),N.forEach((t=>n.style.setProperty(t,"initial","important"))),n}X();const K=globalThis.singlefile,Y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhmlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mSlUqHewg4hChOogFURFHqWIRLJS2QqsOJpf+CE0akhQXR8G14ODPYtXBxVlXB1dBEPwBcXNzUnSREr9LCi1ivOO4h/e+9+XuO0Col5lqdowDqmYZqXhMzOZWxMAruhGiOYohiZl6Ir2Qgef4uoeP73dRnuVd9+foVfImA3wi8SzTDYt4nXh609I57xOHWUlSiM+Jxwy6IPEj12WX3zgXHRZ4ZtjIpOaIw8RisY3lNmYlQyWeIo4oqkb5QtZlhfMWZ7VcZc178hcG89pymuu0BhHHIhJIQoSMKjZQhoUo7RopJlJ0HvPwDzj+JLlkcm2AkWMeFaiQHD/4H/zurVmYnHCTgjGg88W2P4aBwC7QqNn297FtN04A/zNwpbX8lTow80l6raVFjoDQNnBx3dLkPeByB+h/0iVDciQ/LaFQAN7P6JtyQN8t0LPq9q15jtMHIEO9WroBDg6BkSJlr3m8u6u9b//WNPv3A6mTcr3f/E/sAAAABmJLR0QAigCKAIrj2uckAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QkPDysvCdPVuwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAELSURBVHja7ZpLFsIwDAPj3v/OsGHDe1BIa8tKO7Mnlkw+dpoxAAAAAGCfx4ur6Yx/B337UUS4mp/VuWUEcjSfOgO+BXCZCWe0hSqQo/npBLglIUNLdAV2MH84Ad1JyIwdLkK6YoabIHWscBWmihHuAqvHtv+XqmdXOK9TxdKy3axUm2vZkXXGgPJksTuz1bVFeeU2Y6ijsLIpXbtKa1kDs2ews69o7+A+ihJ2lvI+/lcS1G21zUVG18XKNm4OS4BNkGOQQohSmGaIdpgLESvzyiRwKepsXjE2H0ZWMF8Zi4+jK5mviM0DiRXNZ2rhkdTK5jO0xermz2o8dCnq+FS2XNNVH0sDAAAA3JYnre9cH8BZmhEAAAAASUVORK5CYII=",$=K.helper.SINGLE_FILE_UI_ELEMENT_CLASS,tt="singlefile-error-bar",et=new Set(Array.from(getComputedStyle(document.documentElement)));let nt;function ot(t,e){try{if(console.error("SingleFile",t,e),nt=document.querySelector(tt),!nt){nt=function(t,e){const n=document.createElement(t);n.className=$,e&&e.appendChild(n);return et.forEach((t=>n.style.setProperty(t,"initial","important"))),n}(tt);const n=nt.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent="\n\t\t\t\t.container {\n\t\t\t\t\tbackground-color: #ff6c00;\n\t\t\t\t\tcolor: white;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0px;\n\t\t\t\t\tleft: 0px;\n\t\t\t\t\tright: 0px;\n\t\t\t\t\theight: auto;\n\t\t\t\t\twidth: auto;\n\t\t\t\t\tmin-height: 24px;\n\t\t\t\t\tmin-width: 24px;\t\t\t\t\t\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t\tmargin: 0;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tfont-family: Arial;\n\t\t\t\t}\n\t\t\t\t.text {\n\t\t\t\t\tflex: 1;\n\t\t\t\t\tpadding-top: 4px;\n\t\t\t\t\tpadding-bottom: 4px;\n\t\t\t\t\tpadding-left: 8px;\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t.close-button {\n\t\t\t\t\topacity: .7;\n\t\t\t\t\tpadding-top: 4px;\n\t\t\t\t\tpadding-left: 8px;\n\t\t\t\t\tpadding-right: 8px;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\ttransition: opacity 250ms;\n\t\t\t\t\theight: 16px;\n\t\t\t\t}\n\t\t\t\ta {\n\t\t\t\t\tcolor: #303036;\n\t\t\t\t}\n\t\t\t\t.close-button:hover {\n\t\t\t\t\topacity: 1;\n\t\t\t\t}\n\t\t\t",n.appendChild(o);const r=document.createElement("div");r.className="container";const a=document.createElement("span");a.classList.add("text");const i=t.split("__DOC_LINK__");if(a.textContent="SingleFile error: "+i[0],e&&2==i.length){const t=document.createElement("a");t.textContent=e,t.href=e,t.target="_blank",a.appendChild(t),a.appendChild(document.createTextNode(i[1]))}r.appendChild(a);const s=document.createElement("img");s.classList.add("close-button"),r.appendChild(s),n.appendChild(r),s.src=Y,s.onclick=t=>{0===t.button&&nt.remove()},document.body.appendChild(nt)}}catch(t){}}const rt=globalThis.singlefile,at=globalThis.singlefileBootstrap,it="moz-extension:";let st,lt;rt.init({fetch:async function(t,e={}){try{const u={cache:"force-cache",headers:e.headers};return await(e.referrer&&s?async function(t,e){const s=new Promise(((s,p)=>{c(new CustomEvent(n,{detail:JSON.stringify({url:t,options:e})})),l(o,f,!1),l(r,m,!1);const u=setTimeout((()=>{h(),p(new Error(a))}),i);function m(e){e.detail?e.detail.url==t&&(h(),e.detail.response?s({status:e.detail.status,headers:new Map(e.detail.headers),arrayBuffer:async()=>e.detail.response}):p(e.detail.error)):p()}function f(){clearTimeout(u)}function h(){d(r,m,!1),d(o,f,!1)}}));try{return await s}catch(n){if(n&&n.message==a)return p(t,e);throw n}}(t,u):p(t,u))}catch(n){u++;const o=new Promise(((t,e)=>m.set(u,{resolve:t,reject:e})));return await f({method:"singlefile.fetch",url:t,requestId:u,referrer:e.referrer,headers:e.headers}),o}},frameFetch:async function(t,e){const n=await f({method:"singlefile.fetchFrame",url:t,frameId:e.frameId,referrer:e.referrer,headers:e.headers});return{status:n.status,headers:new Map(n.headers),arrayBuffer:async()=>new Uint8Array(n.array).buffer}}}),browser.runtime.onMessage.addListener((t=>{if("content.save"==t.method||"content.cancelSave"==t.method||"content.getSelectedLinks"==t.method||"content.error"==t.method)return async function(t){if(!location.href.startsWith(it)){if("content.save"==t.method)return await async function(t){const n=t.options;let o;(n.selected||n.optionallySelected)&&(o=await F(n.optionallySelected));if(!(lt||at&&at.pageInfo.processing)){if(n.updatedResources=at?at.pageInfo.updatedResources:{},n.visitDate=at?at.pageInfo.visitDate:new Date,Object.keys(n.updatedResources).forEach((t=>n.updatedResources[t].retrieved=!1)),n.optionallySelected&&o&&(n.selected=!0),!n.selected||o){at&&(at.pageInfo.processing=!0),lt=!0;try{const t=await async function(t){const e=rt.processors.frameTree;let n;t.keepFilename=t.saveToGDrive||t.saveToGitHub||t.saveWithWebDAV,rt.helper.initDoc(document),O(t),st=new rt.SingleFile(t);const o=[];if(t.insertCanonicalLink=!0,!t.saveRawPage){if(!t.removeFrames&&e&&globalThis.frames&&globalThis.frames.length){let n;n=t.loadDeferredImages?new Promise((n=>setTimeout((()=>n(e.getAsync(t))),t.loadDeferredImagesMaxIdleTime-e.TIMEOUT_INIT_REQUEST_MESSAGE))):e.getAsync(t),function(t){j("load-frames",k,"…",t)}(t),n.then((()=>{st.cancelled||function(t){j("load-frames",k,"✓",t)}(t)})),o.push(n)}if(t.loadDeferredImages){const e=rt.processors.lazy.process(t);!function(t){j("load-deferred-images",R,"…",t)}(t),e.then((()=>{st.cancelled||function(t){j("load-deferred-images",R,"✓",t)}(t)})),o.push(e)}}let r=0,a=0;t.onprogress=e=>{st.cancelled||(e.type==e.RESOURCES_INITIALIZED&&(a=e.detail.max,t.loadDeferredImages&&rt.processors.lazy.resetZoomLevel(t)),e.type==e.RESOURCES_INITIALIZED||e.type==e.RESOURCE_LOADED?(e.type==e.RESOURCE_LOADED&&r++,browser.runtime.sendMessage({method:"ui.processProgress",index:r,maxIndex:a}),q(r,a,t)):e.detail.frame||e.type==e.PAGE_LOADING||e.type==e.PAGE_LOADED||(e.type==e.STAGE_STARTED?e.detail.step<3&&function(t,e){j("step-"+t,`${P} ${t+1} / 3`,"…",e)}(e.detail.step,t):e.type==e.STAGE_ENDED?e.detail.step<3&&function(t,e){j("step-"+t,`${P} ${t+1} / 3`,"✓",e)}(e.detail.step,t):(e.type==e.STAGE_TASK_STARTED||e.type==e.STAGE_TASK_ENDED)&&(e.detail.step,e.detail.task)))},[t.frames]=await new Promise((t=>{const e=Promise.all(o),n=st.cancel.bind(st);st.cancel=function(){n(),t([[]])},e.then((()=>t(e)))})),n=t.frames&&t.frames.sessionId;const i=t.frames&&t.frames.find((t=>t.requestedFrame));t.win=globalThis,i?(t.content=i.content,t.url=i.baseURI,t.canvases=i.canvases,t.fonts=i.fonts,t.stylesheets=i.stylesheets,t.images=i.images,t.posters=i.posters,t.videos=i.videos,t.usedFonts=i.usedFonts,t.shadowRoots=i.shadowRoots):t.doc=document;st.cancelled||await st.run();n&&e.cleanup(n);let s;st.cancelled||(t.confirmInfobarContent&&(t.infobarContent=M("Infobar content",t.infobarContent)||""),s=await st.getPageData(),(t.selected||t.optionallySelected)&&document.querySelectorAll("["+g+"]").forEach((t=>t.removeAttribute(g))),W(),t.displayStats&&(console.log("SingleFile stats"),console.table(s.stats)));return s}(n);t&&((!n.backgroundSave&&!n.saveToClipboard||n.saveToGDrive||n.saveToGitHub||n.saveWithCompanion||n.saveWithWebDAV)&&n.confirmFilename&&(t.filename=M("Save as",t.filename)||t.filename),await e(t,n))}catch(t){st.cancelled||(console.error(t),browser.runtime.sendMessage({method:"ui.processError",error:t}))}}else browser.runtime.sendMessage({method:"ui.processCancelled"});lt=!1,at&&(at.pageInfo.processing=!1)}}(t),{};if("content.cancelSave"==t.method)return st&&(st.cancel(),W(),browser.runtime.sendMessage({method:"ui.processCancelled"})),t.options.loadDeferredImages&&rt.processors.lazy.resetZoomLevel(t.options),{};if("content.getSelectedLinks"==t.method)return{urls:H()};"content.error"==t.method&&ot(t.error,t.link)}}(t)}))}));
