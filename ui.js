(() => {
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pending=new WeakMap();
window.nbaoUI={setPanel(panel,open){
pending.get(panel)?.cancel();
if(reduced()||!panel.animate){panel.hidden=!open;return}
if(open)panel.hidden=false;else if(panel.hidden)return;
const animation=panel.animate(open?[{opacity:0,transform:'translateY(12px) scale(.97)'},{opacity:1,transform:'none'}]:[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px) scale(.98)'}],{duration:open?230:160,easing:'cubic-bezier(.22,1,.36,1)'});
pending.set(panel,animation);
animation.finished.then(()=>{if(pending.get(panel)!==animation)return;panel.hidden=!open;pending.delete(panel)},()=>{});
}};
new MutationObserver(()=>{if(reduced())return;document.querySelectorAll('[data-i18n], [data-donate]').forEach(el=>el.animate?.([{opacity:.35},{opacity:1}],{duration:220,easing:'ease-out'}))}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();