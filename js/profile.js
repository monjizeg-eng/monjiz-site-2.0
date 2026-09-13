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
    wrap.innerHTML = "<p class='pf-empty'>" + I18N.t("dashboard.profileNotFound") + "</p>";
    return;
  }

  const nicheKey = f.niche && NICHE_META[f.niche] ? NICHE_META[f.niche].key : "niche.all";
  const skills = (f.skills || "").split(/[,،\n]/).map((s) => s.trim()).filter(Boolean);

  const allFreelancers = await fetchFreelancers();
  const related = (allFreelancers || [])
    .filter((u) => u.id !== id && (u.niche === f.niche || !f.niche || !u.niche))
    .slice(0, 3);

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
  const av = initials.length > 1 ? initials[0][0] + initials[1][0] : (f.name || "م")[0];
  const rate = f.rate ? `الأجر: من ${f.rate} ج.م` : "";
  const relatedHtml = related.length
    ? `<div class="pf-recommend-grid">${related.map((u) => {
        const relatedSkills = (u.skills || "").split(/[,،\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 2);
        const relatedName = esc(u.name || "مستقل");
        const relatedRole = u.niche && NICHE_META[u.niche] ? I18N.t(NICHE_META[u.niche].key) : "مستقل";
        return `
          <div class="pf-recommend-card">
            <div class="pf-recommend-top">
              <div class="pf-recommend-avatar"><img src="${u.avatar_url || ''}" alt="${relatedName}" /></div>
              <div>
                <h4>${relatedName}</h4>
                <p>${relatedRole}</p>
              </div>
            </div>
            <div class="pf-skills">${relatedSkills.length ? relatedSkills.map((s) => `<span class="pf-skill">${esc(s)}</span>`).join("") : "<span class='pf-empty'>مهارات متنوعة</span>"}</div>
            <div style="margin-top:12px"><a class="btn btn-outline btn-sm" href="profile.html?id=${u.id}">عرض الملف</a></div>
          </div>`;
      }).join("")}</div>`
    : "<span class='pf-empty'>لا توجد توصيات حالياً.</span>";

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
      <h3>${I18N.t("dashboard.profileAbout")}</h3>
      <p class="pf-bio">${esc(f.bio || I18N.t("dashboard.profileNoBio"))}</p>
    </div>

    <div class="pf-box">
      <h3>${I18N.t("dashboard.profileSkills")}</h3>
      <div class="pf-skills">${
        skills.length ? skills.map((s) => `<span class="pf-skill">${esc(s)}</span>`).join("") : "<span class='pf-empty'>" + I18N.t("dashboard.profileNoSkills") + "</span>"
      }</div>
    </div>

    <div class="pf-box">
      <h3>${I18N.t("dashboard.profileProjects")}</h3>
      ${ projectsHtml || "<span class='pf-empty'>" + I18N.t("dashboard.profileNoProjects") + "</span>" }
    </div>

    <div class="pf-box pf-recommend">
      <h3>${I18N.t("dashboard.profileRecommended")}</h3>
      ${relatedHtml}
    </div>

    <div style="text-align:center;margin-top:20px">
      <a class="btn btn-dark" href="https://wa.me/201556554537" target="_blank" rel="noopener">${I18N.t("dashboard.profileContact")}</a>
  `;

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  const escapeHtml = esc;
})();
