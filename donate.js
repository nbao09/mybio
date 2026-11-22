(() => {
const words={
vi:{title:'Mời mình một ly trà nhé',intro:'Một chút yêu thương cho những ý tưởng nhỏ.\nCảm ơn ông vì đã ghé chơi!',enlarge:'Bấm để xem mã lớn ↗',copy:'Sao chép',imageError:'Không tải được QR. Bạn vẫn có thể sao chép số tài khoản.',thanks:'Không cần nhiều đâu, ghé chơi là mình vui rồi ♡',copied:'Đã sao chép số tài khoản: ',fallback:'Số tài khoản: ',copyLabel:'Sao chép số tài khoản '},
en:{title:'Buy me a little tea',intro:'A little love for little ideas.\nThanks for stopping by!',enlarge:'Open full-size QR ↗',copy:'Copy',imageError:'QR could not load. You can still copy the account number.',thanks:'No pressure, I’m happy you’re here ♡',copied:'Account number copied: ',fallback:'Account number: ',copyLabel:'Copy account number '}
};
const t=()=>words[document.documentElement.lang==='en'?'en':'vi'];
const status=document.querySelector('#donate-status');
function update(){
document.querySelectorAll('[data-donate]').forEach(el=>{el.textContent=t()[el.dataset.donate]});
document.querySelectorAll('[data-account]').forEach(el=>el.setAttribute('aria-label',t().copyLabel+el.dataset.account));
status.textContent='';
}
document.querySelectorAll('[data-account]').forEach(button=>button.addEventListener('click',async()=>{
let copied=false;try{await navigator.clipboard.writeText(button.dataset.account);copied=true}catch{}
status.textContent=(copied?t().copied:t().fallback)+button.dataset.account;
}));
document.querySelectorAll('.donate-qr img').forEach(img=>{
const error=()=>{img.hidden=true;img.closest('.donate-card').querySelector('.donate-image-error').hidden=false};
img.addEventListener('error',error);if(img.complete&&!img.naturalWidth)error();
});
new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
update();
})();