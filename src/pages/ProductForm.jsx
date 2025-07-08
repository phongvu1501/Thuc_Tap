import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const getImageUrl = (imgPath) =>
  imgPath ? `http://localhost:1337${imgPath}` : 'https://via.placeholder.com/300';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/product/${id}`)
        .then(res => {
          setForm(res.data);
          setPreview(getImageUrl(res.data.image));
        })
        .catch(() => alert('Không tìm thấy sản phẩm'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (file) {
      formData.append('image', file);
    }

    try {
      if (isEdit) {
        await api.put(`/product/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Đã cập nhật sản phẩm!');
      } else {
        await api.post('/product', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Đã thêm sản phẩm!');
      }
      navigate('/products');
    } catch {
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">{isEdit ? '🛠️ Cập nhật sản phẩm' : '➕ Thêm sản phẩm mới'}</h3>
        <button 
          className="btn btn-outline-dark"
          onClick={() => navigate('/products')}
        >
          <FiArrowLeft className="me-1" /> Quay lại
        </button>
      </div>
      
      <div className="card shadow border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tên sản phẩm"
                    required
                  />
                  <label htmlFor="name">Tên sản phẩm</label>
                </div>

                <div className="form-floating mt-3">
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Giá"
                    required
                  />
                  <label htmlFor="price">Giá (VND)</label>
                </div>

                <div className="form-floating mt-3">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Mô tả sản phẩm"
                    style={{ height: 120 }}
                  />
                  <label htmlFor="description">Mô tả sản phẩm</label>
                </div>
              </div>

              <div className="col-md-6 text-center">
                <label className="form-label fw-medium mb-2">Hình ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-3"
                  onChange={handleImageChange}
                />

                <div className="border rounded shadow-sm p-3 bg-light">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: '250px', objectFit: 'contain' }}
                    />
                  ) : (
                    <p className="text-muted">Chưa có hình ảnh</p>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success px-4">
                <FiSave className="me-2" />
                {isEdit ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
