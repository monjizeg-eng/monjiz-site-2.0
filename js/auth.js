/* ===== منجز — معالجة نماذج التسجيل (تُحفظ في Supabase) ===== */
(function () {
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

      const submit = async () => {
        // 1) Create the Supabase Auth account (email + password)
        const { data: authData, error: authError } = await signUp(data.email, data.password);
        if (authError) {
          alert("تعذّر إنشاء الحساب: " + (authError.message || "جرّب مرة أخرى"));
          return;
        }
        const auth_id = authData && authData.user ? authData.user.id : null;

        // 2) Save the profile linked to that auth user
        if (isFreelancer) {
          await saveFreelancer({
            auth_id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            niche: data.niche, // design | web | marketing | business
            skills: data.skills,
            rate: data.rate,
            experience: data.experience,
            bio: data.bio,
            approved: true,
          });
        } else {
          await saveClient({
            auth_id,
            name: data.name,
            company: data.company,
            phone: data.phone,
            email: data.email,
            interest: data.interest,
          });
        }
        showSuccess(isFreelancer, data);
        form.reset();
      };
      submit();
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
