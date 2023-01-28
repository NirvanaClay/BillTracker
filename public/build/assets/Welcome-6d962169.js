import{R as H,r as s,j as S,a as h,d as b,F as Ee}from"./app-112b00b3.js";/**
 * @remix-run/router v1.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},B.apply(this,arguments)}var P;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(P||(P={}));const ee="popstate";function we(e){e===void 0&&(e={});function t(n,o){let{pathname:a,search:l,hash:i}=n.location;return K("",{pathname:a,search:l,hash:i},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function r(n,o){return typeof o=="string"?o:F(o)}return Re(t,r,null,e)}function C(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Se(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function be(){return Math.random().toString(36).substr(2,8)}function te(e,t){return{usr:e.state,key:e.key,idx:t}}function K(e,t,r,n){return r===void 0&&(r=null),B({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?L(t):t,{state:r,key:t&&t.key||n||be()})}function F(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function L(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Re(e,t,r,n){n===void 0&&(n={});let{window:o=document.defaultView,v5Compat:a=!1}=n,l=o.history,i=P.Pop,c=null,u=d();u==null&&(u=0,l.replaceState(B({},l.state,{idx:u}),""));function d(){return(l.state||{idx:null}).idx}function f(){let m=P.Pop,v=d();if(v!=null){let w=v-u;i=m,u=v,c&&c({action:i,location:p.location,delta:w})}else Se(!1,"You are trying to block a POP navigation to a location that was not created by @remix-run/router. The block will fail silently in production, but in general you should do all navigation with the router (instead of using window.history.pushState directly) to avoid this situation.")}function g(m,v){i=P.Push;let w=K(p.location,m,v);r&&r(w,m),u=d()+1;let O=te(w,u),N=p.createHref(w);try{l.pushState(O,"",N)}catch{o.location.assign(N)}a&&c&&c({action:i,location:p.location,delta:1})}function y(m,v){i=P.Replace;let w=K(p.location,m,v);r&&r(w,m),u=d();let O=te(w,u),N=p.createHref(w);l.replaceState(O,"",N),a&&c&&c({action:i,location:p.location,delta:0})}function E(m){let v=o.location.origin!=="null"?o.location.origin:o.location.href,w=typeof m=="string"?m:F(m);return C(v,"No window.location.(origin|href) available to create URL for href: "+w),new URL(w,v)}let p={get action(){return i},get location(){return e(o,l)},listen(m){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(ee,f),c=m,()=>{o.removeEventListener(ee,f),c=null}},createHref(m){return t(o,m)},createURL:E,encodeLocation(m){let v=E(m);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:g,replace:y,go(m){return l.go(m)}};return p}var ne;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ne||(ne={}));function Pe(e,t,r){r===void 0&&(r="/");let n=typeof t=="string"?L(t):t,o=ue(n.pathname||"/",r);if(o==null)return null;let a=se(e);Ue(a);let l=null;for(let i=0;l==null&&i<a.length;++i)l=$e(a[i],We(o));return l}function se(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let o=(a,l,i)=>{let c={relativePath:i===void 0?a.path||"":i,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};c.relativePath.startsWith("/")&&(C(c.relativePath.startsWith(n),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(n.length));let u=U([n,c.relativePath]),d=r.concat(c);a.children&&a.children.length>0&&(C(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),se(a.children,t,d,u)),!(a.path==null&&!a.index)&&t.push({path:u,score:je(u,a.index),routesMeta:d})};return e.forEach((a,l)=>{var i;if(a.path===""||!((i=a.path)!=null&&i.includes("?")))o(a,l);else for(let c of ce(a.path))o(a,l,c)}),t}function ce(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,o=r.endsWith("?"),a=r.replace(/\?$/,"");if(n.length===0)return o?[a,""]:[a];let l=ce(n.join("/")),i=[];return i.push(...l.map(c=>c===""?a:[a,c].join("/"))),o&&i.push(...l),i.map(c=>e.startsWith("/")&&c===""?"/":c)}function Ue(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:De(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Ne=/^:\w+$/,Le=3,Ie=2,Oe=1,ke=10,Be=-2,re=e=>e==="*";function je(e,t){let r=e.split("/"),n=r.length;return r.some(re)&&(n+=Be),t&&(n+=Ie),r.filter(o=>!re(o)).reduce((o,a)=>o+(Ne.test(a)?Le:a===""?Oe:ke),n)}function De(e,t){return e.length===t.length&&e.slice(0,-1).every((n,o)=>n===t[o])?e[e.length-1]-t[t.length-1]:0}function $e(e,t){let{routesMeta:r}=e,n={},o="/",a=[];for(let l=0;l<r.length;++l){let i=r[l],c=l===r.length-1,u=o==="/"?t:t.slice(o.length)||"/",d=Fe({path:i.relativePath,caseSensitive:i.caseSensitive,end:c},u);if(!d)return null;Object.assign(n,d.params);let f=i.route;a.push({params:n,pathname:U([o,d.pathname]),pathnameBase:_e(U([o,d.pathnameBase])),route:f}),d.pathnameBase!=="/"&&(o=U([o,d.pathnameBase]))}return a}function Fe(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Te(e.path,e.caseSensitive,e.end),o=t.match(r);if(!o)return null;let a=o[0],l=a.replace(/(.)\/+$/,"$1"),i=o.slice(1);return{params:n.reduce((u,d,f)=>{if(d==="*"){let g=i[f]||"";l=a.slice(0,a.length-g.length).replace(/(.)\/+$/,"$1")}return u[d]=Me(i[f]||"",d),u},{}),pathname:a,pathnameBase:l,pattern:e}}function Te(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Q(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(l,i)=>(n.push(i),"/([^\\/]+)"));return e.endsWith("*")?(n.push("*"),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),n]}function We(e){try{return decodeURI(e)}catch(t){return Q(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Me(e,t){try{return decodeURIComponent(e)}catch(r){return Q(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+r+").")),e}}function ue(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function Q(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Ae(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:o=""}=typeof e=="string"?L(e):e;return{pathname:r?r.startsWith("/")?r:Ve(r,t):t,search:Je(n),hash:ze(o)}}function Ve(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?r.length>1&&r.pop():o!=="."&&r.push(o)}),r.length>1?r.join("/"):"/"}function J(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function de(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function he(e,t,r,n){n===void 0&&(n=!1);let o;typeof e=="string"?o=L(e):(o=B({},e),C(!o.pathname||!o.pathname.includes("?"),J("?","pathname","search",o)),C(!o.pathname||!o.pathname.includes("#"),J("#","pathname","hash",o)),C(!o.search||!o.search.includes("#"),J("#","search","hash",o)));let a=e===""||o.pathname==="",l=a?"/":o.pathname,i;if(n||l==null)i=r;else{let f=t.length-1;if(l.startsWith("..")){let g=l.split("/");for(;g[0]==="..";)g.shift(),f-=1;o.pathname=g.join("/")}i=f>=0?t[f]:"/"}let c=Ae(o,i),u=l&&l!=="/"&&l.endsWith("/"),d=(a||l===".")&&r.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const U=e=>e.join("/").replace(/\/\/+/g,"/"),_e=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Je=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,ze=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class He{constructor(t,r,n,o){o===void 0&&(o=!1),this.status=t,this.statusText=r||"",this.internal=o,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}}function Ke(e){return e instanceof He}const qe=["post","put","patch","delete"];[...qe];/**
 * React Router v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},q.apply(this,arguments)}function Ge(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const Xe=typeof Object.is=="function"?Object.is:Ge,{useState:Ye,useEffect:Qe,useLayoutEffect:Ze,useDebugValue:et}=H;function tt(e,t,r){const n=t(),[{inst:o},a]=Ye({inst:{value:n,getSnapshot:t}});return Ze(()=>{o.value=n,o.getSnapshot=t,z(o)&&a({inst:o})},[e,n,t]),Qe(()=>(z(o)&&a({inst:o}),e(()=>{z(o)&&a({inst:o})})),[e]),et(n),n}function z(e){const t=e.getSnapshot,r=e.value;try{const n=t();return!Xe(r,n)}catch{return!0}}function nt(e,t,r){return t()}const rt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ot=!rt,at=ot?nt:tt;"useSyncExternalStore"in H&&(e=>e.useSyncExternalStore)(H);const fe=s.createContext(null),pe=s.createContext(null),W=s.createContext(null),M=s.createContext(null),I=s.createContext({outlet:null,matches:[]}),me=s.createContext(null);function lt(e,t){let{relative:r}=t===void 0?{}:t;j()||C(!1);let{basename:n,navigator:o}=s.useContext(W),{hash:a,pathname:l,search:i}=ge(e,{relative:r}),c=l;return n!=="/"&&(c=l==="/"?n:U([n,l])),o.createHref({pathname:c,search:i,hash:a})}function j(){return s.useContext(M)!=null}function A(){return j()||C(!1),s.useContext(M).location}function V(){j()||C(!1);let{basename:e,navigator:t}=s.useContext(W),{matches:r}=s.useContext(I),{pathname:n}=A(),o=JSON.stringify(de(r).map(i=>i.pathnameBase)),a=s.useRef(!1);return s.useEffect(()=>{a.current=!0}),s.useCallback(function(i,c){if(c===void 0&&(c={}),!a.current)return;if(typeof i=="number"){t.go(i);return}let u=he(i,JSON.parse(o),n,c.relative==="path");e!=="/"&&(u.pathname=u.pathname==="/"?e:U([e,u.pathname])),(c.replace?t.replace:t.push)(u,c.state,c)},[e,t,o,n])}function ge(e,t){let{relative:r}=t===void 0?{}:t,{matches:n}=s.useContext(I),{pathname:o}=A(),a=JSON.stringify(de(n).map(l=>l.pathnameBase));return s.useMemo(()=>he(e,JSON.parse(a),o,r==="path"),[e,a,o,r])}function it(e,t){j()||C(!1);let{navigator:r}=s.useContext(W),n=s.useContext(pe),{matches:o}=s.useContext(I),a=o[o.length-1],l=a?a.params:{};a&&a.pathname;let i=a?a.pathnameBase:"/";a&&a.route;let c=A(),u;if(t){var d;let p=typeof t=="string"?L(t):t;i==="/"||(d=p.pathname)!=null&&d.startsWith(i)||C(!1),u=p}else u=c;let f=u.pathname||"/",g=i==="/"?f:f.slice(i.length)||"/",y=Pe(e,{pathname:g}),E=dt(y&&y.map(p=>Object.assign({},p,{params:Object.assign({},l,p.params),pathname:U([i,r.encodeLocation?r.encodeLocation(p.pathname).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?i:U([i,r.encodeLocation?r.encodeLocation(p.pathnameBase).pathname:p.pathnameBase])})),o,n||void 0);return t&&E?s.createElement(M.Provider,{value:{location:q({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:P.Pop}},E):E}function st(){let e=mt(),t=Ke(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:n},a={padding:"2px 4px",backgroundColor:n};return s.createElement(s.Fragment,null,s.createElement("h2",null,"Unhandled Thrown Error!"),s.createElement("h3",{style:{fontStyle:"italic"}},t),r?s.createElement("pre",{style:o},r):null,s.createElement("p",null,"💿 Hey developer 👋"),s.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",s.createElement("code",{style:a},"errorElement")," props on ",s.createElement("code",{style:a},"<Route>")))}class ct extends s.Component{constructor(t){super(t),this.state={location:t.location,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location?{error:t.error,location:t.location}:{error:t.error||r.error,location:r.location}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error?s.createElement(I.Provider,{value:this.props.routeContext},s.createElement(me.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ut(e){let{routeContext:t,match:r,children:n}=e,o=s.useContext(fe);return o&&o.static&&o.staticContext&&r.route.errorElement&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),s.createElement(I.Provider,{value:t},n)}function dt(e,t,r){if(t===void 0&&(t=[]),e==null)if(r!=null&&r.errors)e=r.matches;else return null;let n=e,o=r?.errors;if(o!=null){let a=n.findIndex(l=>l.route.id&&o?.[l.route.id]);a>=0||C(!1),n=n.slice(0,Math.min(n.length,a+1))}return n.reduceRight((a,l,i)=>{let c=l.route.id?o?.[l.route.id]:null,u=r?l.route.errorElement||s.createElement(st,null):null,d=t.concat(n.slice(0,i+1)),f=()=>s.createElement(ut,{match:l,routeContext:{outlet:a,matches:d}},c?u:l.route.element!==void 0?l.route.element:a);return r&&(l.route.errorElement||i===0)?s.createElement(ct,{location:r.location,component:u,error:c,children:f(),routeContext:{outlet:null,matches:d}}):f()},null)}var oe;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator"})(oe||(oe={}));var T;(function(e){e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator"})(T||(T={}));function ht(e){let t=s.useContext(pe);return t||C(!1),t}function ft(e){let t=s.useContext(I);return t||C(!1),t}function pt(e){let t=ft(),r=t.matches[t.matches.length-1];return r.route.id||C(!1),r.route.id}function mt(){var e;let t=s.useContext(me),r=ht(T.UseRouteError),n=pt(T.UseRouteError);return t||((e=r.errors)==null?void 0:e[n])}function $(e){C(!1)}function gt(e){let{basename:t="/",children:r=null,location:n,navigationType:o=P.Pop,navigator:a,static:l=!1}=e;j()&&C(!1);let i=t.replace(/^\/*/,"/"),c=s.useMemo(()=>({basename:i,navigator:a,static:l}),[i,a,l]);typeof n=="string"&&(n=L(n));let{pathname:u="/",search:d="",hash:f="",state:g=null,key:y="default"}=n,E=s.useMemo(()=>{let p=ue(u,i);return p==null?null:{pathname:p,search:d,hash:f,state:g,key:y}},[i,u,d,f,g,y]);return E==null?null:s.createElement(W.Provider,{value:c},s.createElement(M.Provider,{children:r,value:{location:E,navigationType:o}}))}function vt(e){let{children:t,location:r}=e,n=s.useContext(fe),o=n&&!t?n.router.routes:G(t);return it(o,r)}var ae;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(ae||(ae={}));new Promise(()=>{});function G(e,t){t===void 0&&(t=[]);let r=[];return s.Children.forEach(e,(n,o)=>{if(!s.isValidElement(n))return;if(n.type===s.Fragment){r.push.apply(r,G(n.props.children,t));return}n.type!==$&&C(!1),!n.props.index||!n.props.children||C(!1);let a=[...t,o],l={id:n.props.id||a.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,hasErrorBoundary:n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle};n.props.children&&(l.children=G(n.props.children,a)),r.push(l)}),r}/**
 * React Router DOM v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function X(){return X=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},X.apply(this,arguments)}function yt(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function xt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ct(e,t){return e.button===0&&(!t||t==="_self")&&!xt(e)}const Et=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"];function wt(e){let{basename:t,children:r,window:n}=e,o=s.useRef();o.current==null&&(o.current=we({window:n,v5Compat:!0}));let a=o.current,[l,i]=s.useState({action:a.action,location:a.location});return s.useLayoutEffect(()=>a.listen(i),[a]),s.createElement(gt,{basename:t,children:r,location:l.location,navigationType:l.action,navigator:a})}const k=s.forwardRef(function(t,r){let{onClick:n,relative:o,reloadDocument:a,replace:l,state:i,target:c,to:u,preventScrollReset:d}=t,f=yt(t,Et),g=lt(u,{relative:o}),y=St(u,{replace:l,state:i,target:c,preventScrollReset:d,relative:o});function E(p){n&&n(p),p.defaultPrevented||y(p)}return s.createElement("a",X({},f,{href:g,onClick:a?n:E,ref:r,target:c}))});var le;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(le||(le={}));var ie;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(ie||(ie={}));function St(e,t){let{target:r,replace:n,state:o,preventScrollReset:a,relative:l}=t===void 0?{}:t,i=V(),c=A(),u=ge(e,{relative:l});return s.useCallback(d=>{if(Ct(d,r)){d.preventDefault();let f=n!==void 0?n:F(c)===F(u);i(e,{replace:f,state:o,preventScrollReset:a,relative:l})}},[c,i,u,n,o,r,e,a,l])}function bt({id:e,text:t,imgUrl:r,amount:n,deleteItem:o}){return S("li",{className:"item-container",children:[h("p",{className:"item-text",children:t}),h("p",{className:"item-price",children:n}),h("i",{className:"fas fa-xmark delete-icon",onClick:o})]})}function Rt({users:e,email:t,setEmail:r,password:n,setPassword:o,setCsrfToken:a,user:l,user_id:i,setUser:c,loginStatus:u,setLoginStatus:d,expenses:f,setExpenses:g}){const[y,E]=s.useState(""),[p,m]=s.useState(""),[v,w]=s.useState(null),[O,N]=s.useState(0),_=s.useRef(null),ve=x=>{if(x.preventDefault(),console.log("In addItem, user_id is:"),console.log(i),!y||!p){w("Both text and amount fields are required.");return}if(isNaN(p)||p<0){w("amount should only contain numbers.");return}u&&b.post("/addExpense",{name:y,amount:p,user_id:i});let Z=Number(p).toFixed(2);m(Z),g([...f,{name:y,amount:Z}]),E(""),m(""),w(null),_.current.focus()},ye=x=>{g(f.filter(R=>R.id!==x)),b.delete(`expenses/${x}`)},xe=V(),Ce=async x=>{x.preventDefault(),b.post("logout").then(()=>b.get("csrf-token")).then(R=>{console.log("About to set loginStatus to false."),d(!1),a(R.data),g([]),xe("/",{replace:!0})})};return s.useEffect(()=>{let x=0;if(f)for(let R of f)x+=Number(R.amount);x=x.toFixed(2),N(x)},[f]),S("div",{className:"list",children:[u?h("h1",{children:"My Expenses"}):h("h1",{children:"Expense Tracker"}),h("p",{className:"app-description",children:"Gain clarity by keeping track of your monthly expenses."}),!u&&S("p",{className:"guest-message",children:[h(k,{to:"/login",children:"Login"})," or ",h(k,{to:"/register",children:"Register"})," to save your expenses."]}),S("ul",{className:`items-container ${f.length<1&&"no-expenses"}`,children:[f.map((x,R)=>h(bt,{id:x.id,text:x.name,amount:x.amount,deleteItem:()=>ye(x.id)},R)),f.length>0&&S("p",{className:"total-expenses",children:["Total Expenses: ",O]})]}),S("div",{className:"form-container",children:[h("input",{ref:_,className:"item-text",value:y,name:"name",type:"text",onChange:x=>E(x.target.value),placeholder:"Expense"}),h("div",{className:"amount-container",children:h("input",{value:p,className:"item-amount",type:"number",name:"amount",step:"0.01",min:"0",max:"10000",onChange:x=>m(x.target.value),placeholder:"Amount"})}),v&&h("div",{className:"error-message",children:v})]}),h("button",{className:"submit-btn",onClick:ve,children:"Add Item"}),u&&h("form",{onSubmit:Ce,children:h("button",{type:"submit",className:"logout-btn",children:"Logout"})})]})}const Pt=({email:e,setEmail:t,password:r,setPassword:n,password_confirmation:o,setPasswordConfirmation:a,setCsrfToken:l,setLoginStatus:i,user:c,setUser:u})=>{const d=V();return h("div",{className:"register-container",children:S("form",{className:"register-form",onSubmit:g=>{if(g.preventDefault(),r!==o){console.error("Passwords do not match");return}b.post("register",{email:e,password:r,password_confirmation:o}).then(y=>{l(y.data),b.defaults.headers.common["X-CSRF-TOKEN"]=y.data,console.log("Setting loginStatus to true from register."),i(!0),d("/",{replace:!0})})},children:[h("div",{className:"register-field",children:S("label",{htmlFor:"email",children:["Email:",h("input",{type:"email",name:"email",value:e,onChange:g=>t(g.target.value),required:!0})]})}),h("div",{className:"register-field",children:S("label",{htmlFor:"password",children:["Password:",h("input",{type:"password",name:"password",value:r,onChange:g=>n(g.target.value),required:!0})]})}),h("div",{className:"register-field",children:S("label",{htmlFor:"password_confirmation",children:["Confirm Password:",h("input",{type:"password",name:"password_confirmation",value:o,onChange:g=>a(g.target.value),required:!0})]})}),h("button",{type:"submit",children:"Register"})]})})};/*! js-cookie v3.0.1 | MIT */function D(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)e[n]=r[n]}return e}var Ut={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function Y(e,t){function r(o,a,l){if(!(typeof document>"u")){l=D({},t,l),typeof l.expires=="number"&&(l.expires=new Date(Date.now()+l.expires*864e5)),l.expires&&(l.expires=l.expires.toUTCString()),o=encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var c in l)l[c]&&(i+="; "+c,l[c]!==!0&&(i+="="+l[c].split(";")[0]));return document.cookie=o+"="+e.write(a,o)+i}}function n(o){if(!(typeof document>"u"||arguments.length&&!o)){for(var a=document.cookie?document.cookie.split("; "):[],l={},i=0;i<a.length;i++){var c=a[i].split("="),u=c.slice(1).join("=");try{var d=decodeURIComponent(c[0]);if(l[d]=e.read(u,d),o===d)break}catch{}}return o?l[o]:l}}return Object.create({set:r,get:n,remove:function(o,a){r(o,"",D({},a,{expires:-1}))},withAttributes:function(o){return Y(this.converter,D({},this.attributes,o))},withConverter:function(o){return Y(D({},this.converter,o),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(e)}})}Y(Ut,{path:"/"});const Nt=({email:e,setEmail:t,password:r,setPassword:n,setCsrfToken:o,setLoginStatus:a,user:l,setUser:i})=>{b.defaults.withCredentials=!0;const c=V();return h("div",{className:"login-container",children:S("form",{className:"login-form",onSubmit:async d=>{d.preventDefault(),b.post("login",{email:e,password:r}).then(f=>b.get("getCsrf")).then(f=>{console.log("About to set loginStatus to true."),a(!0),o(f.data),c("/",{replace:!0})})},autocomplete:"off",children:[S("div",{className:"login-field",children:[h("label",{htmlFor:"email",children:"Email:"}),h("input",{type:"email",id:"email",onChange:d=>t(d.target.value),placeholder:"Enter your email",autocapitalize:"off",autocomplete:"off",autocorrect:"off",autofocus:"",role:"combobox",spellcheck:"false"})]}),S("div",{className:"login-field",children:[h("label",{htmlFor:"password",children:"Password:"}),h("input",{type:"password",id:"password",onChange:d=>n(d.target.value),placeholder:"Enter your password",autocapitalize:"off",autocomplete:"off",autocorrect:"off",autofocus:"",role:"combobox",spellcheck:"false"})]}),h("button",{type:"submit",children:"Login"})]})})},Lt=()=>h("nav",{className:"navbar",children:S("ul",{children:[h("li",{children:h(k,{to:"/",children:"Home"})}),h("li",{children:h(k,{to:"/register",children:"Register"})}),h("li",{children:h(k,{to:"/login",children:"Login"})})]})});function Ot(){const[e,t]=s.useState(!1),[r,n]=s.useState(),[o,a]=s.useState(),[l,i]=s.useState(""),[c,u]=s.useState(""),[d,f]=s.useState(""),[g,y]=s.useState(""),[E,p]=s.useState([]);return s.useEffect(()=>{b.get("checkLogin").then(m=>{m.data?(console.log("There is a user."),t(!0)):(console.log("There is not a user."),t(!1))})},[]),s.useEffect(()=>{b.get("getCsrf").then(m=>{y(m.data),console.log("return of getCsrf in effect is:"),console.log(m.data),b.defaults.headers.common["X-CSRF-TOKEN"]=m.data})},[e]),s.useEffect(()=>{e&&b.get("user").then(m=>{if(m.data){let v=m.data;console.log("currentUser in user effect is:"),console.log(v),n(v),a(v.id)}})},[e]),s.useEffect(()=>{e&&b.get("expenses").then(m=>{let v=m.data;p([...v])})},[e]),s.useEffect(()=>{console.log("Expenses in effect are:"),console.log(E)},[E]),h(Ee,{children:S(wt,{children:[e?"":h(Lt,{}),S(vt,{children:[h($,{exact:!0,path:"/",element:h(Rt,{loginStatus:e,setLoginStatus:t,user:r,setUser:n,user_id:o,email:l,setEmail:i,password:c,setPassword:u,setCsrfToken:y,expenses:E,setExpenses:p})}),h($,{path:"/register",element:h(Pt,{setLoginStatus:t,user:r,setUser:n,email:l,setEmail:i,password:c,setPassword:u,password_confirmation:d,setPasswordConfirmation:f,setCsrfToken:y})}),h($,{path:"/login",element:h(Nt,{setLoginStatus:t,user:r,setUser:n,email:l,setEmail:i,password:c,setPassword:u,setCsrfToken:y})})]})]})})}export{Ot as default};