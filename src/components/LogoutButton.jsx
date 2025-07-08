import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../utils/auth";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg(""); // reset lỗi khi gõ lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post("/user/login", form);

      // Lưu token
      saveToken(res.data.data.token);

      // Lưu username nếu backend có trả, nếu không thì dùng form.username
      const username = res.data.data.user?.username || form.username;
      localStorage.setItem("username", username);

      navigate("/products");
    } catch (err) {
      console.error(err);
      setErrorMsg("Sai tài khoản hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4 text-center">🔐 Đăng nhập hệ thống</h3>

      {errorMsg && (
        <div className="alert alert-danger text-center">{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Tên đăng nhập</label>
          <input
            name="username"
            className="form-control"
            placeholder="Nhập tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="btn btn-success w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
