// TODO: заменить на реальный axiosInstance когда будет API

const mockUsers = [
  { id: 1, name: "Артём Иванов", email: "user@test.com", role: "User" },
  { id: 2, name: "Барбершоп KZ", email: "shop@test.com", role: "Barbershop" },
  { id: 3, name: "Админ", email: "admin@test.com", role: "Admin" },
];

export async function login(email, password) {
  await new Promise((res) => setTimeout(res, 800));

  const user = mockUsers.find((u) => u.email === email);
  if (!user || password !== "123456") {
    throw new Error("Неверный email или пароль");
  }

  return {
    access_token: "mock-token-" + user.role.toLowerCase(),
    user,
  };
}

export async function register(name, email, password) {
  await new Promise((res) => setTimeout(res, 600));
  return { message: "success" };
}

export async function verifyEmail(email, code) {
  await new Promise((res) => setTimeout(res, 600));

  if (code !== "1234") {
    throw new Error("Неверный код подтверждения");
  }

  const user = mockUsers.find((u) => u.email === email) || {
    id: 99,
    name: "Новый пользователь",
    email,
    role: "User",
  };

  return {
    access_token: "mock-token-user",
    user,
  };
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}
