// src/components/LoginForm.js
import React, { useState } from 'react';
import { saveToken } from '../utils/auth';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:1337/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      saveToken(data.token);
      setMsg('Đăng nhập thành công!');
      window.location.replace("https://www.facebook.com/vuvanphong.P:");
    } else {
      setMsg(data.errMsg || 'Sai thông tin đăng nhập');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Đăng nhập</button>
      <p>{msg}</p>
    </form>
  );
}
