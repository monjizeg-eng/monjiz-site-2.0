/* ===== منجز — تبديل شريط التنقل حسب حالة الدخول =====
   العناصر التي تحمل class="only-guest" تظهر للمزوّر غير المسجل فقط.
   العناصر التي تحمل class="only-user" تظهر للمسجّل فقط. */
(async function () {
  try {
    const uid = await getUserId();
    const loggedIn = !!uid;

    document.querySelectorAll(".only-guest").forEach((el) => {
      el.style.display = loggedIn ? "none" : "";
    });
    document.querySelectorAll(".only-user").forEach((el) => {
      el.style.display = loggedIn ? "" : "none";
    });

    if (loggedIn && (await isAdmin(uid))) {
      document.querySelectorAll(".only-admin").forEach((el) => {
        el.style.display = "";
      });
    }
  } catch (_) {
    /* ignore */
  }
})();
