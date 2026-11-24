(() => {
const pet=document.querySelector('#pixel-pet'),canvas=pet.querySelector('canvas'),ctx=canvas.getContext('2d');
if(!ctx)return;
const bubble=pet.querySelector('.pet-bubble');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
canvas.width=48;canvas.height=48;
let x=0,y=0,v=0,target=0,idle=2,drag=null,moved=false,hop=0,frame=0,last=0,raf=0,sayTimer=0;
let direction=1,hidden=false;
const size=96;
const bounds=()=>({maxX:Math.max(0,innerWidth-size),floor:Math.max(0,innerHeight-size-88)});
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const english=()=>document.documentElement.lang==='en';
function label(){pet.setAttribute('aria-label',english()?'Pixel dog. Drag to move, click to pet. Arrow keys move; Enter pets.':'Ch\u00f3 pixel. K\u00e9o \u0111\u1ec3 di chuy\u1ec3n, b\u1ea5m \u0111\u1ec3 vu\u1ed1t ve.')}
function place(){pet.style.transform='translate3d('+Math.round(x)+'px,'+Math.round(y-hop)+'px,0)'}
function draw(walking=false,time=0){
const motion=!reduced.matches,phase=motion?time/120:0;
const bounce=walking?Math.abs(Math.sin(phase))*3:0,breath=motion?Math.sin(time/700):0;
const step=walking?Math.sin(phase)*5:0,blink=motion&&time%4600<150;
ctx.clearRect(0,0,48,48);ctx.save();ctx.scale(.3,.3);
ctx.fillStyle='rgba(70,40,30,.15)';ctx.beginPath();ctx.ellipse(80,149,42,5,0,0,Math.PI*2);ctx.fill();
if(direction<0){ctx.translate(160,0);ctx.scale(-1,1)}
ctx.translate(0,-bounce);ctx.lineJoin='round';ctx.lineCap='round';
const outline='#694937',fur='#e8bd85',light='#ffebc9',ear='#b47a4f';
ctx.strokeStyle=outline;ctx.lineWidth=4;
function oval(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();ctx.stroke()}
const wag=motion?Math.sin(time/(hop>0?70:150))*12:0;
ctx.beginPath();ctx.moveTo(106,118);ctx.quadraticCurveTo(145,118,134+wag,88);ctx.lineWidth=15;ctx.stroke();ctx.strokeStyle=fur;ctx.lineWidth=8;ctx.stroke();ctx.strokeStyle=outline;ctx.lineWidth=4;
oval(59,138-step,13,8,light);oval(103,138+step,13,8,light);
oval(81,111+breath,32,29,fur);
ctx.fillStyle=light;ctx.beginPath();ctx.ellipse(81,117+breath,19,18,0,0,Math.PI*2);ctx.fill();
oval(44,112-step*.5,9,15,fur);oval(117,112+step*.5,9,15,fur);
const flop=motion?Math.sin(time/420)*2:0;
oval(43,66+flop,15,30,ear);oval(120,66-flop,15,30,ear);
oval(81,66+breath,40,34,fur);
ctx.fillStyle='#f4d6a6';ctx.beginPath();ctx.ellipse(80,50+breath,19,16,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle=outline;ctx.lineWidth=4;
for(const eye of [65,100]){
if(blink||hop>3){ctx.beginPath();ctx.arc(eye,64+breath,5,Math.PI,Math.PI*2);ctx.stroke()}
else{ctx.fillStyle='#302b29';ctx.beginPath();ctx.ellipse(eye,62+breath,4,6,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.fillRect(eye,58+breath,2,2)}
}
oval(82,83+breath,22,15,light);
ctx.fillStyle='#45352e';ctx.beginPath();ctx.moveTo(74,75+breath);ctx.quadraticCurveTo(82,70+breath,90,75+breath);ctx.lineTo(83,83+breath);ctx.closePath();ctx.fill();
ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(82,82+breath);ctx.lineTo(82,88+breath);ctx.quadraticCurveTo(75,93+breath,72,87+breath);ctx.moveTo(82,88+breath);ctx.quadraticCurveTo(89,93+breath,92,87+breath);ctx.stroke();
if(walking||hop>0){ctx.fillStyle='#de8d9b';ctx.beginPath();ctx.roundRect(80,89+breath,8,10,3);ctx.fill()}
ctx.strokeStyle='#a85671';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(62,99);ctx.quadraticCurveTo(82,106,101,99);ctx.stroke();
ctx.fillStyle='#e8c46c';ctx.fillRect(79,102,7,7);
ctx.restore();
}
function say(text){bubble.textContent=text;bubble.classList.add('visible');clearTimeout(sayTimer);sayTimer=setTimeout(()=>bubble.classList.remove('visible'),1800)}
function greet(){idle=2;hop=reduced.matches?0:12;say(english()?'woof!':'g\u00e2u!')}
function resize(){const b=bounds();x=clamp(x,0,b.maxX);y=clamp(y,0,b.floor);target=clamp(target,0,b.maxX);place()}
function schedule(){if(!raf&&!document.hidden&&!hidden)raf=requestAnimationFrame(tick)}
function tick(now){
raf=0;const dt=last?Math.min((now-last)/1000,.04):0;last=now;
const b=bounds();let walking=false;
if(!drag&&!reduced.matches){
if(y<b.floor){v+=650*dt;y=Math.min(b.floor,y+v*dt)}else v=0;
if(idle>0)idle-=dt;
else if(Math.abs(target-x)>2){direction=target>x?1:-1;x=clamp(x+direction*Math.min(Math.abs(target-x),43*dt),0,b.maxX);walking=true}
else{idle=.8+Math.random()*2.3;target=Math.random()*b.maxX}
hop=Math.max(0,hop-30*dt);
}
place();draw(walking,now);schedule();
}
x=Math.min(innerWidth*.65,bounds().maxX);y=bounds().floor;target=x;place();draw();label();schedule();
pet.addEventListener('pointerdown',e=>{
if(e.button!==0)return;
drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,x,y};moved=false;v=0;hop=0;
pet.setPointerCapture(e.pointerId);pet.classList.add('dragging');
});
pet.addEventListener('pointermove',e=>{
if(!drag||drag.id!==e.pointerId)return;
const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;
if(Math.hypot(dx,dy)>5)moved=true;
if(moved){x=clamp(drag.x+dx,0,bounds().maxX);y=clamp(drag.y+dy,0,Math.max(0,innerHeight-size));place()}
});
function release(e,cancelled=false){
if(!drag||e.pointerId!==drag.id)return;
if(pet.hasPointerCapture(e.pointerId))pet.releasePointerCapture(e.pointerId);
drag=null;pet.classList.remove('dragging');idle=.8;target=x;y=Math.min(y,bounds().floor);
if(!moved&&!cancelled)greet();
if(reduced.matches){y=clamp(y,0,bounds().floor);place()}
}
pet.addEventListener('pointerup',e=>release(e));
pet.addEventListener('pointercancel',e=>release(e,true));
pet.addEventListener('lostpointercapture',()=>{drag=null;pet.classList.remove('dragging')});
pet.addEventListener('keydown',e=>{
if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter','Space'].includes(e.code)){
e.preventDefault();idle=5;target=x;
if(e.code==='Enter'||e.code==='Space')greet();
else {const b=bounds();if(e.code==='ArrowLeft'){x-=16;direction=-1}if(e.code==='ArrowRight'){x+=16;direction=1}if(e.code==='ArrowUp')y-=16;if(e.code==='ArrowDown')y+=16;x=clamp(x,0,b.maxX);y=clamp(y,0,b.floor);place();draw()}
}
});
window.addEventListener('resize',resize);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else schedule()});
new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();