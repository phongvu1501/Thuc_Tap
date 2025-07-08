import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { FiArrowLeft, FiShoppingCart, FiTag, FiInfo } from 'react-icons/fi';

const getImageUrl = (imgPath) =>
  imgPath ? `http://localhost:1337${imgPath}` : 'https://via.placeholder.com/600';

export default function ProductShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    api.get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="d-flex justify-content-center mb-4">
          <div className="bg-light rounded-circle p-4">
            <FiInfo size={48} className="text-danger" />
          </div>
        </div>
        <h4 className="text-danger mb-4">Không tìm thấy sản phẩm</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/products')}>
          <FiArrowLeft className="me-1" /> Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/products" className="text-decoration-none">Sản phẩm</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <button 
        className="btn btn-outline-primary mb-4 d-flex align-items-center" 
        onClick={() => navigate('/products')}
      >
        <FiArrowLeft className="me-2" /> Quay lại danh sách
      </button>

      <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
        <div className="row g-0">
          {/* Hình ảnh sản phẩm */}
          <div className="col-lg-6 bg-light">
            <div className="p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '500px' }}>
              <img
                src={getImageUrl(mainImage)}
                alt={product.name}
                className="img-fluid rounded-3 shadow-sm object-fit-contain"
                style={{ 
                  maxHeight: '450px',
                  transition: 'transform 0.3s',
                  cursor: 'zoom-in'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
          
          {/* Thông tin chi tiết */}
          <div className="col-lg-6">
            <div className="p-4 p-lg-5 h-100 d-flex flex-column">
              <div className="mb-4">
                <span className="badge bg-primary bg-opacity-10 text-primary fs-6 mb-2">
                  #{product.category || 'uncategorized'}
                </span>
                <h1 className="fw-bold mb-3">{product.name}</h1>
                
                <div className="d-flex align-items-center mb-4">
                  <FiTag className="text-primary me-2 fs-5" />
                  <h2 className="text-primary mb-0">
                    {parseInt(product.price).toLocaleString()} VNĐ
                  </h2>
                </div>
              </div>
              
              <div className="mb-4 flex-grow-1">
                <h5 className="d-flex align-items-center text-secondary mb-3">
                  <FiInfo className="me-2" /> Mô tả sản phẩm
                </h5>
                <div className="bg-light rounded-3 p-4">
                  <p className="mb-0 lh-lg" style={{ whiteSpace: 'pre-line' }}>
                    {product.description || 'Sản phẩm này chưa có mô tả chi tiết.'}
                  </p>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin bổ sung */}
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <FiTag size={24} className="text-primary" />
              </div>
              <h5 className="card-title">Bảo hành chính hãng</h5>
              <p className="card-text text-muted">Bảo hành 12 tháng tại các trung tâm ủy quyền</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck text-primary" viewBox="0 0 16 16">
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
              <h5 className="card-title">Giao hàng nhanh chóng</h5>
              <p className="card-text text-muted">Miễn phí vận chuyển cho đơn hàng trên 500.000đ</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-repeat text-primary" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </div>
              <h5 className="card-title">Đổi trả dễ dàng</h5>
              <p className="card-text text-muted">Đổi trả trong vòng 7 ngày nếu không hài lòng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}