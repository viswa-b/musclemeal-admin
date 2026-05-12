export const ADMIN_EMAIL = "admin@musclemeals.com";
export const ADMIN_PASSWORD = "admin123456";

export const authService = {
  async signIn(email, password) {
    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      return {
        id: "admin",
        email: ADMIN_EMAIL,
        role: "admin"
      };
    }

    throw new Error("Invalid credentials");
  },

  async signOut() {
    localStorage.removeItem("adminUser");
  },

  async getSession() {
    const user = localStorage.getItem("adminUser");

    return user ? JSON.parse(user) : null;
  },

  onAuthChange(callback) {
    const user = localStorage.getItem("adminUser");

    callback(
      user ? JSON.parse(user) : null
    );

    return {
      unsubscribe() {}
    };
  }
};
const handleLogin = async () => {
  try {
    const user = await authService.signIn(
      email,
      password
    );

    localStorage.setItem(
      "adminUser",
      JSON.stringify(user)
    );

    onAuth(user);

  } catch (err) {
    alert(err.message);
  }
};