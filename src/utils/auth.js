// utils/auth.js

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const saveUsername = (username) => {
  localStorage.setItem('username', username);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

// export const removeAuth = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('username');
// };

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
