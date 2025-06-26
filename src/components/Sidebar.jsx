import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">PhongVu</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sản phẩm</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Đơn hàng</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
