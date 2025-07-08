import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { apis } from '../api';
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
      api.get(`${apis.getProduct}/${id}`)
        .then((res) => {
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

    try {
      let imagePath = form.image;

      // 👇 CHỈ upload nếu có file
      if (file) {
        const uploadForm = new FormData();
        uploadForm.append('image', file);

        const res = await api.post(apis.uploadImage, uploadForm, {
          headers: { 'Content-Type': 'multipart/form-data' } // ❗ Bắt buộc
        });

        if (res.data.err !== 0) throw new Error(res.data.message);
        imagePath = res.data.path;
      }

      const payload = {
        name: form.name,
        price: form.price,
        description: form.description,
        image: imagePath
      };

      if (isEdit) {
        await api.put(apis.updateProduct.replace(':id', id), payload);
        alert('Đã cập nhật sản phẩm!');
      } else {
        await api.post(apis.createProduct, payload);
        alert('Đã thêm sản phẩm!');
      }

      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi xử lý sản phẩm!');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">
          {isEdit ? '🛠️ Cập nhật sản phẩm' : '➕ Thêm sản phẩm mới'}
        </h3>
        <button className="btn btn-outline-dark" onClick={() => navigate('/products')}>
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
                    required
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
