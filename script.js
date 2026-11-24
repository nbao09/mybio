const translations={
  "vi": {
    "navAbout": "về mình",
    "navInterests": "sở thích",
    "navContact": "kết nối",
    "eyebrow": "TRANG CÁ NHÂN / NBAO",
    "hello": "// xin chào, mình là",
    "name": "Bảo",
    "lead": "Máy tính, thiết kế<br>và vài thứ mình đang thử.",
    "description": "Mình là Bảo. Thích PC, setup góc bàn và thiết kế. Trang này gom những sở thích và dự án mình làm lúc rảnh.",
    "sayHi": "Liên hệ",
    "explore": "Khám phá thêm ↓",
    "location": "Vĩnh Phúc, Việt Nam",
    "myself": "PC / design / DIY",
    "behind": "// ảnh của mình",
    "illustrated": "// bản minh họa",
    "curiosity": "personal space",
    "percent": "nbao / 2026",
    "design": "THIẾT KẾ",
    "experiments": "THỬ NGHIỆM NHỎ",
    "keepExploring": "CỨ KHÁM PHÁ THÔI",
    "interestsLabel": "01 / KỸ NĂNG & DỰ ÁN",
    "interestsTitle": "Kỹ năng & dự án",
    "learning": "Phần cứng, thiết kế<br>và dự án cá nhân.",
    "pcTitle": "PC & setup",
    "pcBody": "Lắp ráp PC, cài Windows và phần mềm, sắp xếp góc máy tính.",
    "designTitle": "Thiết kế đồ họa",
    "designBody": "Thiết kế poster, banner và chỉnh sửa ảnh bằng Photoshop, Canva.",
    "ideasTitle": "Web & điện tử",
    "ideasBody": "Làm web cá nhân và các dự án điện tử sử dụng ESP32.",
    "contactLabel": "02 / KẾT NỐI",
    "contactTitle": "Liên hệ",
    "contactBody": "Bạn có thể nhắn qua mạng xã hội<br>hoặc email bên dưới.",
    "copy": "sao chép ↗",
    "copied": "Đã sao chép email.",
    "copyFallback": "Email của mình: ",
    "footer": "trang cá nhân của Bảo",
    "backTop": "Về đầu trang ↑",
    "photoAlt": "Ảnh chân dung của Bảo",
    "drawingAlt": "Chân dung minh họa của Bảo với tóc đen và kính",
    "home": "nbao trang chủ",
    "navigation": "Điều hướng",
    "language": "Chọn ngôn ngữ",
    "toDark": "Bật giao diện tối",
    "toLight": "Bật giao diện sáng",
    "title": "nbao / trang cá nhân",
    "meta": "Góc nhỏ của nbao — máy tính, thiết kế và những điều làm vì thích.",
    "gmailHint": "Mở Gmail để gửi thư"
  },
  "en": {
    "navAbout": "about",
    "navInterests": "interests",
    "navContact": "say hello",
    "eyebrow": "PERSONAL WEBSITE / NBAO",
    "hello": "// hey there, I'm",
    "name": "Bảo",
    "lead": "Computers, design<br>and things I'm trying out.",
    "description": "I'm Bảo. I'm into PCs, desk setups, and design. This site collects my interests and spare-time projects.",
    "sayHi": "Get in touch",
    "explore": "Take a look around ↓",
    "location": "Vinh Phuc, Vietnam",
    "myself": "PC / design / DIY",
    "behind": "// my photo",
    "illustrated": "// illustrated version",
    "curiosity": "personal space",
    "percent": "nbao / 2026",
    "design": "DESIGN",
    "experiments": "LITTLE EXPERIMENTS",
    "keepExploring": "KEEP EXPLORING",
    "interestsLabel": "01 / SKILLS & PROJECTS",
    "interestsTitle": "Skills & projects",
    "learning": "Hardware, design<br>and personal projects.",
    "pcTitle": "PC & setup",
    "pcBody": "PC assembly, Windows and software installation, and desk setup.",
    "designTitle": "Graphic design",
    "designBody": "Poster and banner design, and photo editing with Photoshop and Canva.",
    "ideasTitle": "Web & electronics",
    "ideasBody": "Personal websites and ESP32 electronics projects.",
    "contactLabel": "02 / LET'S CONNECT",
    "contactTitle": "Contact",
    "contactBody": "Find me on these platforms<br>or send me an email.",
    "copy": "copy ↗",
    "copied": "Email copied.",
    "copyFallback": "My email: ",
    "footer": "Bảo's personal website",
    "backTop": "Back to top ↑",
    "photoAlt": "A portrait of Bảo",
    "drawingAlt": "An illustrated portrait of Bảo with black hair and glasses",
    "home": "nbao home",
    "navigation": "Navigation",
    "language": "Choose language",
    "toDark": "Switch to dark theme",
    "toLight": "Switch to light theme",
    "title": "nbao / personal website",
    "meta": "nbao's little corner — computers, design, and things made for the fun of it.",
    "gmailHint": "Compose an email in Gmail"
  }
};
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

  updateThemeLabel();
}
document.body.classList.remove('light');
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

