/* ===== منجز — لوحة المشرف ===== */
(async function () {
  const uid = await getUserId();
  if (!uid) {
    location.href = "login.html";
    return;
  }
  const admin = await isAdmin(uid);
  if (!admin) {
    document.getElementById("adminMsg").textContent =
      "هذا الحساب ليس مشرفًا. العودة للرئيسية.";
    document.getElementById("adminMsg").style.color = "#b00020";
    return;
  }
  refresh();

  async function refresh() {
    await loadFreelancers();
    await loadClients();
  }

  async function loadFreelancers() {
    const wrap = document.getElementById("freelancerTable");
    const list = await adminAllFreelancers();
    if (!list.length) {
      wrap.innerHTML = "<p class='admin-note'>لا يوجد مستقلون بعد.</p>";
      return;
    }
    let html = `<table class="admin">
      <thead><tr>
        <th>الاسم</th><th>التخصص</th><th>المهارات</th><th>الأجر</th><th>أعماله</th><th>ظاهر؟</th><th>حفظ/حذف</th>
      </tr></thead><tbody>`;
    list.forEach((f) => {
      const thumbs = (Array.isArray(f.portfolio) ? f.portfolio : [])
        .map((w) => `<img src="${w.url}" alt="">`).join("");
      const approvedSel = f.approved
        ? `<select data-aid="${f.id}" class="approve mini"><option value="true" selected>ظاهر</option><option value="false">مخفي</option></select>`
        : `<select data-aid="${f.id}" class="approve mini"><option value="true">ظاهر</option><option value="false" selected>مخفي</option></select>`;
      html += `
        <tr data-id="${f.id}">
          <td><input class="f-name" value="${esc(f.name || "")}"></td>
          <td><select class="f-niche">
            ${nicheOptions(f.niche)}
          </select></td>
          <td><input class="f-skills" value="${esc(f.skills || "")}"></td>
          <td><input class="mini f-rate" value="${esc(f.rate || "")}" style="width:76px"></td>
          <td><div class="thumbs">${thumbs}</div></td>
          <td>${approvedSel}</td>
          <td class="actions">
            <button class="btn btn-dark btn-sm save-f">حفظ</button>
            <button class="btn btn-danger btn-sm del-f">حذف</button>
          </td>
        </tr>`;
    });
    html += "</tbody></table>";
    wrap.innerHTML = html;

    wrap.querySelectorAll(".save-f").forEach((b) =>
      b.addEventListener("click", async () => {
        const tr = b.closest("tr");
        const id = tr.getAttribute("data-id");
        const patch = {
          name: tr.querySelector(".f-name").value.trim(),
          niche: tr.querySelector(".f-niche").value,
          skills: tr.querySelector(".f-skills").value.trim(),
          rate: tr.querySelector(".f-rate").value.trim(),
          approved: tr.querySelector(".approve").value === "true",
        };
        const { error } = await adminUpdateFreelancer(id, patch);
        await loadFreelancers();
      })
    );
    wrap.querySelectorAll(".del-f").forEach((b) =>
      b.addEventListener("click", async () => {
        const tr = b.closest("tr");
        const id = tr.getAttribute("data-id");
        if (!confirm("حذف هذا المستقل؟")) return;
        await adminDeleteFreelancer(id);
        await loadFreelancers();
      })
    );
  }

  async function loadClients() {
    const wrap = document.getElementById("clientTable");
    const list = await adminAllClients();
    if (!list.length) {
      wrap.innerHTML = "<p class='admin-note'>لا يوجد عملاء بعد.</p>";
      return;
    }
    let html = `<table class="admin">
      <thead><tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>الاهتمام</th><th>حفظ/حذف</th></tr></thead><tbody>`;
    list.forEach((c) => {
      html += `
        <tr data-id="${c.id}">
          <td><input class="c-name" value="${esc(c.name || "")}"></td>
          <td><input class="c-company" value="${esc(c.company || "")}"></td>
          <td><input class="c-phone" value="${esc(c.phone || "")}"></td>
          <td><input class="c-interest" value="${esc(c.interest || "")}"></td>
          <td class="actions">
            <button class="btn btn-dark btn-sm save-c">حفظ</button>
            <button class="btn btn-danger btn-sm del-c">حذف</button>
          </td>
        </tr>`;
    });
    html += "</tbody></table>";
    wrap.innerHTML = html;

    wrap.querySelectorAll(".save-c").forEach((b) =>
      b.addEventListener("click", async () => {
        const tr = b.closest("tr");
        const id = tr.getAttribute("data-id");
        await adminUpdateClient(id, {
          name: tr.querySelector(".c-name").value.trim(),
          company: tr.querySelector(".c-company").value.trim(),
          phone: tr.querySelector(".c-phone").value.trim(),
          interest: tr.querySelector(".c-interest").value.trim(),
        });
        await loadClients();
      })
    );
    wrap.querySelectorAll(".del-c").forEach((b) =>
      b.addEventListener("click", async () => {
        const tr = b.closest("tr");
        const id = tr.getAttribute("data-id");
        if (!confirm("حذف هذا العميل؟")) return;
        await adminDeleteClient(id);
        await loadClients();
      })
    );
  }

  function nicheOptions(sel) {
    const vals = ["design", "web", "marketing", "business"];
    return vals
      .map((v) => `<option value="${v}" ${v === sel ? "selected" : ""}>${v}</option>`)
      .join("");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut();
    location.href = "index.html";
  });
})();
