/* ===== منجز — اتصال قاعدة بيانات Supabase =====
   يخزّن المستقلين والعملاء في Supabase، مع:
   - تسجيل دخول (Auth)
   - ملفات قابلة للتعديل للمستقلين والعملاء
   - رفع صور الأعمال (Storage) للمستقلين
   - لوحة تحكم للمشرف (Admins) */

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

/* ================= AUTH ================= */
async function signUp(email, password) {
  if (!db()) return { error: { message: "Supabase غير متصل" } };
  return db().auth.signUp({ email, password });
}
async function signIn(email, password) {
  if (!db()) return { error: { message: "Supabase غير متصل" } };
  return db().auth.signInWithPassword({ email, password });
}
async function signInGoogle(role) {
  if (!db()) return { error: { message: "Supabase غير متصل" } };
  const base = location.origin + location.pathname.replace(/[^/]*$/, "login.html");
  const redirectTo = base + (role ? "?role=" + role : "");
  return db().auth.signInWithOAuth({ provider: "google", options: { redirectTo } });
}
async function signOut() {
  if (db()) await db().auth.signOut();
}
async function getSession() {
  if (!db()) return null;
  const { data } = await db().auth.getSession();
  return data.session || null;
}
async function getUserId() {
  const s = await getSession();
  return s ? s.user.id : null;
}

/* ================= ROLE / PROFILES ================= */
async function isAdmin(uid) {
  if (!db() || !uid) return false;
  const { data } = await db().from("admins").select("id").eq("id", uid).maybeSingle();
  return !!data;
}
async function getFreelancerById(id) {
  if (!db() || !id) return null;
  const { data } = await db().from("freelancers").select("*").eq("id", id).maybeSingle();
  return data || null;
}
async function getFreelancerByAuth(uid) {
  if (!db() || !uid) return null;
  const { data } = await db().from("freelancers").select("*").eq("auth_id", uid).maybeSingle();
  return data || null;
}
async function getClientByAuth(uid) {
  if (!db() || !uid) return null;
  const { data } = await db().from("clients").select("*").eq("auth_id", uid).maybeSingle();
  return data || null;
}
async function updateFreelancer(uid, patch) {
  if (!db()) return { error: { message: "no db" } };
  return db().from("freelancers").update(patch).eq("auth_id", uid);
}
async function updateClient(uid, patch) {
  if (!db()) return { error: { message: "no db" } };
  return db().from("clients").update(patch).eq("auth_id", uid);
}

/* ================= PORTFOLIO / WORK PHOTOS ================= */
async function uploadWork(uid, file) {
  if (!db()) return { error: { message: "no db" } };
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${uid}/${Date.now()}_${safe}`;
  const { error } = await db().storage.from("works").upload(path, file);
  if (error) return { error };
  const { data } = db().storage.from("works").getPublicUrl(path);
  return { path, url: data.publicUrl };
}
async function removeWork(path) {
  if (!db() || !path) return;
  await db().storage.from("works").remove([path]);
}

/* ================= RAW ACCESS (used by admin panel) ================= */
async function adminAllFreelancers() {
  if (!db()) return [];
  const { data } = await db().from("freelancers").select("*").order("created_at", { ascending: false });
  return data || [];
}
async function adminAllClients() {
  if (!db()) return [];
  const { data } = await db().from("clients").select("*").order("created_at", { ascending: false });
  return data || [];
}
async function adminUpdateFreelancer(id, patch) {
  return db().from("freelancers").update(patch).eq("id", id);
}
async function adminUpdateClient(id, patch) {
  return db().from("clients").update(patch).eq("id", id);
}
async function adminDeleteFreelancer(id) {
  return db().from("freelancers").delete().eq("id", id);
}
async function adminDeleteClient(id) {
  return db().from("clients").delete().eq("id", id);
}

/* ================= SIGNUPS (still supported) ================= */
async function saveFreelancer(f) {
  try {
    if (db()) {
      const { error } = await db().from("freelancers").insert([f]);
      if (!error) return { ok: true, remote: true };
      return { ok: false, error };
    }
  } catch (_) {}
  return { ok: false };
}
async function saveClient(c) {
  try {
    if (db()) {
      const { error } = await db().from("clients").insert([c]);
      if (!error) return { ok: true, remote: true };
      return { ok: false, error };
    }
  } catch (_) {}
  return { ok: false };
}
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
  return [];
}
