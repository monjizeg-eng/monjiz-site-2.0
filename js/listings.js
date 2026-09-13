/* ===== منجز — عارض قوائم المستقلين (من قاعدة بيانات Supabase) ===== */
(function () {
  const params = new URLSearchParams(location.search);
  const nicheKey = params.get("niche");
  const niche = NICHE_META[nicheKey] ? nicheKey : null; // null = all

  const grid = document.getElementById("freelancerGrid");
  const empty = document.getElementById("emptyState");
  const none = document.getElementById("noneState");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");

  // Build niche tabs (localized)
  function buildTabs() {
    const tabs = document.getElementById("nicheTabs");
    tabs.innerHTML = "";
    const all = document.createElement("a");
    all.href = "freelancers.html";
    all.textContent = `▤ ${I18N.t("list.all")}`;
    if (!niche) all.classList.add("active");
    tabs.appendChild(all);
    Object.keys(NICHE_META).forEach((key) => {
      const a = document.createElement("a");
      a.href = `freelancers.html?niche=${key}`;
      a.textContent = `${NICHE_META[key].icon} ${I18N.t(NICHE_META[key].key)}`;
      if (key === niche) a.classList.add("active");
      tabs.appendChild(a);
    });
  }

  // Turn a Supabase row into a display profile
  function profileOf(u) {
    const skills = (u.skills || "")
      .split(/[,،\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      id: u.id,
      name: u.name || "؟",
      role: u.niche && NICHE_META[u.niche] ? I18N.t(NICHE_META[u.niche].key) : I18N.t("niche.all"),
      rating: 0,
      jobs: 0,
      skills: skills.length ? skills : [I18N.t("list.new")],
      bio: u.bio || "",
      rateNum: parseFloat(u.rate) || 0,
      avatar: u.avatar_url || "",
      thumb: (Array.isArray(u.portfolio) && u.portfolio[0] && (u.portfolio[0].url || (u.portfolio[0].images && u.portfolio[0].images[0] && u.portfolio[0].images[0].url))) || "",
      isNew: true,
    };
  }

  // --- Render helpers ---
  function initials(name) {
    const parts = name.split(/\s+/).filter(Boolean);
    return parts.length > 1 ? parts[0][0] + parts[1][0] : (name[0] || "م");
  }
  function stars() { return "☆ ☆ ☆ ☆ ☆"; }
  function formatRate(n) {
    if (!n) return I18N.t("list.new");
    return I18N.current() === "ar" ? `من ${n} ج.م` : `from ${n} EGP`;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function render(list, hasAny) {
    grid.innerHTML = "";
    document.getElementById("listTitle").textContent =
      `${niche ? I18N.t(NICHE_META[niche].key) : I18N.t("list.all")} (${list.length})`;

    if (!list.length) {
      empty.style.display = "block";
      none.style.display = hasAny ? "none" : "block";
      return;
    }
    empty.style.display = "none";
    none.style.display = "none";

    list.forEach((f) => {
      const card = document.createElement("article");
      card.className = "freelancer-card";
      const thumb = f.thumb ? `<img src="${f.thumb}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:12px;margin-bottom:12px;border:1px solid var(--line)">` : "";
      const avatarHtml = f.avatar ? `<img src="${f.avatar}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">` : initials(f.name);
      card.innerHTML = `
        ${thumb}
        <div class="profile">
          <div class="profile-avatar">${avatarHtml}</div>
          <div>
            <div class="profile-name">${esc(f.name)}</div>
            <div class="profile-role">${f.role}</div>
          </div>
        </div>
        <div class="rating">${stars()} <i>· ${I18N.t("list.new")}</i></div>
        <div class="fc-skills">${f.skills.map((s) => `<span class="fc-skill">${esc(s)}</span>`).join("")}</div>
        <p class="fc-bio">${esc(f.bio)}</p>
        <div class="fc-foot">
          <div class="fc-rate">${formatRate(f.rateNum)}</div>
          <div class="fc-actions">
            <a class="btn btn-outline btn-sm" href="profile.html?id=${f.id}">${I18N.t("list.view")}</a>
            <a class="btn btn-dark btn-sm" href="${WHATSAPP}" target="_blank" rel="noopener">${I18N.t("list.contact")}</a>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  async function applyFilterAndSort() {
    let all = await fetchFreelancers();          // real data from Supabase
    const profiles = all.map(profileOf);
    const hasAny = profiles.length > 0;

    let list = profiles;
    if (niche) list = list.filter((f) => f.role === I18N.t(NICHE_META[niche].key));

    const q = (searchInput.value || "").trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) => f.name.toLowerCase().includes(q) || f.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    const sort = sortSelect.value;
    if (sort === "rate-low") list.sort((a, b) => a.rateNum - b.rateNum);
    else if (sort === "rate-high") list.sort((a, b) => b.rateNum - a.rateNum);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    render(list, hasAny);

    document.getElementById("heroTitle").textContent =
      niche ? I18N.t(NICHE_META[niche].key) : I18N.t("list.all");
    document.getElementById("heroSub").textContent = I18N.t("list.heroSub");
    document.title = `${I18N.t(niche ? NICHE_META[niche].key : "list.all")} | Monjiz`;
  }

  // Static localized labels
  function staticLabels() {
    document.getElementById("listEyebrow").textContent = I18N.t("list.eyebrow");
    document.getElementById("emptyTitle").textContent = I18N.t("list.emptyTitle");
    document.getElementById("emptyText").textContent = I18N.t("list.emptyText");
    document.getElementById("noneTitle").textContent = I18N.t("list.noneTitle");
    document.getElementById("noneText").textContent = I18N.t("list.noneText");
    document.getElementById("joinText").textContent = I18N.t("list.joinText");
    document.getElementById("joinCta").textContent = I18N.t("list.joinCta");
    searchInput.setAttribute("placeholder", I18N.t("list.searchPlaceholder"));
    sortSelect.options[0].textContent = I18N.t("list.sortRating");
    sortSelect.options[1].textContent = I18N.t("list.sortRateLow");
    sortSelect.options[2].textContent = I18N.t("list.sortRateHigh");
    sortSelect.options[3].textContent = I18N.t("list.sortName");
    document.querySelectorAll(".footer [data-i18n]").forEach((el) => {
      el.innerHTML = I18N.t(el.getAttribute("data-i18n"));
    });
  }

  searchInput.addEventListener("input", () => applyFilterAndSort());
  sortSelect.addEventListener("change", () => applyFilterAndSort());
  document.addEventListener("monjiz:lang", () => { buildTabs(); staticLabels(); applyFilterAndSort(); });

  buildTabs();
  staticLabels();
  applyFilterAndSort();
})();
