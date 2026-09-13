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

  // Admin shortcut (always shown; admin.html gates access)
  const link = document.getElementById("adminLink");
  link.style.display = "inline-block";
  link.href = "admin.html";
  if (await isAdmin(uid)) roleNote.textContent = "أنت مشرف — يمكنك إدارة الحسابات من لوحة المشرف.";

  const freelancer = await getFreelancerByAuth(uid);
  const client = await getClientByAuth(uid);

  const setMsg = (id, text, ok) => {
    const el = document.getElementById(id);
    el.textContent = text;
    el.style.color = ok ? "#1a7f37" : "#b00020";
  };

  /* ---------- Freelancer ---------- */
  let portfolio = Array.isArray(freelancer?.portfolio) ? freelancer.portfolio : [];
  let newAvatarUrl = freelancer?.avatar_url || "";

  function renderWorks() {
    const grid = document.getElementById("frWorksGrid");
    grid.innerHTML = "";
    portfolio.forEach((w, i) => {
      const tile = document.createElement("div");
      tile.className = "work-tile";
      tile.innerHTML = `<img src="${w.url}" alt=""><button class="del" data-i="${i}">حذف</button>`;
      grid.appendChild(tile);
    });
    grid.querySelectorAll(".del").forEach((b) =>
      b.addEventListener("click", async () => {
        const idx = +b.getAttribute("data-i");
        const removed = portfolio[idx];
        await removeWork(removed.path);
        portfolio = portfolio.filter((_, j) => j !== idx);
        renderWorks();
      })
    );
  }

  if (freelancer) {
    fPanel.style.display = "block";
    roleNote.textContent = roleNote.textContent || "أنت مسجّل كمستقل.";
    document.getElementById("frName").value = freelancer.name || "";
    document.getElementById("frPhone").value = freelancer.phone || "";
    document.getElementById("frEmail").value = freelancer.email || "";
    document.getElementById("frNiche").value = freelancer.niche || "design";
    document.getElementById("frRate").value = freelancer.rate || "";
    document.getElementById("frSkills").value = freelancer.skills || "";
    document.getElementById("frExp").value = freelancer.experience || "١ - ٣ سنوات";
    document.getElementById("frBio").value = freelancer.bio || "";
    if (freelancer.avatar_url)
      document.getElementById("avatarImg").src = freelancer.avatar_url;
    document.getElementById("viewMyProfile").href = "profile.html?id=" + (freelancer.id || "");
    renderWorks();

    // avatar upload
    document.getElementById("frAvatarFile").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const r = await uploadWork(uid, file);
      if (r.error) return setMsg("frMsg", "فشل رفع الصورة: " + r.error.message, false);
      newAvatarUrl = r.url;
      document.getElementById("avatarImg").src = r.url;
    });

    // works upload (multiple)
    document.getElementById("frWorks").addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      e.target.value = "";
      for (const file of files) {
        const r = await uploadWork(uid, file);
        if (r.error) continue;
        portfolio.push({ url: r.url, path: r.path });
      }
      renderWorks();
    });

    document.getElementById("saveFreelancer").addEventListener("click", async () => {
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
      if (error) setMsg("frMsg", "خطأ في الحفظ: " + error.message, false);
      else setMsg("frMsg", "تم حفظ ملفك بنجاح ✅", true);
    });
  }

  /* ---------- Client ---------- */
  if (client) {
    cPanel.style.display = "block";
    roleNote.textContent = roleNote.textContent || "أنت مسجّل كعميل.";
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
      if (error) setMsg("clMsg", "خطأ في الحفظ: " + error.message, false);
      else setMsg("clMsg", "تم حفظ ملفك بنجاح ✅", true);
    });
  }

  if (!freelancer && !client) noProfile.style.display = "block";

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut();
    location.href = "index.html";
  });
})();
