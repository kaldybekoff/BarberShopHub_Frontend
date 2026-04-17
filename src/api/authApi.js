const mockUsers = [
  {
    id: 1,
    name: "Артём Иванов",
    email: "user@test.com",
    role: "User",
  },
  {
    id: 2,
    name: "Barbershop KZ",
    email: "shop@test.com",
    role: "Barbershop",
  },
];

export async function login(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedEmail = email.trim().toLowerCase();
  const user = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail);

  if (!user || password !== "123456") {
    throw new Error("Неверный логин или пароль");
  }

  return {
    access_token: `mock-token-${user.role.toLowerCase()}`,
    user,
  };
}

export async function register(name, email, password) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { message: "success", name, email, password };
}

export async function verifyEmail(email, code) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (code !== "1234") {
    throw new Error("Неверный код подтверждения");
  }

  const user = mockUsers.find((item) => item.email === email) || {
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
