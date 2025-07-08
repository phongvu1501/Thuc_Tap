// src/components/LogoutButton.jsx
import React from 'react';
import { removeToken, getToken } from '../utils/auth';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:1337/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer, ${getToken()}`,
        },
      });

      if (res.ok) {
        removeToken();       
        window.location.href = '/login'; 
        alert('Đăng xuất thành công!');
      } else {
        alert('Đăng xuất thất bại!');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Đăng xuất
    </button>
  );
}
