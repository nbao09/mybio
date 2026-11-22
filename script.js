const translations = {
vi: {
navAbout:"về mình",navInterests:"sở thích",navContact:"kết nối",eyebrow:"MỘT GÓC NHỎ TRÊN INTERNET",hello:"// xin chào, mình là",name:"Bảo",
lead:"Một chút công nghệ.<br>Một chút sáng tạo. Rất nhiều tò mò.",
description:"Thích máy tính, mê những góc bàn đẹp và hay mày mò vài thứ mới. Đây là góc nhỏ để mình kể một chút về những điều mình thích.",
sayHi:"Chào mình một tiếng",explore:"Khám phá thêm ↓",location:"Vĩnh Phúc, Việt Nam",myself:"cứ là mình thôi",behind:"người ở phía sau màn hình ↘",illustrated:"cũng là mình, bản vẽ.",curiosity:"làm từ sự tò mò",percent:"100% là mình",design:"THIẾT KẾ",experiments:"THỬ NGHIỆM NHỎ",keepExploring:"CỨ KHÁM PHÁ THÔI",
interestsLabel:"01 / NHỮNG ĐIỀU MÌNH THÍCH",interestsTitle:"Mày mò một chút mỗi ngày",learning:"Chưa phải chuyên gia.<br>Nhưng luôn thích học thêm.",
pcTitle:"PC & góc bàn",pcBody:"Decor góc bàn, sắp xếp setup và cài Windows. Thích cảm giác mọi thứ chạy ngon và nhìn cũng đẹp.",
designTitle:"Thiết kế một chút",designBody:"Biến ý tưởng thành hình ảnh bằng Photoshop và Canva. Thử màu, thử chữ, rồi thử lại đến khi thấy ưng.",
ideasTitle:"Làm vì thấy vui",ideasBody:"Từ một ý tưởng bất chợt đến một thứ có thể dùng được. Dự án nhỏ thôi, nhưng niềm vui thì lớn.",
contactLabel:"02 / KẾT NỐI",contactTitle:"Có gì hay,<br>kể mình nghe",contactBody:"Chuyện máy tính, thiết kế,<br>hay đơn giản là một lời chào.",
copy:"sao chép ↗",copied:"Đã sao chép email. Nhắn mình nhé!",copyFallback:"Email của mình: ",footer:"làm với một chút tò mò",backTop:"Về đầu trang ↑",
photoAlt:"Ảnh chân dung của Bảo",drawingAlt:"Chân dung minh họa của Bảo với tóc đen và kính",home:"nbao trang chủ",navigation:"Điều hướng",language:"Chọn ngôn ngữ",toDark:"Bật giao diện tối",toLight:"Bật giao diện sáng",title:"nbao / một chút về mình",meta:"Góc nhỏ của nbao — máy tính, thiết kế và những điều làm vì thích."
},
en: {
navAbout:"about",navInterests:"interests",navContact:"say hello",eyebrow:"A LITTLE SPACE ON THE INTERNET",hello:"// hey there, I'm",name:"Bảo",
lead:"A little tech.<br>A little creativity. A lot of curiosity.",
description:"Into computers, cozy desk setups, and trying something new. This is my little corner to share a few things I love.",
sayHi:"Say hello",explore:"Take a look around ↓",location:"Vinh Phuc, Vietnam",myself:"just being myself",behind:"the person behind the screen ↘",illustrated:"me, but illustrated.",curiosity:"made of curiosity",percent:"100% myself",design:"DESIGN",experiments:"LITTLE EXPERIMENTS",keepExploring:"KEEP EXPLORING",
interestsLabel:"01 / THINGS I ENJOY",interestsTitle:"A little exploring, every day",learning:"Still learning.<br>Always curious.",
pcTitle:"PCs & desk setups",pcBody:"Decorating desks, putting setups together, and installing Windows. I love things that run smoothly and look good, too.",
designTitle:"A little design",designBody:"Turning ideas into visuals with Photoshop and Canva. Trying colors, trying type, then trying again until it feels right.",
ideasTitle:"Just for the fun of it",ideasBody:"From a random idea to something you can actually use. Small projects, big little moments of joy.",
contactLabel:"02 / LET'S CONNECT",contactTitle:"Something cool?<br>Tell me about it",contactBody:"Computers, design,<br>or just a friendly hello.",
copy:"copy ↗",copied:"Email copied. Say hello!",copyFallback:"My email: ",footer:"made with a little curiosity",backTop:"Back to top ↑",
photoAlt:"A portrait of Bảo",drawingAlt:"An illustrated portrait of Bảo with black hair and glasses",home:"nbao home",navigation:"Navigation",language:"Choose language",toDark:"Switch to dark theme",toLight:"Switch to light theme",title:"nbao / a little about me",meta:"nbao's little corner — computers, design, and things made for the fun of it."
}};
let language = 'vi';
const themeButton = document.querySelector('#theme');
const readPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
function updateThemeLabel() {
  const light = document.body.classList.contains('light');
  themeButton.textContent = light ? '☾' : '☀';
  themeButton.setAttribute('aria-label', translations[language][light ? 'toDark' : 'toLight']);
  themeButton.setAttribute('aria-pressed', String(!light));
  document.querySelector('meta[name="theme-color"]').content = light ? '#faf7f9' : '#211b24';
}
function setLanguage(next) {
  language = Object.hasOwn(translations, next) ? next : 'vi';
  const strings = translations[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    // All translated markup is a fixed local string; only line breaks use HTML.
    const value = strings[el.dataset.i18n];
    el.replaceChildren(...value.split('<br>').flatMap((part, index) =>
      index ? [document.createElement('br'), document.createTextNode(part)] : [document.createTextNode(part)]
    ));
  });
  document.querySelectorAll('[data-alt]').forEach(el => { el.alt = strings[el.dataset.alt]; });
  document.querySelectorAll('[data-label]').forEach(el => { el.setAttribute('aria-label', strings[el.dataset.label]); });
  document.querySelectorAll('[data-lang]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.lang === language)); });
  document.title = strings.title;
  document.querySelector('meta[name="description"]').content = strings.meta;
  document.querySelector('#notice').textContent = '';
  updateThemeLabel();
}
document.body.classList.toggle('light', readPreference('nbao-theme') !== 'dark');
setLanguage(readPreference('nbao-language') || 'vi');
document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => { setLanguage(button.dataset.lang); savePreference('nbao-language', language); });
});
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  updateThemeLabel();
  savePreference('nbao-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy').addEventListener('click', async () => {
  let copied = false;
  try { await navigator.clipboard.writeText('baoabcd09@gmail.com'); copied = true; } catch {}
  document.querySelector('#notice').textContent = copied ? translations[language].copied : translations[language].copyFallback + 'baoabcd09@gmail.com';
});
