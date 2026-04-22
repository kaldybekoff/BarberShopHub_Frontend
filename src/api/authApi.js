import axiosInstance from "./axiosInstance";

function roleFromUser(user) {
  return user?.barbershop_id ? "Barbershop" : "User";
}

// /auth/me теперь возвращает barbershop_id + barbershop_slug для owner'ов.
// Используем это как источник правды для роли — без лишнего вызова /owner/dashboard.
async function fetchFullProfile(token) {
  const res = await axiosInstance.get("/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  const me = res.data.data;
  return { ...me, role: roleFromUser(me) };
}

export async function login(email, password) {
  const res = await axiosInstance.post("/auth/login", { email, password });
  const { user, token } = res.data.data;
  try {
    const fresh = await fetchFullProfile(token);
    return { access_token: token, user: fresh };
  } catch {
    return { access_token: token, user: { ...user, role: roleFromUser(user) } };
  }
}

export async function loginWithGoogle(idToken) {
  const res = await axiosInstance.post("/auth/google", { id_token: idToken });
  const { user, token } = res.data.data;
  try {
    const fresh = await fetchFullProfile(token);
    return { access_token: token, user: fresh };
  } catch {
    return { access_token: token, user: { ...user, role: roleFromUser(user) } };
  }
}

export async function register(name, email, password) {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
    password_confirmation: password,
  });
  return res.data;
}

export async function verifyEmail(email, code) {
  const res = await axiosInstance.post("/auth/verify-email", { email, code });
  const { user, token } = res.data.data;
  try {
    const fresh = await fetchFullProfile(token);
    return { access_token: token, user: fresh };
  } catch {
    return { access_token: token, user: { ...user, role: roleFromUser(user) } };
  }
}

export async function resendCode(email) {
  const res = await axiosInstance.post("/auth/resend-code", { email });
  return res.data;
}

export function logout() {
  axiosInstance.post("/auth/logout").catch(() => {});
}

export async function getCurrentUser() {
  const res = await axiosInstance.get("/auth/me");
  return res.data.data;
}

export async function fetchMeWithRole() {
  return fetchFullProfile();
}

export async function forgotPassword(email) {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
}

export async function resetPassword(email, code, password) {
  const res = await axiosInstance.post("/auth/reset-password", {
    email,
    code,
    password,
    password_confirmation: password,
  });
  return res.data;
}
