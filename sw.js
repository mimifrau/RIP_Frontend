if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),f={module:{uri:c},exports:o,require:t};i[c]=Promise.all(s.map((e=>f[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DX3cbCzL.css",revision:null},{url:"assets/index-JeTLxYYY.js",revision:null},{url:"index.html",revision:"c7b38ca88fe75f414f99b37eaa2d7cac"},{url:"registerSW.js",revision:"c59f69a97e2e064aad24de3ebfc9ea47"},{url:"favicon.ico",revision:"f2413d192135c1f5194f5e7016a8a4d0"},{url:"pwa-192x192.png",revision:"befb82638ebfb5c672ec7f706c36f760"},{url:"pwa-512x512.png",revision:"65d2283264dbc6fc7c46ed485302b02b"},{url:"manifest.webmanifest",revision:"71fc014e822b39dbfcd060f108e7d9be"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
