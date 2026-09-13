/* ===== منجز — لوحة الحساب الشخصي (مستقل / عميل) ===== */
(async function () {
  const uid = await getUserId();
  if (!uid) {
    location.href = "login.html";
    return;
  }

  const fPanel = document.getElementById("freelancerPanel");
  const cPanel = document.getElementById("clientPanel");
  const noProfile = document.getElementById("noProfile");
  const roleNote = document.getElementById("roleNote");

  const freelancer = await getFreelancerByAuth(uid);
  const client = await getClientByAuth(uid);

  const setMsg = (id, text, ok) => {
    const el = document.getElementById(id);
    el.textContent = text;
    el.style.color = ok ? "#1a7f37" : "#b00020";
  };

  function translated(textKey, fallback) {
    return I18N.t(textKey) || fallback;
  }

  /* ---------- Projects (portfolio groups) ---------- */
  let projects = [];

  // Support both the new {title,link,images[]} format and the old [ {url,path} ] format
  function normalize(portfolio) {
    const arr = Array.isArray(portfolio) ? portfolio : [];
    if (!arr.length) return [];
    if (arr[0] && Array.isArray(arr[0].images)) return arr.map((p) => ({ title: p.title || "", link: p.link || "", images: Array.isArray(p.images) ? p.images : [] }));
    return [{ title: "", link: "", images: JSON.parse(JSON.stringify(arr)) }];
  }

  if (freelancer) projects = normalize(freelancer.portfolio);
  if (!projects.length) projects = [{ title: "", link: "", images: [] }];

  function renderProjects() {
    const wrap = document.getElementById("projectsWrap");
    wrap.innerHTML = "";
    projects.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="row2">
          <div class="field"><label>${translated("dashboard.projectName", "اسم المشروع")}</label><input class="input p-title" value="${escAttr(p.title)}" placeholder="${translated("dashboard.projectPlaceholder", "مثال: هوية لبراند كوفي")}"></div>
          <div class="field"><label>${translated("dashboard.projectLink", "رابط المشروع (اختياري)")}</label><input class="input p-link" value="${escAttr(p.link)}" placeholder="${translated("dashboard.projectLinkPlaceholder", "https://example.com")}"></div>
        </div>
        <div class="portfolio-grid">${p.images
          .map((w, k) => `<div class="work-tile" data-k="${k}"><img src="${w.url}" alt=""><button class="del" data-k="${k}">${translated("dashboard.deleteImage", "حذف")}</button></div>`)
          .join("")}</div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
          <label class="btn btn-outline btn-sm" style="cursor:pointer;margin:0">${translated("dashboard.addPhotos", "أضف صورًا")}<input type="file" class="p-files" accept="image/*" multiple hidden></label>
          <button class="btn btn-danger btn-sm p-del">${translated("dashboard.deleteProject", "حذف المشروع")}</button>
        </div>`;
      wrap.appendChild(card);

      // upload photos for this project
      card.querySelector(".p-files").addEventListener("change", async (e) => {
        const files = Array.from(e.target.files);
        e.target.value = "";
        for (const file of files) {
          const r = await uploadWork(uid, file);
          if (!r.error) projects[i].images.push({ url: r.url, path: r.path });
        }
        renderProjects();
      });

      // delete an image
      card.querySelectorAll(".del").forEach((b) =>
        b.addEventListener("click", async () => {
          const k = +b.getAttribute("data-k");
          const removed = projects[i].images[k];
          await removeWork(removed.path);
          projects[i].images = projects[i].images.filter((_, x) => x !== k);
          renderProjects();
        })
      );

      // delete whole project
      card.querySelector(".p-del").addEventListener("click", () => {
        projects.splice(i, 1);
        if (!projects.length) projects = [{ title: "", link: "", images: [] }];
        renderProjects();
      });
    });
  }

  document.getElementById("addProject").addEventListener("click", () => {
    projects.push({ title: "", link: "", images: [] });
    renderProjects();
  });

  function collectFromDom() {
    document.querySelectorAll(".project-card").forEach((card) => {
      const i = projects.findIndex((p, idx) => card.getAttribute("data") === null);
      // simpler: match by index order
    });
    // Rebuild from inputs by index
    const cards = document.querySelectorAll(".project-card");
    return projects.map((p, i) => {
      const card = cards[i];
      return {
        title: card ? card.querySelector(".p-title").value.trim() : p.title,
        link: card ? card.querySelector(".p-link").value.trim() : p.link,
        images: p.images,
      };
    });
  }

  /* ---------- Freelancer ---------- */
  let newAvatarUrl = freelancer?.avatar_url || "";

  if (freelancer) {
    fPanel.style.display = "block";
    roleNote.textContent = I18N.t("dashboard.roleFreelancer");
    document.getElementById("frName").value = freelancer.name || "";
    document.getElementById("frPhone").value = freelancer.phone || "";
    document.getElementById("frEmail").value = freelancer.email || "";
    document.getElementById("frNiche").value = freelancer.niche || "design";
    document.getElementById("frRate").value = freelancer.rate || "";
    document.getElementById("frSkills").value = freelancer.skills || "";
    document.getElementById("frExp").value = freelancer.experience || "١ - ٣ سنوات";
    document.getElementById("frBio").value = freelancer.bio || "";
    if (freelancer.avatar_url) document.getElementById("avatarImg").src = freelancer.avatar_url;
    document.getElementById("viewMyProfile").href = "profile.html?id=" + (freelancer.id || "");
    renderProjects();

    document.getElementById("frAvatarFile").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const r = await uploadWork(uid, file);
      if (r.error) return setMsg("frMsg", "فشل رفع الصورة: " + r.error.message, false);
      newAvatarUrl = r.url;
      document.getElementById("avatarImg").src = r.url;
    });

    document.getElementById("saveFreelancer").addEventListener("click", async () => {
      const portfolio = collectFromDom().filter((p) => p.title || p.images.length);
      const patch = {
        name: document.getElementById("frName").value.trim(),
        phone: document.getElementById("frPhone").value.trim(),
        niche: document.getElementById("frNiche").value,
        rate: document.getElementById("frRate").value,
        skills: document.getElementById("frSkills").value.trim(),
        experience: document.getElementById("frExp").value,
        bio: document.getElementById("frBio").value.trim(),
        avatar_url: newAvatarUrl,
        portfolio,
      };
      const { error } = await updateFreelancer(uid, patch);
      if (error) setMsg("frMsg", I18N.t("dashboard.saveError") + ": " + error.message, false);
      else setMsg("frMsg", I18N.t("dashboard.saveSuccess"), true);
    });

    document.getElementById("deleteFreelancer").addEventListener("click", async () => {
      const confirmed = confirm("هل أنت متأكد أنك تريد حذف ملفك؟ هذا سيزيل الملف العام من الموقع.");
      if (!confirmed) return;
      const { error } = await deleteFreelancerProfile(uid);
      if (error) {
        setMsg("frMsg", "تعذّر حذف الملف: " + error.message, false);
        return;
      }
      await signOut();
      location.href = "index.html";
    });
  }

  /* ---------- Client ---------- */
  if (client) {
    cPanel.style.display = "block";
    roleNote.textContent = I18N.t("dashboard.roleClient");
    document.getElementById("clName").value = client.name || "";
    document.getElementById("clCompany").value = client.company || "";
    document.getElementById("clPhone").value = client.phone || "";
    document.getElementById("clEmail").value = client.email || "";
    document.getElementById("clInterest").value = client.interest || "design";

    document.getElementById("saveClient").addEventListener("click", async () => {
      const patch = {
        name: document.getElementById("clName").value.trim(),
        company: document.getElementById("clCompany").value.trim(),
        phone: document.getElementById("clPhone").value.trim(),
        interest: document.getElementById("clInterest").value,
      };
      const { error } = await updateClient(uid, patch);
      if (error) setMsg("clMsg", I18N.t("dashboard.saveError") + ": " + error.message, false);
      else setMsg("clMsg", I18N.t("dashboard.saveSuccess"), true);
    });

    document.getElementById("deleteClient").addEventListener("click", async () => {
      const confirmed = confirm("هل أنت متأكد أنك تريد حذف ملفك؟ هذا سيزيل الملف العام من الموقع.");
      if (!confirmed) return;
      const { error } = await deleteClientProfile(uid);
      if (error) {
        setMsg("clMsg", "تعذّر حذف الملف: " + error.message, false);
        return;
      }
      await signOut();
      location.href = "index.html";
    });
  }

  if (!freelancer && !client) noProfile.style.display = "block";

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut();
    location.href = "index.html";
  });

  function escAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
})();
