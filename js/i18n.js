/* ===== منجز — نظام الترجمة (عربي / English) ===== */
const I18N = (function () {
  const dict = {
    ar: {
      // Nav
      "nav.home": "الرئيسية",
      "nav.services": "الخدمات",
      "nav.freelancers": "المستقلون",
      "nav.how": "كيف يعمل",
      "nav.why": "لماذا منجز",
      "nav.about": "من نحن",
      "nav.client": "للعملاء",
      "nav.join": "انضم كمستقل",
      "nav.account": "حسابي",
      "brand": "منجز <em>Monjiz</em>",

      // Hero
      "hero.tag": "منصة عربية للمحترفين المصريين",
      "hero.title": "محترفونا <span>سيتكفلون بالباقي</span>",
      "hero.sub": "محترفون مصريون موثقون ينجزون لك مهامك بجودة عالية وسرعة فائقة — من التصميم والتطوير إلى التسويق ودعم الأعمال.",
      "hero.ctaClient": "انشر مهمة — للعملاء",
      "hero.ctaJoin": "انضم كمستقل",
      "hero.s1n": "+٣٠٠", "hero.s1l": "محترف موثق",
      "hero.s2n": "+١٠٠٠", "hero.s2l": "مهمة منجزة",
      "hero.s3n": "٤ نجوم", "hero.s3l": "متوسط التقييم",
      "hero.s4n": "٥ دقائق", "hero.s4l": "متوسط الرد",

      // Services
      "services.eyebrow": "خدماتنا",
      "services.title": "أقسامنا الرئيسية",
      "services.sub": "اختر الخبرة التي تحتاجها من بين أقسامنا المتنوعة",
      "services.designT": "التصميم والمحتوى البصري",
      "services.designS": "Visual Content & Design",
      "services.design1": "شعارات وهويات بصرية",
      "services.design2": "تصميم سوشيال ميديا",
      "services.design3": "مونتاج وتصميم فيديو",
      "services.webT": "تطوير المواقع",
      "services.webS": "Website Developers",
      "services.web1": "مواقع تعريفية ومتاجر",
      "services.web2": "تطبيقات ويب",
      "services.web3": "صيانة وتحسين أداء",
      "services.mktT": "التسويق الرقمي والسوشيال ميديا",
      "services.mktS": "Digital Marketing & Social Media",
      "services.mkt1": "إدارة صفحات التواصل",
      "services.mkt2": "حملات إعلانية ممولة",
      "services.mkt3": "كتابة محتوى ومقالات",
      "services.bizT": "دعم الأعمال",
      "services.bizS": "Business Support",
      "services.biz1": "إدخال ومعالجة بيانات",
      "services.biz2": "أبحاث ومهام إدارية",
      "services.biz3": "مساعدة المكتب والمشاريع",
      "services.browse": "استعرض المستقلين",

      // Popular
      "popular.eyebrow": "الخدمات الأكثر طلباً",
      "popular.title": "الخدمات الأكثر طلباً",
      "popular.sub": "أشهر المهام التي ينجزها محترفونا لعملاء في مصر",
      "popular.chip1": "تصميم لوجو احترافي",
      "popular.chip2": "هوية بصرية متكاملة",
      "popular.chip3": "موقع إلكتروني للمتجر",
      "popular.chip4": "صفحة لاندينج",
      "popular.chip5": "إدارة إنستجرام",
      "popular.chip6": "حملة إعلانية ممولة",
      "popular.chip7": "مونتاج فيديو",
      "popular.chip8": "كتابة محتوى تسويقي",
      "popular.chip9": "تصميم بوستات",
      "popular.chip10": "أتمتة مهام",

      // How it works
      "how.eyebrow": "كيف يعمل",
      "how.title": "كيف يعمل منجز؟",
      "how.sub": "ثلاث خطوات بسيطة تفصلك عن نتيجة احترافية",
      "how.s1t": "اختر خدمتك",
      "how.s1d": "تصفح أقسامنا واختر الخبرة التي تحتاجها، أو قم بنشر مهمة خاصة.",
      "how.s2t": "تواصل مع محترف",
      "how.s2d": "سنقوم بتوصيلك بمقدّم خدمة موثّق يناسب ميزانيتك وجدولك الزمني.",
      "how.s3t": "احصل على النتائج",
      "how.s3d": "استلم عملك بجودة عالية وادفع بأمان عبر إنستا باي أو فودافون كاش.",
      "how.free": "عندك مهمة بسيطة؟ مش لازم تختار خدمة كاملة!",
      "how.freeCta": "انشر مهمة — إنها مجانية!",

      // Why
      "why.eyebrow": "لماذا منجز",
      "why.title": "ليش تختار منجز؟",
      "why.1t": "خبرة محلية", "why.1d": "مواهبنا تفهم السوق المصري والثقافة واللغة العامية.",
      "why.2t": "السرعة", "why.2d": "لا توجد فترات انتظار لمدة ١٤ يومًا؛ تركيزنا الأساسي هو إنجاز المهام الآن.",
      "why.3t": "جودة موثقة", "why.3d": "لا نسمح لأي شخص بالانضمام؛ نراجع كل سابقة أعمال يدويًا لتوفير وقتك.",
      "why.4t": "دفع آمن", "why.4d": "ادفع بأمان عبر إنستا باي أو فودافون كاش بعد اكتمال مهمتك ورضاك عنها.",

      // Pay
      "pay.eyebrow": "طرق الدفع",
      "pay.title": "كيف تدفع؟",
      "pay.desc": "تتم معالجة المدفوعات بأمان عبر <strong>إنستا باي</strong> أو <strong>فودافون كاش</strong>. وبمجرد اكتمال مهمتك ورضاك التام عن النتيجة، ستتلقى تعليمات الدفع.",
      "pay.secure": "دفع آمن",

      // About
      "about.eyebrow": "في قلب مصر",
      "about.title": "من هو منجز؟",
      "about.p1": "يعمل <strong>منجز</strong> على سد الفجوة بين المواهب المحلية والشركات من خلال التحدث بلغتهم، سواء على الصعيد الثقافي أو المالي. ومن خلال العمل محلياً، نتخلص من العقبات المعقدة التي تفرضها المنصات الدولية، مثل رسوم تحويل العملات المرتفعة وبوابات الدفع العالمية المقيدة.",
      "about.p2": "وبالنسبة للمستقلين، يعني هذا استلام المدفوعات بسرعة وأمان من خلال وسائل مألوفة مثل فودافون كاش. أما بالنسبة للعملاء، فيوفر لهم منجز راحة البال بفضل الدعم المحلي والفهم الثقافي المشترك والعملية المبسطة.",
      "about.founder": "مؤسس منجز",
      "about.quote": "\"عايز ترفع مستوى البراند بتاعك وتخليه يبان بشكل احترافي فعلاً؟ أنا هنا أساعدك تحقق ده\"",
      "about.wa": "تواصل عبر واتساب",

      // Start
      "start.title": "جاهز تنجز مهامك؟",
      "start.desc": "انضم إلى مئات الشركات المصرية التي تتقدم وتنمو مع منجز.",
      "start.ctaClient": "سجّل كعميل — ابدأ الآن",
      "start.ctaJoin": "انضم كمستقل",
      "start.cta": "START — ابدأ الآن",

      // Footer
      "footer.slogan": "محترفون مصريون ينجزون عملك بجودة وسرعة وأمان.",
      "footer.quick": "روابط سريعة",
      "footer.talents": "أنواع المواهب",
      "footer.contact": "تواصل معنا",
      "footer.rights": "© 2026 منجز Monjiz — v2.0 · جميع الحقوق محفوظة.",
      "footer.talent.design": "تصميم",
      "footer.talent.web": "تطوير مواقع",
      "footer.talent.marketing": "تسويق رقمي",
      "footer.talent.business": "دعم أعمال",

      // Listing page
      "list.eyebrow": "مستقلونا",
      "list.heroSub": "محترفون موثقون جاهزون لإنجاز مهامك.",
      "list.joinCta": "انضم كمستقل — مجاناً",
      "list.joinText": "مستقل؟ أعرض موهبتك على مئات العملاء المصريين.",
      "list.searchPlaceholder": "ابحث بالاسم أو المهارة",
      "list.sortRating": "الأعلى تقييماً",
      "list.sortRateLow": "الأقل أجراً",
      "list.sortRateHigh": "الأعلى أجراً",
      "list.sortName": "الاسم (أ - ي)",
      "list.emptyTitle": "لا نتائج مطابقة",
      "list.emptyText": "جرّب كلمة بحث أخرى أو غيّر الترتيب.",
      "list.contact": "تواصل",
      "list.book": "احجز",
      "list.jobs": "مهمة منجزة",
      "list.new": "جديد",
      "list.noneTitle": "لا يوجد مستقلون بعد",
      "list.noneText": "كن أول مستقل في هذا القسم؟ سجّل الآن وسنعرض ملفك هنا فورًا.",
      "list.all": "كل المستقلين",

      // Signup shared
      "auth.clientTitle": "سجّل كعميل",
      "auth.clientSub": "انشر مهامك وتواصل مع محترفين مصريين موثقين ينجزونها بسرعة.",
      "auth.freelancerTitle": "انضم كمستقل",
      "auth.freelancerSub": "اعرض موهبتك على مئات الشركات المصرية وابدأ في استقبال المهام.",
      "auth.name": "الاسم الكامل",
      "auth.company": "اسم الشركة / النشاط",
      "auth.phone": "رقم الهاتف (واتساب)",
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.passHint": "٨ أحرف على الأقل",
      "auth.niche": "تخصصك الرئيسي",
      "auth.skills": "مهاراتك",
      "auth.portfolio": "رابط معرض/بورتفوليو",
      "auth.rate": "أجرك التقريبي (ج.م)",
      "auth.experience": "سنوات الخبرة",
      "auth.bio": "نبذة قصيرة عنك",
      "auth.optional": "(اختياري)",
      "auth.terms": "أوافق على شروط الاستخدام وسياسة الخصوصية في منجز.",
      "auth.submitClient": "إنشاء حساب العميل",
      "auth.submitFreelancer": "إنشاء حساب المستقل",
      "auth.switchToF": "انضم كمستقل بدلاً من ذلك",
      "auth.switchToC": "سجّل كعميل",
      "auth.noteClient": "بتسجيلك، أنت توافق على استلام إشعارات عبر واتساب وبريدك الإلكتروني.",
      "auth.reviewNote": "سيتم مراجعة ملفك يدويًا قبل ظهوره في قوائم المستقلين.",
      "auth.successTitle": "تم استلام طلبك!",
      "auth.successF": "سنراجع ملفك يدويًا وسنتواصل معك عبر واتساب خلال ٢٤ ساعة.",
      "auth.successC": "سيتواصل معك فريق منجز قريبًا لمطابقة مهامك مع أفضل محترف.",
      "auth.backHome": "العودة للرئيسية",

      // Niche names
      "niche.all": "كل المستقلين",
      "niche.design": "تصميم",
      "niche.web": "تطوير مواقع",
      "niche.marketing": "تسويق رقمي",
      "niche.business": "دعم أعمال",

      "lang.label": "اللغة",

      // Placeholders
      "ph.name": "مثال: محمد أحمد",
      "ph.phone": "01xxxxxxxxx",
      "ph.email": "you@example.com",
      "ph.company": "شركتك أو مشروعك",
      "ph.password": "••••••••",
      "ph.skills": "لوجو، هوية بصرية، فوتوشوب",
      "ph.portfolio": "https://behance.net/you",
      "ph.rate": "500",
      "ph.bio": "أنا مصمم جرافيك بخبرة ٥ سنوات...",
      "ph.niche": "— اختر تخصصك —",
      "auth.exp1": "أقل من سنة",
      "auth.exp2": "١ - ٣ سنوات",
      "auth.exp3": "٣ - ٥ سنوات",
      "auth.exp4": "أكثر من ٥ سنوات",
      "auth.interest": "ما نوع المهام التي تفكر في نشرها؟",
      "interest.other": "أخرى / لست متأكداً",
      "auth.skillsHint": "(افصل بينها بفاصلة)",
    },

    en: {
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.freelancers": "Freelancers",
      "nav.how": "How it works",
      "nav.why": "Why Monjiz",
      "nav.about": "About",
      "nav.client": "For clients",
      "nav.join": "Join as freelancer",
      "nav.account": "Account",
      "brand": "<em>Monjiz</em> منجز",

      "hero.tag": "An Egyptian talent marketplace",
      "hero.title": "Our freelancers <span>will take it from here</span>",
      "hero.sub": "Verified Egyptian professionals get your work done with high quality and speed — from design and development to marketing and business support.",
      "hero.ctaClient": "Post a task — for clients",
      "hero.ctaJoin": "Join as freelancer",
      "hero.s1n": "+300", "hero.s1l": "Verified talent",
      "hero.s2n": "+1000", "hero.s2l": "Tasks done",
      "hero.s3n": "4★", "hero.s3l": "Average rating",
      "hero.s4n": "5 min", "hero.s4l": "Average reply",

      "services.eyebrow": "Our Services",
      "services.title": "Our main categories",
      "services.sub": "Choose the expertise you need from our varied categories",
      "services.designT": "Design & Visual Content",
      "services.designS": "Visual Content & Design",
      "services.design1": "Logos & brand identity",
      "services.design2": "Social media design",
      "services.design3": "Video editing & design",
      "services.webT": "Website Development",
      "services.webS": "Website Developers",
      "services.web1": "Company sites & stores",
      "services.web2": "Web apps",
      "services.web3": "Maintenance & optimization",
      "services.mktT": "Digital Marketing & Social Media",
      "services.mktS": "Digital Marketing & Social Media",
      "services.mkt1": "Social media management",
      "services.mkt2": "Paid ad campaigns",
      "services.mkt3": "Content & article writing",
      "services.bizT": "Business Support",
      "services.bizS": "Business Support",
      "services.biz1": "Data entry & processing",
      "services.biz2": "Research & admin tasks",
      "services.biz3": "Office & project assistance",
      "services.browse": "Browse freelancers",

      "popular.eyebrow": "Popular Services",
      "popular.title": "Most requested services",
      "popular.sub": "The most common tasks our professionals handle for clients in Egypt",
      "popular.chip1": "Professional logo design",
      "popular.chip2": "Complete brand identity",
      "popular.chip3": "Online store website",
      "popular.chip4": "Landing page",
      "popular.chip5": "Instagram management",
      "popular.chip6": "Paid ad campaign",
      "popular.chip7": "Video editing",
      "popular.chip8": "Marketing copywriting",
      "popular.chip9": "Post design",
      "popular.chip10": "Task automation",

      "how.eyebrow": "How It Works",
      "how.title": "How does Monjiz work?",
      "how.sub": "Three simple steps between you and a professional result",
      "how.s1t": "Choose your service",
      "how.s1d": "Browse our categories and pick the expertise you need, or post a custom task.",
      "how.s2t": "Connect with a pro",
      "how.s2d": "We'll match you with a verified freelancer that fits your budget and timeline.",
      "how.s3t": "Get the results",
      "how.s3d": "Receive your work in high quality and pay securely via InstaPay or Vodafone Cash.",
      "how.free": "Have a simple task? You don't need to pick a full service!",
      "how.freeCta": "Post a task — it's free!",

      "why.eyebrow": "Why Monjiz",
      "why.title": "Why choose Monjiz?",
      "why.1t": "Local expertise", "why.1d": "Our talent understands the Egyptian market, culture, and local slang.",
      "why.2t": "Speed", "why.2d": "No 14-day waiting periods; our main focus is getting tasks done now.",
      "why.3t": "Verified quality", "why.3d": "Not just anyone can join; we manually review every portfolio to save your time.",
      "why.4t": "Secure payment", "why.4d": "Pay safely via InstaPay or Vodafone Cash only after your task is completed to your satisfaction.",

      "pay.eyebrow": "How To Pay",
      "pay.title": "How do I pay?",
      "pay.desc": "Payments are processed securely via <strong>InstaPay</strong> or <strong>Vodafone Cash</strong>. Once your task is complete and you're fully satisfied with the result, you'll receive payment instructions.",
      "pay.secure": "Secure payment",

      "about.eyebrow": "Based in the heart of Egypt",
      "about.title": "Who is Monjiz?",
      "about.p1": "<strong>Monjiz</strong> bridges the gap between local talent and businesses by speaking their language — culturally and financially. By working locally, we remove the complex obstacles set by international platforms, such as high currency-conversion fees and restricted global payment gateways.",
      "about.p2": "For freelancers, this means fast and secure payouts through familiar means like Vodafone Cash. For clients, it means peace of mind thanks to local support, shared cultural understanding, and a simplified process tailored to the Egyptian market.",
      "about.founder": "Founder of Monjiz",
      "about.quote": "\"Want to really level up your brand and make it look truly professional? I'm here to help you achieve that\"",
      "about.wa": "Contact on WhatsApp",

      "start.title": "Ready to get things done?",
      "start.desc": "Join hundreds of Egyptian businesses moving forward and growing with Monjiz.",
      "start.ctaClient": "Sign up as a client — get started",
      "start.ctaJoin": "Join as freelancer",
      "start.cta": "START — Get started",

      "footer.slogan": "Egyptian professionals getting your work done with quality, speed, and trust.",
      "footer.quick": "Quick links",
      "footer.talents": "Talent types",
      "footer.contact": "Contact us",
      "footer.rights": "© 2026 Monjiz — v2.0 · All rights reserved.",
      "footer.talent.design": "Design",
      "footer.talent.web": "Web development",
      "footer.talent.marketing": "Digital marketing",
      "footer.talent.business": "Business support",

      "list.eyebrow": "Our Freelancers",
      "list.heroSub": "Verified professionals ready to get your tasks done.",
      "list.joinCta": "Join as freelancer — free",
      "list.joinText": "A freelancer? Show your talent to hundreds of Egyptian clients.",
      "list.searchPlaceholder": "Search by name or skill",
      "list.sortRating": "Highest rated",
      "list.sortRateLow": "Lowest rate",
      "list.sortRateHigh": "Highest rate",
      "list.sortName": "Name (A-Z)",
      "list.emptyTitle": "No matching results",
      "list.emptyText": "Try a different keyword or change the sort.",
      "list.contact": "Contact",
      "list.book": "Book",
      "list.jobs": "tasks done",
      "list.new": "New",
      "list.noneTitle": "No freelancers here yet",
      "list.noneText": "Want to be the first freelancer in this category? Sign up now and we'll list you right away.",
      "list.all": "All freelancers",

      "auth.clientTitle": "Sign up as a client",
      "auth.clientSub": "Post your tasks and connect with verified Egyptian professionals who get them done fast.",
      "auth.freelancerTitle": "Join as a freelancer",
      "auth.freelancerSub": "Showcase your talent to hundreds of Egyptian businesses and start receiving tasks.",
      "auth.name": "Full name",
      "auth.company": "Company / business",
      "auth.phone": "Phone number (WhatsApp)",
      "auth.email": "Email address",
      "auth.password": "Password",
      "auth.passHint": "At least 8 characters",
      "auth.niche": "Primary specialization",
      "auth.skills": "Your skills",
      "auth.portfolio": "Portfolio / gallery link",
      "auth.rate": "Approx. rate (EGP)",
      "auth.experience": "Years of experience",
      "auth.bio": "Short bio about you",
      "auth.optional": "(optional)",
      "auth.terms": "I agree to Monjiz's terms of service and privacy policy.",
      "auth.submitClient": "Create client account",
      "auth.submitFreelancer": "Create freelancer account",
      "auth.switchToF": "Join as a freelancer instead",
      "auth.switchToC": "Sign up as a client",
      "auth.noteClient": "By signing up, you agree to receive notifications via WhatsApp and email.",
      "auth.reviewNote": "Your profile will be reviewed manually before it appears in listings.",
      "auth.successTitle": "Request received!",
      "auth.successF": "We'll review your profile manually and reach out via WhatsApp within 24 hours.",
      "auth.successC": "The Monjiz team will contact you soon to match your tasks with the best professional.",
      "auth.backHome": "Back to home",

      "niche.all": "All freelancers",
      "niche.design": "Design",
      "niche.web": "Web development",
      "niche.marketing": "Digital marketing",
      "niche.business": "Business support",

      "lang.label": "Language",

      // Placeholders
      "ph.name": "e.g. Mohamed Ahmed",
      "ph.phone": "01xxxxxxxxx",
      "ph.email": "you@example.com",
      "ph.company": "Your company or project",
      "ph.password": "••••••••",
      "ph.skills": "logo, brand identity, Photoshop",
      "ph.portfolio": "https://behance.net/you",
      "ph.rate": "500",
      "ph.bio": "I am a graphic designer with 5 years...",
      "ph.niche": "— Choose your niche —",
      "auth.exp1": "Less than a year",
      "auth.exp2": "1 - 3 years",
      "auth.exp3": "3 - 5 years",
      "auth.exp4": "More than 5 years",
      "auth.interest": "What kind of tasks are you thinking of posting?",
      "interest.other": "Other / not sure",
      "auth.skillsHint": "(separate with commas)",
    },
  };

  let lang = localStorage.getItem("monjiz_lang") || "ar";
  if (!dict[lang]) lang = "ar";

  function t(key) {
    return (dict[lang] && dict[lang][key]) || key;
  }

  function current() {
    return lang;
  }

  // Translate all [data-i18n] (text/HTML) and [data-i18n-ph] (placeholder)
  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = t(key);
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });

    // Placeholder select options / labels translated via data-i18n already.
  }

  // Build a language switch into each .lang-switch container
  function buildSwitches() {
    document.querySelectorAll(".lang-switch").forEach((wrap) => {
      wrap.innerHTML = "";
      [["ar", "عربي"], ["en", "EN"]].forEach(([code, label]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.className = code === lang ? "active" : "";
        b.addEventListener("click", () => setLang(code));
        wrap.appendChild(b);
      });
    });
  }

  function setLang(next) {
    if (!dict[next]) return;
    lang = next;
    localStorage.setItem("monjiz_lang", next);
    apply();
    buildSwitches();
    document.dispatchEvent(new CustomEvent("monjiz:lang", { detail: { lang } }));
  }

  function init() {
    apply();
    buildSwitches();
  }

  return { t, current, apply, init, setLang };
})();

document.addEventListener("DOMContentLoaded", I18N.init);
