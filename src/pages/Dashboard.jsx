import { getUsername } from '../utils/auth';

export default function Dashboard() {
  const username = getUsername();

  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">Xin chào, {username || 'Người dùng'}!</h1>
          <p className="col-md-8 fs-4">
            Chào mừng bạn đến với hệ thống <strong>Quản lý sản phẩm</strong> 🎉
          </p>
          <hr />
          <p className="text-muted">Bạn có thể thêm, chỉnh sửa hoặc xóa sản phẩm trong hệ thống.</p>
        </div>
      </div>
    </div>
  );
}
