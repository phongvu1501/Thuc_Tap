import { useState } from "react";
import api from "../api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", form);

      // Lưu token vào localStorage
      saveToken(res.data.data.token);

      // Lưu username vào localStorage để hiển thị
      localStorage.setItem("username", form.username);

      alert("Đăng nhập thành công");
      navigate("/products");
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Đăng nhập</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="username"
            className="form-control"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
