(() => {
const $=s=>document.querySelector(s);
const canvas=$('#flappy-canvas'),ctx=canvas.getContext('2d');
if(!ctx)return;
const W=320,H=400,FLOOR=374,R=12;
let best=0;try{const saved=Number(localStorage.getItem('nbao-flappy-best'));best=Number.isFinite(saved)?Math.max(0,Math.floor(saved)):0}catch{}
let open=false,state='ready',bird={y:180,v:0},pipes=[],score=0,clock=0,last=0,raf=0,endedAt=0;
const words={
vi:{toggle:'Chơi một chút',close:'Đóng game',score:'Điểm',best:'Kỷ lục',help:'Chạm / click / Space để bay',ready:'Bay một chút nhé?',start:'Chạm để bắt đầu',over:'Úi, thử lại nào!',retry:'Chạm để chơi lại',paused:'Tạm dừng',resume:'Chạm để tiếp tục',canvas:'Chạm hoặc nhấn Space để bay'},
en:{toggle:'A little game',close:'Close game',score:'Score',best:'Best',help:'Tap / click / Space to flap',ready:'Ready for a little flight?',start:'Tap to start',over:'Oops! One more try?',retry:'Tap to play again',paused:'Paused',resume:'Tap to resume',canvas:'Tap or press Space to flap'}
};
const t=()=>words[document.documentElement.lang==='en'?'en':'vi'];
function labels(){
const s=t();$('#flappy-toggle-text').textContent=s.toggle;$('#flappy-close').setAttribute('aria-label',s.close);
$('#flappy-score-label').textContent=s.score;$('#flappy-best-label').textContent=s.best;$('#flappy-help').textContent=s.help;canvas.setAttribute('aria-label',s.canvas);draw();
}
function scores(){$('#flappy-score').textContent=score;$('#flappy-best').textContent=best}
function reset(){bird={y:180,v:0};pipes=[];score=0;clock=0;state='ready';scores();$('#flappy-live').textContent=''}
function stop(){cancelAnimationFrame(raf);raf=0;last=0}
function schedule(){if(open&&!document.hidden&&!raf)raf=requestAnimationFrame(frame)}
function finish(){
state='over';endedAt=performance.now();
if(score>best){best=score;try{localStorage.setItem('nbao-flappy-best',String(best))}catch{}}
scores();$('#flappy-live').textContent=t().over+' '+t().score+': '+score;stop();
}
function step(dt){
bird.v+=850*dt;bird.y+=bird.v*dt;clock+=dt;
if(clock>=1.65){clock-=1.65;const gap=132;const center=105+Math.random()*150;pipes.push({x:W+8,top:center-gap/2,bottom:center+gap/2,passed:false})}
for(const p of pipes){
p.x-=(112+Math.min(score*2,30))*dt;
if(!p.passed&&p.x+48<78-R){p.passed=true;score++;scores()}
if(78+R>p.x&&78-R<p.x+48&&(bird.y-R<p.top||bird.y+R>p.bottom)){finish();return}
}
pipes=pipes.filter(p=>p.x>-55);
if(bird.y-R<=0||bird.y+R>=FLOOR)finish();
}
function draw(){
ctx.fillStyle='#fff4fa';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='#eddae6';ctx.lineWidth=1;
for(let x=0;x<W;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,FLOOR);ctx.stroke()}
for(let y=0;y<FLOOR;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
ctx.fillStyle='#ffffff';[[42,65],[180,100],[260,43]].forEach(([x,y])=>{ctx.beginPath();ctx.ellipse(x,y,27,9,0,0,Math.PI*2);ctx.fill()});
for(const p of pipes){ctx.fillStyle='#d4a5c4';ctx.fillRect(p.x,0,48,p.top);ctx.fillRect(p.x,p.bottom,48,FLOOR-p.bottom);ctx.fillStyle='#a76691';ctx.fillRect(p.x-3,p.top-12,54,12);ctx.fillRect(p.x-3,p.bottom,54,12)}
ctx.fillStyle='#ead5e2';ctx.fillRect(0,FLOOR,W,H-FLOOR);ctx.fillStyle='#c590b4';ctx.fillRect(0,FLOOR,W,3);
ctx.save();ctx.translate(78,bird.y);ctx.rotate(Math.max(-.4,Math.min(.85,bird.v/600)));
ctx.fillStyle='#db7eaf';ctx.beginPath();ctx.ellipse(0,0,15,12,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#f8cce5';ctx.beginPath();ctx.ellipse(-6,3,8,5,-.3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(7,-4,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#422c3d';ctx.beginPath();ctx.arc(9,-4,2,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#d7a450';ctx.beginPath();ctx.moveTo(13,0);ctx.lineTo(23,4);ctx.lineTo(13,7);ctx.fill();ctx.restore();
if(state!=='running'){
ctx.fillStyle='#fff9fceF';ctx.fillRect(20,148,280,96);
ctx.textAlign='center';ctx.fillStyle='#78435f';ctx.font='600 16px system-ui';
const s=t();ctx.fillText(state==='over'?s.over:state==='paused'?s.paused:s.ready,W/2,179);
ctx.font='12px system-ui';ctx.fillText(state==='over'?s.retry:state==='paused'?s.resume:s.start,W/2,208);
}
}
function frame(now){
raf=0;if(!open||document.hidden||state!=='running')return;
const dt=last?Math.min((now-last)/1000,.035):0;last=now;step(dt);draw();
if(state==='running')schedule();
}
function flap(){
if(!open)return;
if(state==='over'){if(performance.now()-endedAt<400)return;reset()}
if(state==='ready'||state==='paused'){state='running';last=0}
bird.v=-285;schedule();draw();
}
function setOpen(value){
open=value;window.nbaoUI.setPanel($('#flappy-panel'),value);$('#flappy-toggle').setAttribute('aria-expanded',String(value));
if(value){
const musicClose=$('#music-close');if(musicClose&&!$('#music-panel').hidden)musicClose.click();
scores();draw();canvas.focus();
}else{if(state==='running')state='paused';stop();$('#flappy-toggle').focus()}
}
$('#flappy-toggle').addEventListener('click',()=>setOpen(!open));
$('#flappy-close').addEventListener('click',()=>setOpen(false));
canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.focus();flap()});
canvas.addEventListener('keydown',e=>{if(['Space','ArrowUp','Enter'].includes(e.code)){e.preventDefault();if(!e.repeat)flap()}});
$('#flappy-panel').addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='running'){state='paused';stop();draw()}});
$('#music-toggle')?.addEventListener('click',()=>{if(open)setOpen(false)});
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
scores();labels();
})();