/* ===== منجز — معالجة نماذج التسجيل (مخزّن محلياً، مستقلون يظهرون فوراً) ===== */
(function () {
  const STORAGE_KEY = "monjiz_users";

  function saveUser(record) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(existing)) throw new Error("bad");
      record.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      record.at = new Date().toISOString();
      existing.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (_) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record]));
    }
  }

  document.querySelectorAll("form.auth-card").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = {};
      form.querySelectorAll("input, select, textarea").forEach((el) => {
        if (el.name) data[el.name] = el.value.trim();
      });

      const isFreelancer = form.id === "freelancerForm";

      if (isFreelancer) {
        // Normalize so the (real) listing can render the new member correctly
        saveUser({
          type: "freelancer",
          name: data.name,
          phone: data.phone,
          email: data.email,
          niche: data.niche, // design | web | marketing | business
          skills: data.skills,
          rate: data.rate,
          experience: data.experience,
          bio: data.bio,
        });
      } else {
        saveUser({
          type: "client",
          name: data.name,
          company: data.company,
          phone: data.phone,
          email: data.email,
          interest: data.interest,
        });
      }

      showSuccess(isFreelancer, data);
      form.reset();
    });
  });

  function showSuccess(isFreelancer, data) {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.45);display:grid;place-items:center;padding:20px";
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:18px;max-width:430px;width:100%;padding:34px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.3)">
        <div style="width:60px;height:60px;margin:0 auto 14px;display:grid;place-items:center;font-size:30px;font-weight:900;color:#0a0a0a;background:#f4ede1;border:2px solid #0a0a0a;border-radius:50%">✓</div>
        <h2 style="margin:0 0 8px;color:#0a0a0a;font-weight:900">${I18N.t("auth.successTitle")}</h2>
        <p style="color:#555;margin:0 0 6px;font-size:15px">${I18N.t("auth.successF")}</p>
        <p style="color:#777;font-size:13.5px;margin:0 0 22px">${I18N.t(
          isFreelancer ? "auth.successF" : "auth.successC"
        )}</p>
        <a href="../index.html" class="btn btn-dark" style="display:inline-block">${I18N.t("auth.backHome")}</a>
      </div>`;

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
  }
})();
