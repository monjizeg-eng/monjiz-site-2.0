/* ===== منجز — اتصال قاعدة بيانات Supabase =====
   يخزّن المستقلين والعملاء في قاعدة بيانات Supabase بدلاً من localStorage,
   بحيث تظهر البيانات لجميع الزوار ولا تُنسى. */

const SUPABASE_URL = "https://cbnvrpyiuvnszwmoyfif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_JaFIFp1ppdQ0gF5D6OAvtA_lC-Yuo4J";

let sbClient = null;

function db() {
  if (sbClient) return sbClient;
  if (window.supabase) {
    sbClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );
    return sbClient;
  }
  return null;
}

/* --- Fallback (localStorage) if Supabase isn't reachable --- */
function lsGet() {
  try { return JSON.parse(localStorage.getItem("monjiz_users") || "[]"); }
  catch (_) { return []; }
}
function lsPush(rec) {
  try {
    const arr = lsGet();
    arr.push({ ...rec, at: new Date().toISOString() });
    localStorage.setItem("monjiz_users", JSON.stringify(arr));
  } catch (_) {}
}

/* --- Save a freelancer signup --- */
async function saveFreelancer(f) {
  try {
    if (db()) {
      const { error } = await db().from("freelancers").insert([f]);
      if (!error) return { ok: true, remote: true };
    }
  } catch (_) {}
  lsPush({ type: "freelancer", ...f });
  return { ok: true, remote: false };
}

/* --- Save a client signup --- */
async function saveClient(c) {
  try {
    if (db()) {
      const { error } = await db().from("clients").insert([c]);
      if (!error) return { ok: true, remote: true };
    }
  } catch (_) {}
  lsPush({ type: "client", ...c });
  return { ok: true, remote: false };
}

/* --- Read freelancers (all visitors see the same real data) --- */
async function fetchFreelancers() {
  try {
    if (db()) {
      const { data, error } = await db()
        .from("freelancers")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) return data;
    }
  } catch (_) {}
  // Fallback: any freelancers saved locally before Supabase was connected
  return lsGet().filter((u) => u && u.type === "freelancer");
}
