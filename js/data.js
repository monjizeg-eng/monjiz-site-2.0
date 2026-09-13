/* ===== منجز — بيانات الأقسام ومصادر الاستعلام عن المستقلين =====
   لا توجد بيانات وهمية: المستقلون يظهرون فقط عند تسجيلهم فعلياً عبر
   صفحة التسجيل، ويُخزَّنون محلياً ثم يُعرضون في القسم المناسب لتخصصهم. */

const NICHE_META = {
  design:    { icon: "✦", key: "niche.design" },
  web:       { icon: "▣", key: "niche.web" },
  marketing: { icon: "▲", key: "niche.marketing" },
  business:  { icon: "◈", key: "niche.business" },
};

const WHATSAPP = "https://wa.me/201556554537";

const STORAGE_KEY = "monjiz_users";

// Returns only real registered freelancers from localStorage
function getRegisteredFreelancers() {
  try {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(users) ? users.filter((u) => u && u.type === "freelancer") : [];
  } catch (_) {
    return [];
  }
}
