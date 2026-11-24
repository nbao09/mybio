(() => {
const words={
  "vi": {
    "title": "Donate",
    "intro": "Bạn có thể ủng hộ qua một trong hai tài khoản dưới đây.",
    "enlarge": "Bấm để xem mã lớn ↗",
    "copy": "Sao chép",
    "imageError": "Không tải được QR. Bạn vẫn có thể sao chép số tài khoản.",
    "thanks": "Cảm ơn bạn đã ủng hộ.",
    "copied": "Đã sao chép số tài khoản: ",
    "fallback": "Số tài khoản: ",
    "copyLabel": "Sao chép số tài khoản "
  },
  "en": {
    "title": "Donate",
    "intro": "You can support my projects using either account below.",
    "enlarge": "Open full-size QR ↗",
    "copy": "Copy",
    "imageError": "QR could not load. You can still copy the account number.",
    "thanks": "Thanks for your support.",
    "copied": "Account number copied: ",
    "fallback": "Account number: ",
    "copyLabel": "Copy account number "
  }
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
document.querySelectorAll('.donate-qr-code').forEach(img=>{
const error=()=>{img.closest('.donate-qr-art').hidden=true;img.closest('.donate-card').querySelector('.donate-image-error').hidden=false};
img.addEventListener('error',error);if(img.complete&&!img.naturalWidth)error();
});
new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
update();
})();