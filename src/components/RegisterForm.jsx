import { useState } from "react";
import api from "../api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", password: "", email: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/register", form);
      saveToken(res.data.data.token);
      alert("Đăng ký thành công");
      navigate("/products");
    } catch (err) {
      alert("Lỗi đăng ký: " + err.response?.data?.errMsg || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Đăng ký</h3>
      <form onSubmit={handleSubmit}>
        {["username", "password", "email", "phone"].map((field) => (
          <div className="mb-3" key={field}>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              className="form-control"
              placeholder={`Nhập ${field}`}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100" type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
