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

  // Normalize portfolio to [{title, link, images[]}]
  let projects = Array.isArray(f.portfolio) ? f.portfolio : [];
  if (projects.length && !Array.isArray(projects[0].images)) {
    projects = [{ title: "", link: "", images: projects }];
  }
  const projectsHtml = projects
    .filter((p) => Array.isArray(p.images) && p.images.length)
    .map(
      (p) => `
        <div class="pf-project">
          <div class="pf-head2">
            <h3>${esc(p.title || "مشروع")}</h3>
            ${p.link ? `<a class="btn btn-outline btn-sm pflink" href="${esc(p.link)}" target="_blank" rel="noopener">زيارة المشروع ↗</a>` : ""}
          </div>
          <div class="pf-gallery">${p.images.map((w) => `<img src="${esc(w.url)}" alt="">`).join("")}</div>
        </div>`
    )
    .join("");
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
      <h3>مشاريعي وأعمالي</h3>
      ${ projectsHtml || "<span class='pf-empty'>لا توجد صور أعمال بعد.</span>" }
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
