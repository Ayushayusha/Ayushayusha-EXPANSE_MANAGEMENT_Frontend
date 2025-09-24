export const saveAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};

// Save token + user to localStorage
// export const saveAuth = (data) => {
//   if (data.token) {
//     localStorage.setItem("token", data.token);
//   }
//   if (data.user) {
//     localStorage.setItem("user", JSON.stringify(data.user));
//   }
// };

// // Get token + user from localStorage
// export const getAuth = () => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   return { token, user };
// };

// // Clear localStorage on logout
// export const clearAuth = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// };
