import{a as n,r as e}from"./app-112b00b3.js";function g({message:r,className:t=""}){return r?n("p",{className:"text-sm text-red-600 "+t,children:r}):null}const h=e.forwardRef(function({type:t="text",name:u,id:a,value:c,className:i,autoComplete:f,required:d,isFocused:l,handleChange:x},s){const o=s||e.useRef();return e.useEffect(()=>{l&&o.current.focus()},[]),n("div",{className:"flex flex-col items-start",children:n("input",{type:t,name:u,id:a,value:c,className:"border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "+i,ref:o,autoComplete:f,required:d,onChange:p=>x(p)})})});export{g as I,h as T};
