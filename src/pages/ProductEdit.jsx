import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const getImageUrl = (imgPath) =>
  imgPath ? `http://localhost:1337${imgPath}` : 'https://via.placeholder.com/120';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const [file, setFile] = useState(null); // file ảnh mới

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/product/${id}`);
        const { name, price, description, image } = res.data;
        setProduct({ name, price, description, image });
        setPreview(getImageUrl(image));
      } catch (err) {
        console.error('Lỗi khi lấy sản phẩm:', err);
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      if (file) formData.append('image', file);

      await api.put(`/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Cập nhật sản phẩm thành công!');
      navigate('/products');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      setError('Cập nhật thất bại. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lg py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow rounded-3 overflow-hidden">
            <div className="card-header bg-primary bg-gradient text-white py-3">
              <h4 className="mb-0 fw-bold">✏️ Chỉnh sửa sản phẩm</h4>
            </div>

            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger mb-4">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-medium">
                    Tên sản phẩm <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="form-label fw-medium">
                    Giá sản phẩm <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₫</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Nhập giá sản phẩm"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label fw-medium">
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Mô tả chi tiết sản phẩm"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-medium">Ảnh sản phẩm</label>
                  {preview && (
                    <div className="mb-3">
                      <img
                        src={preview}
                        alt="Preview"
                        style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>

                <div className="d-flex justify-content-between pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => navigate('/products')}
                  >
                    <i className="bi bi-arrow-left me-2"></i> Quay lại
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i> Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
