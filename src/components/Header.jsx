import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken } from "../utils/auth"; // ✅ sửa lại từ removeToken
import DarkModeToggle from "./DarkModeToggle"; // ✅ nút chuyển sáng/tối

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirmLogout) return;
    removeToken(); // ✅ xóa token và username
    alert("Đăng xuất thành công");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <span className="navbar-brand">🛒 CMS Quản Lý Sản Phẩm</span>

      <div className="ms-auto d-flex align-items-center gap-3">
        <DarkModeToggle /> {/* ✅ nút chế độ sáng/tối */}
        {isLoggedIn() ? (
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Đăng xuất
          </button>
        ) : (
          <>
            <Link className="btn btn-outline-primary btn-sm" to="/login">Đăng nhập</Link>
            <Link className="btn btn-outline-success btn-sm" to="/register">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}
