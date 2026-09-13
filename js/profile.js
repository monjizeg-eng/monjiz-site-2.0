/* ===== منجز — عرض ملف مستقل عام ===== */
(async function () {
  const id = new URLSearchParams(location.search).get("id");
  const wrap = document.getElementById("profileWrap");

  if (!id) {
    wrap.innerHTML = "<p class='pf-empty'>معرّف غير صالح.</p>";
    return;
  }

  const f = await getFreelancerById(id);
  if (!f) {
    wrap.innerHTML = "<p class='pf-empty'>لم يتم العثور على هذا المستقل.</p>";
    return;
  }

  const nicheKey = f.niche && NICHE_META[f.niche] ? NICHE_META[f.niche].key : "niche.all";
  const skills = (f.skills || "").split(/[,،\n]/).map((s) => s.trim()).filter(Boolean);
  const portfolio = Array.isArray(f.portfolio) ? f.portfolio : [];
  const initials = (f.name || "م").split(/\s+/).filter(Boolean);
  const av = initials.length > 1 ? initials[0][0] + initials[1][0] : f.name[0];
  const rate = f.rate ? `الأجر: من ${f.rate} ج.م` : "";

  wrap.innerHTML = `
    <div class="pf-head">
      <div class="row">
        <div class="pf-avatar"><img src="${f.avatar_url || ''}" alt="" style="display:${f.avatar_url ? 'block' : 'none'};width:100%;height:100%;border-radius:50%;object-fit:cover"></div>
        <div>
          <div class="pf-name">${esc(f.name || "مستقل")}</div>
          <div class="pf-role">${I18N.t(nicheKey)}</div>
          <div class="pf-rate">${rate}</div>
        </div>
      </div>
    </div>

    <div class="pf-box">
      <h3>نبذة</h3>
      <p class="pf-bio">${esc(f.bio || "لا توجد نبذة بعد.")}</p>
    </div>

    <div class="pf-box">
      <h3>المهارات</h3>
      <div class="pf-skills">${
        skills.length ? skills.map((s) => `<span class="pf-skill">${esc(s)}</span>`).join("") : "<span class='pf-empty'>لم تُضف مهارات.</span>"
      }</div>
    </div>

    <div class="pf-box">
      <h3>أعمالي</h3>
      <div class="pf-gallery">${
        portfolio.length ? portfolio.map((w) => `<img src="${w.url}" alt="">`).join("") : "<span class='pf-empty'>لا توجد صور أعمال بعد.</span>"
      }</div>
    </div>

    <div style="text-align:center;margin-top:20px">
      <a class="btn btn-dark" href="https://wa.me/201556554537" target="_blank" rel="noopener">تواصل معه عبر واتساب</a>
    </div>
  `;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
})();
