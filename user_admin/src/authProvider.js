const username = "admin";
const password = "admin";

export const authProvider = {
  login: ({ username, password }) => {
    if (username !== username || password !== password) {
      return Promise.reject();
    }
    localStorage.setItem('username', username);
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
  checkError: (error = {}) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: '0',
      fullName: 'Admin',
    }),
  getPermissions: () => Promise.resolve(''),
};
