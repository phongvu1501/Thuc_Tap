// src/components/RegisterForm.js
import React, { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '', email: '', phone: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:1337/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg('Đăng ký thành công!');
    } else {
      setMsg(data.errMsg || 'Đăng ký thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" type="number" placeholder="Phone" onChange={handleChange} />
      <button type="submit">Đăng ký</button>
      <p>{msg}</p>
    </form>
  );
}
