import axiosInstance from "./axiosInstance";

async function detectRole(token) {
  try {
    const res = await axiosInstance.get("/owner/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) return "Barbershop";
  } catch {}
  return "User";
}

export async function login(email, password) {
  const res = await axiosInstance.post("/auth/login", { email, password });
  const { user, token } = res.data.data;
  const role = await detectRole(token);
  return { access_token: token, user: { ...user, role } };
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
  const role = await detectRole(token);
  return { access_token: token, user: { ...user, role } };
}

export async function resendCode(email) {
  const res = await axiosInstance.post("/auth/resend-code", { email });
  return res.data;
}

export function logout() {
  axiosInstance.post("/auth/logout").catch(() => {});
}
