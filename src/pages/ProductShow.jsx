import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { apis } from '../api';
import { FiArrowLeft, FiTag, FiInfo } from 'react-icons/fi';

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
    const fetchProduct = async () => {
      try {
        const res = await api.get(`${apis.getProduct}/${id}`);
        const data = res.data?.data; // Sửa tại đây
        if (data) {
          setProduct(data);
          setMainImage(data.image);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
          <div className="col-lg-6 bg-light">
            <div className="p-4 d-flex align-items-center justify-content-center" style={{ minHeight: '500px' }}>
              <img
                src={getImageUrl(mainImage)}
                alt={product.name}
                className="img-fluid rounded-3 shadow-sm"
                style={{ maxHeight: '450px', transition: 'transform 0.3s', cursor: 'zoom-in' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>

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
    </div>
  );
}
