import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiPlusCircle, FiMenu, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getUsername } from '../utils/auth';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(getUsername() || '');
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`d-flex flex-column ${collapsed ? 'collapsed-sidebar' : 'expanded-sidebar'}`}
      style={{
        background: '#f8f9fa',
        color: '#212529',
        minHeight: '100vh',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      {/* Hiển thị tên người dùng */}
      <div className="px-3 py-3 border-bottom">
        {!collapsed && (
          <div className="fw-bold text-primary">
            👤 Xin chào, {username || 'Khách'}
          </div>
        )}
      </div>

      {/* Nút điều khiển thu gọn */}
      <div className="d-flex justify-content-end p-3 border-bottom">
        <button
          onClick={toggleSidebar}
          className="btn btn-light btn-sm rounded-circle"
          style={{ width: '32px', height: '32px' }}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <ul className="nav flex-column flex-grow-1 p-3">
        <li className="nav-item mb-2">
          <Link to="/" className={`nav-link d-flex align-items-center py-3 px-3 rounded ${isActive('/') ? 'active-nav-link' : 'nav-link-hover'}`}>
            <FiHome className="me-2" size="1.2em" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/products" className={`nav-link d-flex align-items-center py-3 px-3 rounded ${isActive('/products') ? 'active-nav-link' : 'nav-link-hover'}`}>
            <FiBox className="me-2" size="1.2em" />
            {!collapsed && <span>Sản phẩm</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className={`nav-link d-flex align-items-center py-3 px-3 rounded ${isActive('/add') ? 'active-nav-link' : 'nav-link-hover'}`}>
            <FiPlusCircle className="me-2" size="1.2em" />
            {!collapsed && <span>Thêm sản phẩm</span>}
          </Link>
        </li>
      </ul>

      <div className="p-3 border-top text-center">
        <button onClick={toggleSidebar} className="btn btn-outline-secondary btn-sm">
          <FiMenu />
        </button>
      </div>

      <style jsx>{`
        .expanded-sidebar {
          width: 250px;
        }

        .collapsed-sidebar {
          width: 80px;
        }

        .nav-link-hover {
          color: #495057 !important;
          transition: all 0.2s ease;
        }

        .nav-link-hover:hover {
          background-color: #e9ecef;
          color: #0d6efd !important;
          transform: translateX(3px);
        }

        .active-nav-link {
          background-color: #0d6efd !important;
          color: white !important;
          box-shadow: 0 4px 6px rgba(13, 110, 253, 0.3);
        }

        .active-nav-link:hover {
          background-color: #0b5ed7 !important;
        }

        .collapsed-sidebar .nav-link span {
          display: none;
        }

        .collapsed-sidebar .nav-link {
          justify-content: center;
        }

        .collapsed-sidebar .nav-link .me-2 {
          margin-right: 0 !important;
        }
      `}</style>
    </div>
  );
}
