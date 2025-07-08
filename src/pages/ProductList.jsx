import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api, { apis } from '../api';
import Input from '../components/Input';

const BASE_URL = 'http://localhost:1337';
const perPage = 8;

const getImageUrl = (imgPath) =>
  imgPath?.startsWith('/uploads') ? `${BASE_URL}${imgPath}` : 'https://via.placeholder.com/60';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timeout);
  }, [keyword]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const trimmed = keyword.trim();
      const url = trimmed
        ? `${apis.searchProduct}/${encodeURIComponent(trimmed)}`
        : apis.getProduct;

      const res = await api.get(url);
      const data = Array.isArray(res.data?.data || res.data) ? (res.data.data || res.data) : [];

      setProducts(data);
      setPage(1);
      setNotFound(data.length === 0 && trimmed.length > 0);
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm:', err);
      setProducts([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const currentPageProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return products.slice(start, start + perPage);
  }, [products, page]);

  const totalPages = useMemo(() => Math.ceil(products.length / perPage), [products]);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có muốn xóa sản phẩm này không?')) return;
    try {
      await api.delete(apis.deleteProduct.replace(':id', id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert('Xoá thành công!');
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      alert('Xoá thất bại!');
    }
  };

  return (
    <div className="container-lg">
      <div className="card border-0 shadow rounded-3 overflow-hidden">
        <div className="card-header bg-primary bg-gradient text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0 fw-bold">📦 Danh sách sản phẩm</h4>
            <Link to="/add" className="btn btn-light btn-sm px-3 py-2 fw-medium">
              ➕ Thêm sản phẩm
            </Link>
          </div>
          <div className="mt-3">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="🔍 Tìm kiếm sản phẩm..."
              className="form-control form-control-lg ps-4"
            />
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : notFound ? (
            <div className="text-center py-5 bg-light">
              <i className="bi bi-search fs-1 text-muted mb-3"></i>
              <h5 className="text-secondary">Không tìm thấy sản phẩm</h5>
              <p className="text-muted">Hãy thử từ khoá khác hoặc thêm sản phẩm mới</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={getImageUrl(p.image)}
                          alt={p.name || 'Product Image'}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                        />
                      </td>
                      <td>
                        <div>
                          <div className="fw-medium">{p.name}</div>
                          <div className="text-muted small mt-1">
                            Mô tả: {p.description}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link to={`/edit/${p.id}`} className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-pencil me-1"></i> Sửa
                          </Link>
                          <Link to={`/show/${p.id}`} className="btn btn-sm btn-outline-success">
                            <i className="bi bi-eye me-1"></i> Chi tiết
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            <i className="bi bi-trash me-1"></i> Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {products.length > 0 && (
            <div className="d-flex justify-content-between align-items-center p-4 border-top">
              <div className="text-muted">
                Hiển thị <b>{currentPageProducts.length}</b> trên tổng <b>{products.length}</b> sản phẩm
              </div>

              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                      &laquo;
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setPage(i + 1)}>
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
