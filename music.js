(() => {
let tracks=[
{title:'Tìm Em',artist:'Hngle ft. Bảo Anh',src:'audio/tim-em.m4a'},
{title:'Đường Tôi Chở Em Về',artist:'buitruonglinh',src:'audio/duong-toi-cho-em-ve.m4a'},
{title:'Dù Cho Mai Về Sau',artist:'buitruonglinh',src:'audio/du-cho-mai-ve-sau.m4a'}
];
const words={
vi:{toggle:'Một chút nhạc',heading:'nbao / góc nghe nhạc',close:'Thu gọn player',play:'Phát nhạc',pause:'Tạm dừng',prev:'Bài trước',next:'Bài tiếp theo',back:'Lùi 10 giây',forward:'Tiến 10 giây',seek:'Tiến trình bài hát',error:'Không phát được file này. Thử file khác nhé.',loading:'Đang tải nhạc…'},
en:{toggle:'A little music',heading:'nbao / listening corner',close:'Minimize player',play:'Play music',pause:'Pause',prev:'Previous track',next:'Next track',back:'Back 10 seconds',forward:'Forward 10 seconds',seek:'Track progress',error:'Could not play this file. Try another one.',loading:'Loading music…'}
};
const $=s=>document.querySelector(s),audio=$('#site-audio'),progress=$('#audio-progress');
let index=0,request=0,status='';
const t=()=>words[document.documentElement.lang==='en'?'en':'vi'];
const time=n=>Number.isFinite(n)?Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0'):'0:00';
function updateProgress(){
const duration=audio.duration;
progress.disabled=!(Number.isFinite(duration)&&duration>0);
progress.value=progress.disabled?0:Math.round(audio.currentTime/duration*1000);
$('#audio-current').textContent=time(audio.currentTime);
$('#audio-duration').textContent=time(duration);
progress.setAttribute('aria-valuetext',time(audio.currentTime)+' / '+time(duration));
}
function updateLabels(){
const s=t();
$('#music-toggle-label').textContent=s.toggle;
$('#music-heading').textContent=s.heading;
$('#music-close').setAttribute('aria-label',s.close);
for(const [id,key] of [['audio-prev','prev'],['audio-next','next'],['audio-back','back'],['audio-forward','forward'],['audio-progress','seek']]) $('#'+id).setAttribute('aria-label',s[key]);
$('#audio-play').textContent=audio.paused?'▶':'Ⅱ';
$('#audio-play').setAttribute('aria-label',audio.paused?s.play:s.pause);
$('#audio-play').setAttribute('aria-pressed',String(!audio.paused));
$('#audio-status').textContent=status?s[status]:'';
$('#audio-artist').textContent=tracks[index].artist;
$('.audio-disc').classList.toggle('is-playing',!audio.paused);
}
function renderPlaylist(){
$('#music-tracks').replaceChildren();
tracks.forEach((track,i)=>{
const b=document.createElement('button');b.type='button';b.className='track-button';
const number=document.createElement('span');number.className='track-number';number.textContent=String(i+1).padStart(2,'0');
const title=document.createElement('strong');title.textContent=track.title;b.append(number,title);
b.setAttribute('aria-pressed',String(i===index));
b.addEventListener('click',()=>select(i,true));$('#music-tracks').append(b);
});
}
async function play(){
const attempt=++request;
status='loading';updateLabels();
try{await audio.play();if(attempt===request){status='';updateLabels()}}
catch(e){if(attempt!==request||e.name==='AbortError')return;status='error';updateLabels()}
}
function select(next,start=false){
request++;audio.pause();index=(next+tracks.length)%tracks.length;
audio.src=tracks[index].src;audio.load();
$('#audio-title').textContent=tracks[index].title;
$('#audio-count').textContent=String(index+1).padStart(2,'0')+' / '+String(tracks.length).padStart(2,'0');
status='';
renderPlaylist();updateProgress();updateLabels();
if(start)play();
}
function open(value){$('#music-panel').hidden=!value;$('#music-toggle').setAttribute('aria-expanded',String(value))}
$('#music-toggle').addEventListener('click',()=>open($('#music-panel').hidden));
$('#music-close').addEventListener('click',()=>{open(false);$('#music-toggle').focus()});
$('.music-widget').addEventListener('keydown',e=>{if(e.key==='Escape'){open(false);$('#music-toggle').focus()}});
$('#audio-play').addEventListener('click',()=>{if(audio.paused)play();else{request++;audio.pause()}});
$('#audio-prev').addEventListener('click',()=>select(index-1,!audio.paused));
$('#audio-next').addEventListener('click',()=>select(index+1,!audio.paused));
function seek(seconds){if(Number.isFinite(audio.duration)&&audio.duration>0){audio.currentTime=Math.min(audio.duration,Math.max(0,seconds));updateProgress()}}
$('#audio-back').addEventListener('click',()=>seek(audio.currentTime-10));
$('#audio-forward').addEventListener('click',()=>seek(audio.currentTime+10));
progress.addEventListener('input',()=>seek(Number(progress.value)/1000*audio.duration));
for(const event of ['timeupdate','loadedmetadata','durationchange']) audio.addEventListener(event,updateProgress);
for(const event of ['play','pause']) audio.addEventListener(event,updateLabels);
audio.addEventListener('canplay',()=>{status='';updateLabels()});
audio.addEventListener('error',()=>{status='error';updateLabels()});
audio.addEventListener('ended',()=>select(index+1,true));

new MutationObserver(updateLabels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
select(0);
})();